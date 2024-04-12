"use client";

import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import useLeague from "./useLeague";
import {
  Observable,
  distinctUntilKeyChanged,
} from "rxjs";
import { useRef } from "react";
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";

type TConnectionState = "connected" | "disconnected" | "connecting" | "error";
export type TGameFlow =
  | "None"
  | "Unknown"
  | "Lobby"
  | "Matchmaking"
  | "ReadyCheck"
  | "ChampSelect"
  | "GameStart"
  | "InProgress"
  | "WaitingForStats"
  | "EndOfGame"
  | "Error";

type TWebSocketState = {
  state: TConnectionState;
  gameFlow: TGameFlow;
  gameData: any;
};

const websocketAtom = atom<TWebSocketState>({
  gameFlow: "Unknown",
  state: "disconnected",
  gameData: null,
});

const useWebsocket = () => {
  const [websocket, setWebSocket] = useAtom(websocketAtom);
  const subscription = useRef(null);
  const sub = useRef(null);
  const interval = useRef(null);
  const { goToLobby } = useLeague();
  const matchCreate = useMutation(api.matchs.createMatch);
  const matchUpdate = useMutation(api.matchs.updateMatch);

  useHydrateAtoms([[websocketAtom, websocket]]);

  function setGameflow(gameflow: TGameFlow) {
    setWebSocket((old) => ({ ...old, gameFlow: gameflow }));
  }

  async function setGameData(gameData: any) {
    setWebSocket((old) => ({ ...old, gameData: gameData }));
  }

  async function setupServer() {
    const { send, on } = window.ipc;
    console.log("setupServer")

    on("front-listening", (isListening: boolean) => {
      console.log("front-listening", isListening)

      if (!isListening) {
        send("connect-websocket", {});
      }else{
        goToLobby();
      }
    })

    on("connect-websocket", (data: any) => {

      if (data.status === "OK") {
        setupClient(send, on);
      } else {
        setWebSocket({ ...websocket, state: "error" });
      }
    });

    send("front-listening", {})
  }

  async function setupClient(send, on) {
    subscription.current = new Observable((subscriber) => {
      on("gameflow", (data: any) => {
        subscriber.next(data);
      });

      interval.current = setInterval(() => {
        send("get-gameflow", {});
      }, 1000);

      return () => {
        console.log("unsubscribe");
        clearInterval(interval.current);
      };
    });

    listen();
  }

  function listen() {
    sub.current = subscription.current
      .pipe(distinctUntilKeyChanged("phase"))
      .subscribe((response) => {
        if (response === null) {
          return;
        }

        if (response.phase === "InProgress") {
          setGameData(response.gameData);
          matchCreate({
            matchId: response.gameData.gameId as number,
            teams: {
              teamOne: response.gameData.teamOne.map((summoner: any) => ({
                summonerId: summoner.summonerId,
                championId: summoner.championId,
                role: summoner.selectedPosition
              })),
              teamTwo: response.gameData.teamTwo.map((summoner: any) => ({
                summonerId: summoner.summonerId,
                championId: summoner.championId,
                role: summoner.selectedPosition
              }))
            }
          })
        }

        if(response.phase === "EndOfGame"){
          matchUpdate({
            matchId: response.gameData.gameId as number,
            isOver: true
          })
        }

        setGameflow(response.phase);

        console.log(response);
      });

    setWebSocket((old) => ({ ...old, state: "connected" }));
    goToLobby();
  }

  function unListen() {
    if (sub.current === null) return;

    sub.current.unsubscribe();

    setWebSocket((old) => ({ ...old, listening: false }));
  }

  return { websocket, setupServer, unListen };
};

export default useWebsocket;
