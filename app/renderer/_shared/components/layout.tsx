"use client";
import { useLayoutEffect, useState, Fragment, useEffect } from "react";

import useCredentials, { TCredentials } from "@/_shared/hooks/useCredentials";
import { ConnectDiscord } from "./connect-discord";
import { SearchingClient } from "./searching-client";
import useWebsocket from "@/_shared/hooks/useWebsocket";
import { Header } from "./header";
import { PlayerHeader } from "./player-header";
import { LobbyHeader } from "./lobby-state-header";

import { motion } from "framer-motion";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { credentials, setLeagueData, setAppVersion, isReady } =
    useCredentials();
  const { setupServer, websocket } = useWebsocket();

  useLayoutEffect(() => {
    const { send, on } = window.ipc;

    if (credentials.state !== "disconnected") return;

    on("get-version", ({ version }) => {
      setAppVersion(version);

      setTimeout(() => {
        setupServer();
      }, 3000);
    });

    on("connect-league", async (data: TCredentials) => {

      if (data.state === "ready") {
        await setLeagueData(data.leagueClientData);
        send("get-version", "version");
      }
    });

    setTimeout(() => {
      send("connect-league", {});
    }, 500);
  }, []);

  return (
    <Fragment>
      {credentials.state === "disconnected" && <SearchingClient />}
      {credentials.state === "missing-discord" && (
        <ConnectDiscord
          summonerId={credentials.leagueClientData?.summoner.summonerId}
        />
      )}
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-2 px-24 py-8">
        {isReady() && (
          <Header gameFlow={websocket.gameFlow}>
            <PlayerHeader
              leagueData={credentials.leagueClientData!}
              discordData={credentials.discordData!}
            />
          </Header>
        )}
        {children}

        <motion.div className="flex h-2 w-full items-center justify-end">
          <h1 className="font-bold text-sm">
            Version: {credentials.appVersion}
          </h1>
        </motion.div>
      </main>
    </Fragment>
  );
}
