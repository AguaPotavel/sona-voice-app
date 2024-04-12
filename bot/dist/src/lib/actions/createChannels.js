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
exports.getGuildChannels = exports.prepareChannels = void 0;
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env.local" });
const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_SERVER_ID"];
const roleEveryone = process.env["DISCORD_ROLE_EVERYONE_ID"];
console.log(guildId);
const getGuildChannels = async (guildId) => {
    const rest = new rest_1.REST({ version: "10", makeRequest: fetch }).setToken(token);
    try {
        const response = await rest.get(v10_1.Routes.guildChannels(guildId));
        return response;
    }
    catch (e) {
        console.log(e);
        return e;
    }
};
exports.getGuildChannels = getGuildChannels;
async function prepareChannels(matchId) {
    const rest = new rest_1.REST({ version: "10", makeRequest: fetch }).setToken(token);
    let parentId;
    let matchData;
    try {
        const channels = (await getGuildChannels(guildId));
        console.log(channels);
        const matchChannel = channels.find((channel) => channel.name === "Match: " + matchId);
        if (matchChannel)
            return matchChannel;
        const response = (await rest.post(v10_1.Routes.guildChannels(guildId), {
            body: {
                name: "Match: " + matchId,
                type: 4,
            },
        }));
        parentId = response.id;
    }
    catch (e) {
        console.log(e);
        return e;
    }
    try {
        const response = await Promise.all([
            rest.post(v10_1.Routes.guildChannels(guildId), {
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
            rest.post(v10_1.Routes.guildChannels(guildId), {
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
    }
    catch (e) {
        console.log(e);
        return e;
    }
    return matchData;
}
exports.prepareChannels = prepareChannels;
