import { ipcMain } from "electron";

import {
  accept,
  connect,
  getCredential,
  getCurrentGameflow,
  goLobby,
  getLobby,
  decline,
  stopSearch,
  setWebSocketConnection,
  startSearch,
} from "../lce";

let frontIsListening = false;

export const leagueInterfaces = () => {
  ipcMain.on("connect-league", async (event, arg) => {
    let connected = false;
    frontIsListening = false;

    while (!connected) {
      try {
        const response = await connect();

        if (response.state === "ready") {
          event.reply("connect-league", response);
          connected = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  ipcMain.on("connect-websocket", async (event, arg) => {
    const response = await setWebSocketConnection();

    if (response.status === "OK") {
      console.log("websocket connection established");
      frontIsListening = true;
    }

    event.reply("connect-websocket", response);
  });

  ipcMain.on("get-gameflow", async (event, arg) => {
    console.log("get-gameflow");

    event.reply("gameflow", getCurrentGameflow());
  });

  ipcMain.on("front-listening", async (event, arg) => {
    event.reply("front-listening", frontIsListening);
  });

  ipcMain.on("set-gameflow", async (event, arg) => {
    if (arg.type === "lobby") {
      const response = await getLobby(getCredential());

      if (response.phase === "None" || response.httpStatus === 404) {
        await goLobby(getCredential());
      }
    }

    if (arg.type === "start-search") {
      const response = await startSearch(getCredential());
    }

    if (arg.type === "stop-search") {
      const response = await stopSearch(getCredential());
    }

    if (arg.type === "accept-match") {
      const response = await accept(getCredential());
    }

    if (arg.type === "decline-match") {
      const response = await decline(getCredential());
    }
  });
};
