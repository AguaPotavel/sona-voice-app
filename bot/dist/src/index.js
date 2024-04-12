"use strict";
// discord
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
// convex
const browser_1 = require("convex/browser");
const api_js_1 = require("../convex/_generated/api.js");
// lib
const convexData_1 = require("./lib/cached/convexData");
// lib actions
const getuserMatch_js_1 = require("./lib/actions/getuserMatch.js");
// import { prepareInvites } from "./create-invites.js";
// import { prepareRoles } from "./create-roles.js";
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env.local" });
const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const channelId = process.env["DISCORD_CHANNEL_ID"];
const ConvexCachedData = new convexData_1.ConvexCache();
const clientDiscord = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
});
const clientConvex = new browser_1.ConvexHttpClient(process.env["CONVEX_URL"]);
const monitorConvex = new browser_1.ConvexClient(process.env["CONVEX_URL"]);
const rest = new rest_1.REST({ version: "10", makeRequest: fetch }).setToken(token);
clientDiscord.on("voiceStateUpdate", (oldState, newState) => {
    //   Verifique se o usuário entrou em um canal de voz
    const { guild, channel, member } = newState;
    if (channel === null || member === null)
        return;
    if (guild.id !== guildId || channel.id !== channelId)
        return;
    const match = (0, getuserMatch_js_1.getUserMatch)(ConvexCachedData.getListMatch(), ConvexCachedData.getListPlayers(), member.user.id);
    console.log(match);
});
// clientDiscord.on("messageCreate", async (message) => {
//   console.log(message.channel);
// });
clientDiscord
    .login(token)
    .then((a) => {
    console.log("bot authenticated");
    monitorConvex.onUpdate(api_js_1.api.users.getUsers, {}, (data) => {
        ConvexCachedData.setListPlayers(data);
        console.log(data);
    });
    monitorConvex.onUpdate(api_js_1.api.match.getMatches, {}, (data) => {
        ConvexCachedData.setListMatch(data);
        console.log(data);
    });
})
    .catch((error) => {
    console.log("Erro ao autenticar bot: ", error);
});
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
// prepareChannels("123898392").then((c) => {
//   console.log("canais criados", c);
// });
