import { parentPort, workerData } from "worker_threads";
import { moveUserToMatch } from "./actions/moveUserToMatch.js";
import { getUserMatch } from "./actions/getUserMatch.js";

parentPort.on("message", (message) => {
  if (workerData.type === "moveUserToMatch") {
    const match = defineIfMoveUser(
      workerData.listMatch,
      workerData.listPlayer,
      workerData.userId
    );

    if (match === null) return;

    handleMoveuser(match);
  }
});

parentPort.on("error", (error) => {
  console.log("error", error);
});

function handleMoveuser(match) {
  moveUserToMatch(workerData.userId, match);
}

function defineIfMoveUser(listMatch, listPlayer, userId) {
  return getUserMatch(listMatch, listPlayer, userId);
}
