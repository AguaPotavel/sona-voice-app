import { createWebSocketConnection } from "league-connect";
import { getLobby, getCredential } from "./league-actions";

let ws = null;
let currentGameFlow = { phase: "Unknown" };

async function setWebSocketConnection() {
  if (ws == null) {
    try {
      ws = await createWebSocketConnection({
        authenticationOptions: {
          awaitConnection: true,
        },
        pollInterval: 1000,
        maxRetries: 10,
      });

      ws.subscribe("/lol-gameflow/v1/session", (data, event) => {
        currentGameFlow = data;
        console.log("gameflow", data);
      });

      setTimeout(() => {
        getLobby(getCredential()).then((response: any) => {
          currentGameFlow = response;
        });
      }, 1000);
    } catch (e) {
      console.log(e);

      return { status: "ERROR", error: e };
    }
  }

  return { status: "OK" };
}

function getCurrentGameflow() {
  return currentGameFlow;
}

export { setWebSocketConnection, getCurrentGameflow };
