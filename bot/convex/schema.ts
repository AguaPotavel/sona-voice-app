import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    summonerId: v.number(),
    summonerName: v.string(),
    discordId: v.optional(v.string()),
    discordName: v.optional(v.string()),
  }),
  matchData: defineTable({
    matchId: v.number(),
    isOver: v.boolean(),
    channelDeleted: v.optional(v.boolean()),
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
  }),
});
