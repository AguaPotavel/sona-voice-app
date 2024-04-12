"use strict";
// // discord
// import { Client, GatewayIntentBits, Events } from "discord.js";
// import { REST } from "@discordjs/rest";
// import { Routes } from "discord-api-types/v10";
// // convex
// import { ConvexHttpClient, ConvexClient } from "convex/browser";
// import { api } from "../convex/_generated/api.js";
// // lib
// import { ConvexCache } from "./lib/cached/convexData";
// // lib actions
// import { getUserMatch } from "./lib/actions/getuserMatch";
// import { prepareChannels } from "./lib/actions/createChannels";
// // import { prepareInvites } from "./create-invites.js";
// // import { prepareRoles } from "./create-roles.js";
// import * as dotenv from "dotenv";
// import { VoiceState } from "discord.js";
// dotenv.config({ path: ".env.local" });
// const token = process.env["DISCORD_TOKEN"];
// const clientId = process.env["DISCORD_CLIENT_ID"];
// const guildId = process.env["DISCORD_SERVER_ID"];
// const channelId = process.env["DISCORD_CHANNEL_ID"];
// const ConvexCachedData = new ConvexCache();
// const clientDiscord = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildInvites,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildVoiceStates,
//   ],
// });
// // const clientConvex = new ConvexHttpClient(process.env["CONVEX_URL"]);
// const monitorConvex = new ConvexClient(process.env["CONVEX_URL"] as string);
// const rest = new REST({ version: "10", makeRequest: fetch as any }).setToken(
//   token as string
// );
// clientDiscord.on("voiceStateUpdate", (oldState, newState) => {
//   //   Verifique se o usuário entrou em um canal de voz
//   const { guild, channel, member } = newState satisfies VoiceState;
//   if (channel === null || member === null) return;
//   if (guild.id !== guildId || channel.id !== channelId) return;
//   const match = getUserMatch(
//     ConvexCachedData.getListMatch(),
//     ConvexCachedData.getListPlayers(),
//     member.user.id
//   );
//   console.log(match);
// });
// clientDiscord.on("messageCreate", async (message) => {
//   console.log(message.channel);
// });
// // clientDiscord
// //   .login(token)
// //   .then((a) => {
// //     console.log("bot authenticated");
// //     monitorConvex.onUpdate(api.users.getUsers, {}, (data) => {
// //       ConvexCachedData.setListPlayers(data);
// //     });
// //     monitorConvex.onUpdate(api.match.getMatches, {}, (data) => {
// //       ConvexCachedData.setListMatch(data);
// //     });
// //   })
// //   .catch((error) => {
// //     console.log("Erro ao autenticar bot: ", error);
// //   });
// // rest.get(Routes.invite("xCtavayG")).then((invite) => {
// //     console.log(invite);
// // });
// // async function Testes(matchId) {
// //   let matchData = {
// //     matchId: matchId,
// //   };
// //   // prepare channels
// //   const channels = await prepareChannels(matchData.matchId);
// //   matchData = {
// //     ...matchData,
// //     channels,
// //   };
// //   // prepare invites
// //   const invites = await prepareInvites(matchData.channels);
// //   matchData = {
// //     channels,
// //     linkTeamOne: "https://discordapp.com/invite/" + invites.teamOne.code,
// //     linkTeamTwo: "https://discordapp.com/invite/" + invites.teamTwo.code,
// //   };
// //   console.log(matchData);
// // }
// // Testes("123898392");
// // const channels = await prepareChannels("123898392");
