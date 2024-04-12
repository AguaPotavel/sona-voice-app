"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)({
        summonerId: values_1.v.number(),
        summonerName: values_1.v.string(),
        discordId: values_1.v.string(),
        discordName: values_1.v.string(),
    }),
    matchData: (0, server_1.defineTable)({
        matchId: values_1.v.number(),
        isOver: values_1.v.boolean(),
        teams: values_1.v.object({
            teamOne: values_1.v.array(values_1.v.object({
                summonerId: values_1.v.number(),
                championId: values_1.v.number(),
                role: values_1.v.string(),
            })),
            teamTwo: values_1.v.array(values_1.v.object({
                summonerId: values_1.v.number(),
                championId: values_1.v.number(),
                role: values_1.v.string(),
            })),
        }),
    }),
});
