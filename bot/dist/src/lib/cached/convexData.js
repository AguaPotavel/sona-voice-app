"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvexCache = void 0;
class ConvexCache {
    constructor() {
        this.listMatch = [];
        this.listPlayers = [];
        this.listMatch = [
            {
                _creationTime: 1708646346296.5688,
                _id: "j570fw7gmgqk6neqn65xmzm8t56kytdd",
                isOver: false,
                matchId: 1,
                teams: {
                    teamOne: [
                        { championId: 1, role: "top", summonerId: 1 },
                        { championId: 2, role: "jungle", summonerId: 2 },
                        { championId: 3, role: "mid", summonerId: 3 },
                        { championId: 4, role: "adc", summonerId: 4 },
                        { championId: 5, role: "support", summonerId: 5 },
                    ],
                    teamTwo: [
                        { championId: 6, role: "top", summonerId: 6 },
                        { championId: 7, role: "jungle", summonerId: 7 },
                        { championId: 8, role: "mid", summonerId: 8 },
                        { championId: 9, role: "adc", summonerId: 9 },
                        { championId: 10, role: "support", summonerId: 10 },
                    ],
                },
            },
            {
                _creationTime: 1708646346296.5688,
                _id: "j570fw7gmgqk6neqn65xmzm8t56kytdd",
                isOver: false,
                matchId: 10,
                teams: {
                    teamOne: [
                        { championId: 11, role: "top", summonerId: 11 },
                        { championId: 12, role: "jungle", summonerId: 12 },
                        { championId: 13, role: "mid", summonerId: 13 },
                        { championId: 14, role: "adc", summonerId: 14 },
                        { championId: 15, role: "support", summonerId: 15 },
                    ],
                    teamTwo: [
                        { championId: 16, role: "top", summonerId: 16 },
                        { championId: 17, role: "jungle", summonerId: 17 },
                        { championId: 18, role: "mid", summonerId: 18 },
                        { championId: 19, role: "adc", summonerId: 19 },
                        { championId: 110, role: "support", summonerId: 110 },
                    ],
                },
            },
        ];
        this.listPlayers = [
            {
                _creationTime: 1708645873733.2852,
                _id: "j973tjp7x195dhhwjpjb0f5bcn6kz0e8",
                discordId: "213912157115514882",
                discordName: "AguaPotavel",
                summonerId: 11,
                summonerName: "Teste",
            },
        ];
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
exports.ConvexCache = ConvexCache;
