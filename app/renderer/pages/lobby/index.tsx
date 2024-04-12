"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import useCredentials from "@/_shared/hooks/useCredentials";
import useWebsocket from "@/_shared/hooks/useWebsocket";
import { useRouter } from "next/router";

import { Button } from "@/_shared/components/button";
import { Header } from "@/_shared/components/header";
import InProgress from "./_components/in-progress";

// stepComponents
import StartMatchMaking from "./_components/lobby";
import ReadyCheck from "./_components/ready-check";
import SearchingMatch from "./_components/searching";
import ChampSelect from "./_components/champ-select";
import WaitingStep from "./_components/waiting-step";
import WaitingStatus from "./_components/waiting-status";

import StepIndicator, { Step } from "./_components/step-indicator";

export default function App() {
  const [gameflow, setGameflow] = useState("Unknown");
  const { credentials } = useCredentials();
  const { websocket } = useWebsocket();

  useEffect(() => {
    setTimeout(() => {
      handleGoLobby();
    }, 100);
  }, []);

  useEffect(() => {
    if (websocket.gameFlow) {
      setGameflow(websocket.gameFlow);
    }
  }, [websocket]);

  const handleGoLobby = () => {
    const { send } = window.ipc;
    send("set-gameflow", { type: "lobby" });
  };

  return (
    <>
      {credentials.state === "ready" && (
        <main className="flex min-h-fit flex-1 flex-col items-center justify-start gap-2 w-full ">
          <StepIndicator matcher={gameflow as any} />

          <main className="flex min-h-fit flex-1 flex-col items-center justify-center gap-2 w-full bg-gray-800 overflow-hidden rounded-md">
            {gameflow === "Lobby" && (<StartMatchMaking />)}
            {gameflow === "Matchmaking" && (<SearchingMatch />)}
            {gameflow === "ReadyCheck" && (<ReadyCheck />)}
            {gameflow === "ChampSelect" && (<ChampSelect />)}
            {gameflow === "InProgress" && (<InProgress gameData={websocket.gameData} />)}
            {gameflow === "WaitingForStats" && (<WaitingStatus />)}

            {!Object.keys(Step).includes(gameflow) && <WaitingStep />}
          </main>
        </main>
      )}
    </>
  );
}
