import { v } from "convex/values";

import { query } from "./_generated/server";
import { mutation } from "./_generated/server";

export const getMatches = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("matchData").collect();
  },
});

export const getMatch = query({
  args: { matchId: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("matchData")
      .filter((q) => q.eq(q.field("matchId"), args.matchId))
      .collect();
  },
});

export const createMatch = mutation({
  args: {
    matchId: v.number(),
    teams: v.object({
      teamOne: v.array(
        v.object({
          summonerId: v.number(),
          championId: v.number(),
          role: v.string(),
        })
      ),
      teamTwo: v.array(
        v.object({
          summonerId: v.number(),
          championId: v.number(),
          role: v.string(),
        })
      ),
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
    } else {
      return match;
    }
  },
});

export const updateMatch = mutation({
  args: {
    matchId: v.number(),
    isOver: v.boolean(),
    channelDeleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const match = await ctx.db
      .query("matchData")
      .filter((q) => q.eq(q.field("matchId"), args.matchId))
      .first();
    if (match !== null) {
      const matchId = await ctx.db.patch(match._id, {
        isOver: args.isOver,
        channelDeleted: args.channelDeleted,
      });

      return matchId;
    } else {
      return match;
    }
  },
});
