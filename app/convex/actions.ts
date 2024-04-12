import { v } from "convex/values";

import { internal } from "./_generated/api";
import { action, internalMutation, internalQuery } from "./_generated/server";

export const getUserBySummonerIdInternal = internalQuery({
  args: { summonerId: v.number() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("summonerId"), args.summonerId))
      .first();
    return user;
  },
});

export const getUserByDiscordId = internalQuery({
  args: { discordId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("discordId"), args.discordId))
      .first();
    return user;
  },
});

export const getUserByDiscordAction = action({
  args: { discordId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.actions.getUserByDiscordId, {
      discordId: args.discordId,
    });

    return user;
  },
}) as any;

export const getUserByIdAction = action({
  args: { summonerId: v.number() },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(
      internal.actions.getUserBySummonerIdInternal,
      {
        summonerId: args.summonerId,
      }
    );

    return user;
  },
}) as any;
