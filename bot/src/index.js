// discord
import { Client, GatewayIntentBits } from "discord.js";

// convex
import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// lib
import { ConvexCache } from "./lib/cached/convexData.js";

// lib actions
import { prepareChannels } from "./lib/actions/createChannels.js";
import { deleteChannels } from "./lib/actions/deleteChannels.js";

// worker
import { Worker } from "worker_threads";

import * as dotenv from "dotenv";

console.log(process.env.NODE_ENV, process.env.CONVEX_URL);

dotenv.config({
  path:
    process.env.NODE_ENV === "development" ? ".env.local" : ".env.production",
});

const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const channelId = process.env["DISCORD_CHANNEL_ID"];

const workerFile = "./src/lib/worker.js";

const ConvexCachedData = new ConvexCache();

const clientDiscord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const monitorConvex = new ConvexClient(process.env["CONVEX_URL"]);

clientDiscord.on("voiceStateUpdate", (oldState, newState) => {
  //   Verifique se o usuário entrou em um canal de voz
  const { guild, channel, member } = newState;

  console.log(
    guild.roles.cache.find((role) => role.name === "@everyone"),
    newState
  );

  if (channel === null || member === null) return;

  if (guild.id !== guildId || channel.id !== channelId) return;

  const worker = new Worker(workerFile, {
    workerData: {
      type: "moveUserToMatch",
      listMatch: ConvexCachedData.getListMatch(),
      listPlayer: ConvexCachedData.getListPlayers(),
      userId: member.user.id,
    },
  });

  worker.on("error", (err) => {
    console.log("worker error", err);
  });

  worker.postMessage("start");
});

clientDiscord
  .login(token)
  .then((a) => {
    console.log("bot authenticated");

    monitorConvex.onUpdate(api.users.getUsers, {}, (data) => {
      ConvexCachedData.setListPlayers(data);

      // console.log(data);
    });

    monitorConvex.onUpdate(api.matchs.getMatches, {}, (data) => {
      ConvexCachedData.setListMatch(data);

      const channelsToCreate = data.filter((match) => match.isOver === false);
      const channelsToDelete = data.filter(
        (match) => match.isOver === true && match.channelDeleted !== true
      );

      channelsToCreate.forEach((match) => {
        prepareChannels(match.matchId).then((c) => {
          console.log("canais criados", c);
        });
      });

      channelsToDelete.forEach((match) => {
        deleteChannels(match.matchId).then((c) => {
          console.log("canais deletados", c);
        });
      });
    });
  })
  .catch((error) => {
    console.log("Erro ao autenticar bot: ", error);
  });
