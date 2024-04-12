import { ipcMain, app } from "electron";
import { autoUpdater } from "electron-updater";

export const updaterInterfaces = () => {
  ipcMain.on("get-update", (event, arg) => {
    autoUpdater.setFeedURL(
      "https://grbthjpdsusu.objectstorage.sa-saopaulo-1.oci.customer-oci.com/n/grbthjpdsusu/b/bucket-sona-app/o/"
    );
    autoUpdater.checkForUpdatesAndNotify().then((response) => {
      if (response === null) {
        event.reply("get-update", {
          available: false,
        });
      }
    });

    autoUpdater.on("update-available", () => {
      event.reply("get-update", {
        available: true,
      });
    });

    autoUpdater.on("update-not-available", () => {
      event.reply("get-update", {
        available: false,
      });
    });

    autoUpdater.on("download-progress", (progress) => {
      event.reply("get-update", {
        progress: progress.percent,
      });
    });

    autoUpdater.on("update-downloaded", () => {
      event.reply("get-update", {
        downloaded: true,
      });

      autoUpdater.quitAndInstall();
    });

    autoUpdater.on("error", (error) => {
      console.log("error", error);

      event.reply("get-update", {
        error: error,
      });
    });

    autoUpdater.on("update-not-available", () => {
      console.log("update-not-available");

      event.reply("get-update", {
        available: false,
      });
    });

    // event.reply("get-version", {
    //   version: app.getVersion(),
    // });
  });

  ipcMain.on("get-version", (event, arg) => {
    // console.log(app.getVersion());

    event.reply("get-version", {
      version: app.getVersion(),
    });
  });

  ipcMain.on("install-update", (event, arg) => {
    autoUpdater.quitAndInstall();
  });
};
