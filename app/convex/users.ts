import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getBySummonerId = query({
  args: { summonerId: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
      .first();
  },
});

export const getByDiscordId = query({
  args: { discordId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("discordId"), args.discordId))
      .first();
  },
});

export const createUserIfNotExists = mutation({
  args: {
    summonerId: v.number(),
    summonerName: v.string(),
    discordId: v.optional(v.string()),
    discordName: v.optional(v.string()),
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

export const updateDiscordUser = mutation({
  args: {
    summonerId: v.number(),
    discordId: v.string(),
    discordName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
      .first();

    console.log(user);

    if (user !== null) {
      const u = await ctx.db.patch(user._id, {
        discordId: args.discordId,
        discordName: args.discordName,
      });

      return u;
    } else {
      return user;
    }
  },
});

export const removeDiscord = mutation({
  args: {
    summonerId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
      .first();

    if (user !== null) {
      const u = await ctx.db.patch(user._id, {
        discordId: undefined,
        discordName: undefined,
      });

      return u;
    } else {
      return user;
    }
  },
});
