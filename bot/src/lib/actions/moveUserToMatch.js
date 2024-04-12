import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { getGuildChannels } from "./createChannels.js";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const roleEveryone = process.env["DISCORD_ROLE_EVERYONE_ID"];

const moveUserToMatch = async (userId, matchInfo) => {
  const rest = new REST({ version: "10", makeRequest: fetch }).setToken(token);

  const channels = await getGuildChannels(guildId);

  const matchId = matchInfo.matchId;
  const teamOne = matchInfo.teamOne;

  const getMatchCategory = async () => {
    const matchChannel = channels.find(
      (channel) => channel.name === "Match: " + matchId
    );

    return matchChannel;
  };

  const getTeamChannel = async () => {
    const matchChannel = await getMatchCategory();

    const teamChannel = channels.filter(
      (channel) => channel.name === "Team " + (teamOne ? "One" : "Two")
    );

    return teamChannel.filter(
      (channel) => channel.parent_id === matchChannel.id
    )[0];
  };

  const teamChannel = await getTeamChannel();

  if (teamChannel) {
    await rest.patch(Routes.guildMember(guildId, userId), {
      body: {
        channel_id: teamChannel.id,
      },
    });
  }

  return;
};

export { moveUserToMatch };
