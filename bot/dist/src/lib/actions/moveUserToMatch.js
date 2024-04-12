"use strict";
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
exports.moveUserToMatch = void 0;
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
const createChannels_1 = require("./createChannels");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env.local" });
const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const roleEveryone = process.env["DISCORD_ROLE_EVERYONE_ID"];
const moveUserToMatch = async (userId, matchInfo) => {
    const rest = new rest_1.REST({ version: "10", makeRequest: fetch }).setToken(token);
    const channels = (await (0, createChannels_1.getGuildChannels)(guildId));
    const matchId = matchInfo.matchId;
    const teamOne = matchInfo.teamOne;
    const getMatchCategory = async () => {
        const matchChannel = channels.find((channel) => channel.name === "Match: " + matchId);
        return matchChannel;
    };
    const getTeamChannel = async () => {
        const matchChannel = await getMatchCategory();
        const teamChannel = channels.filter((channel) => channel.name === "Team " + (teamOne ? "One" : "Two"));
        return teamChannel.filter((channel) => channel.parent_id === matchChannel.id)[0];
    };
    const teamChannel = await getTeamChannel();
    if (teamChannel) {
        await rest.post(v10_1.Routes.guildMember(guildId, userId), {
            body: {
                channel_id: teamChannel.id,
            },
        });
    }
    return;
};
exports.moveUserToMatch = moveUserToMatch;
