import { ipcMain } from "electron";
import { createDiscordWindow } from "../helpers";
import * as config from "dotenv";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const fileName = isProd ? "production" : "local";

config.config({
  path: path.join(__dirname, "..", "..", `.env.${fileName}`),
});

export const discordInterfaces = (windows: any) => {
  ipcMain.on("open-discord", async (event, arg) => {
    const wd = createDiscordWindow("discord", {
      width: 1000,
      height: 600,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
      },
    });

    windows["discord"] = wd;

    wd.on("close", async (event) => {
      delete windows["discord"];
    });

    wd.webContents.loadURL(arg.url);
  });

  ipcMain.on("discord-oauth", async (event, arg) => {
    const w = createDiscordWindow("discord-oauth", {
      width: 1000,
      height: 600,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
      },
    });

    windows["discord-oauth"] = w;

    w.webContents.loadURL(arg.url);

    const r = event;

    w.on("close", async (event) => {
      delete windows["discord-oauth"];

      if (windows["main"]) {
        windows["main"].reload();
      }

      r.reply("discord-oauth", { status: "closed" });
    });
  });
};
