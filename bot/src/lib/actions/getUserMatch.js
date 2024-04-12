const getUserMatch = (listMatches, listPlayers, discordId) => {
  const player = listPlayers.find((p) => p.discordId === discordId);

  if (!player) return null;

  const match = listMatches
    .filter((match) => match.isOver === false)
    .map((match) => ({
      matchId: match.matchId,
      players: [
        match.teams.teamOne.map((p) => ({ ...p, team: 1 })),
        match.teams.teamTwo.map((p) => ({ ...p, team: 2 })),
      ].flat(),
    }))
    .filter((match) =>
      match.players.some((p) => p.summonerId === player.summonerId)
    )[0];

  if (!match) return null;

  return {
    matchId: match.matchId,
    teamOne:
      match.players.find((p) => p.summonerId === player.summonerId).team === 1,
  };
};

export { getUserMatch };
