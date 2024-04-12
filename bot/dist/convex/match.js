"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatch = exports.createMatch = exports.getMatch = exports.getMatches = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
const server_2 = require("./_generated/server");
exports.getMatches = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("matchData").collect();
    },
});
exports.getMatch = (0, server_1.query)({
    args: { matchId: values_1.v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("matchData")
            .filter((q) => q.eq(q.field("matchId"), args.matchId))
            .collect();
    },
});
exports.createMatch = (0, server_2.mutation)({
    args: {
        matchId: values_1.v.number(),
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
    },
    handler: async (ctx, args) => {
        const match = await ctx.db
            .query("matchData")
            .filter((q) => q.eq(q.field("matchId"), args.matchId))
            .first();
        if (match === null) {
            const matchId = await ctx.db.insert("matchData", {
                matchId: args.matchId,
                teams: args.teams,
                isOver: false,
            });
            return matchId;
        }
        else {
            return match;
        }
    },
});
exports.updateMatch = (0, server_2.mutation)({
    args: {
        matchId: values_1.v.number(),
        isOver: values_1.v.boolean(),
    },
    handler: async (ctx, args) => {
        const match = await ctx.db
            .query("matchData")
            .filter((q) => q.eq(q.field("matchId"), args.matchId))
            .first();
        if (match !== null) {
            const matchId = await ctx.db.patch(match._id, {
                isOver: args.isOver,
            });
            return matchId;
        }
        else {
            return match;
        }
    },
});
