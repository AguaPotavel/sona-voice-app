import { app, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";
import { createWindow } from "./helpers";
import {
  leagueInterfaces,
  discordInterfaces,
  updaterInterfaces,
} from "./interfaces";

import * as config from "dotenv";

const isProd = process.env.NODE_ENV === "production";
const fileName = isProd ? "production" : "local";

config.config({
  path: path.join(__dirname, "..", `.env.${fileName}`),
});

// console.log(process.env);

let windows = {};

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  windows["main"] = mainWindow;

  if (isProd) {
    await mainWindow.loadURL("app://./updater");
    mainWindow.removeMenu();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  leagueInterfaces();
  discordInterfaces(windows);
  updaterInterfaces();
})();

app.on("window-all-closed", () => {
  app.quit();
});
