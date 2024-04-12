import React from "react";
// import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import useCredentials, { TCredentials } from "@/_shared/hooks/useCredentials";
import LayoutApp from "@/_shared/components/layout";
import { Button } from "@/_shared/components/button";
import { UserCard } from "@/_shared/components/user-card";
import { useRouter } from "next/router";

export default function HomePage() {
  const { credentials, isReady, setAppVersion } = useCredentials();
  const router = useRouter();

  const handleClickLobby = () => {
    console.log("Go to Lobby");
    router.push("/lobby");
  };

  return (
    <React.Fragment>
      {isReady() && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <UserCard
            leagueData={credentials.leagueClientData!}
            discordData={credentials.discordData!}
          />

          <Button className="w-64" onClick={handleClickLobby}>
            Go to Lobby
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
