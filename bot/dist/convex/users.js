"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserIfNotExists = exports.getByDiscordId = exports.getBySummonerId = exports.getUsers = void 0;
const values_1 = require("convex/values");
const server_1 = require("./_generated/server");
exports.getUsers = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});
exports.getBySummonerId = (0, server_1.query)({
    args: { summonerId: values_1.v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
            .collect();
    },
});
exports.getByDiscordId = (0, server_1.query)({
    args: { discordId: values_1.v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("discordId"), args.discordId))
            .collect();
    },
});
exports.createUserIfNotExists = (0, server_1.mutation)({
    args: {
        summonerId: values_1.v.number(),
        summonerName: values_1.v.string(),
        discordId: values_1.v.string(),
        discordName: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
            .first();
        if (user === null) {
            const userId = await ctx.db.insert("users", {
                summonerId: args.summonerId,
                summonerName: args.summonerName,
                discordId: args.discordId,
                discordName: args.discordName,
            });
            return userId;
        }
        return user;
    },
});
