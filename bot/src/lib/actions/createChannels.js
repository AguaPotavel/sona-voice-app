import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import * as dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "development" ? ".env.local" : ".env.production",
});

const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const roleEveryone = process.env["DISCORD_ROLE_EVERYONE_ID"];

const getGuildChannels = async (guildId) => {
  const rest = new REST({ version: "10", makeRequest: fetch }).setToken(token);
  try {
    const response = await rest.get(Routes.guildChannels(guildId));
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

async function prepareChannels(matchId) {
  const rest = new REST({ version: "10", makeRequest: fetch }).setToken(token);
  let parentId;
  let matchData;

  try {
    const channels = await getGuildChannels(guildId);

    console.log(channels);

    const matchChannel = channels.find(
      (channel) => channel.name === "Match: " + matchId
    );

    if (matchChannel) return matchChannel;

    const response = await rest.post(Routes.guildChannels(guildId), {
      body: {
        name: "Match: " + matchId,
        type: 4,
      },
    });

    parentId = response.id;
  } catch (e) {
    console.log(e);
    return e;
  }

  try {
    const response = await Promise.all([
      rest.post(Routes.guildChannels(guildId), {
        body: {
          name: "Team One",
          type: 2,
          parent_id: parentId,
          permission_overwrites: [
            {
              id: roleEveryone,
              type: 0,
              deny: 0x0000000000000400,
            },
          ],
        },
      }),
      rest.post(Routes.guildChannels(guildId), {
        body: {
          name: "Team Two",
          type: 2,
          parent_id: parentId,
          permission_overwrites: [
            {
              id: roleEveryone,
              type: 0,
              deny: 0x0000000000000400,
            },
          ],
        },
      }),
    ]);

    matchData = {
      parentId: parentId,
      teamOne: response[0].id,
      teamTwo: response[1].id,
    };
  } catch (e) {
    console.log(e);
    return e;
  }

  return matchData;
}

export { prepareChannels, getGuildChannels };
