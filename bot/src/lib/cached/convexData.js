class ConvexCache {
  listMatch = [];
  listPlayers = [];

  constructor() {
    this.listMatch = [];
    this.listPlayers = [];
  }

  getListMatch() {
    return this.listMatch;
  }

  getListPlayers() {
    return this.listPlayers;
  }

  setListMatch(listMatch) {
    this.listMatch = listMatch;
  }

  setListPlayers(listPlayers) {
    this.listPlayers = listPlayers;
  }
}

export { ConvexCache };
