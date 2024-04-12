import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { getGuildChannels } from "./createChannels.js";
import { ConvexHttpClient } from "convex/browser";
import { mutation } from "../../../convex/_generated/server.js";
import { api } from "../../../convex/_generated/api.js";

import * as dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "development" ? ".env.local" : ".env.production",
});

const convexClient = new ConvexHttpClient(process.env["CONVEX_URL"]);
console.log(convexClient);

const token = process.env["DISCORD_TOKEN"];
const guildId = process.env["DISCORD_SERVER_ID"];

async function deleteChannels(matchId) {
  const rest = new REST({ version: "10", makeRequest: fetch }).setToken(token);
  const channels = await getGuildChannels(guildId);

  const matchChannel = channels.find(
    (channel) => channel.name === "Match: " + matchId
  );

  if (!matchChannel) return;

  const matchChannelsVoip = channels.filter(
    (c) => c.parent_id === matchChannel.id
  );

  try {
    await Promise.all([
      rest.delete(Routes.channel(matchChannel.id)),
      ...matchChannelsVoip.map((c) => rest.delete(Routes.channel(c.id))),
    ]);

    const r = await convexClient.mutation(api.matchs.updateMatch, {
      channelDeleted: true,
      isOver: true,
      matchId: matchId,
    });

    return r;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export { deleteChannels };
