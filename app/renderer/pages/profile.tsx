import React from "react";
// import Head from "next/head";
import { Button } from "@/_shared/components/button";
import { UserCard } from "@/_shared/components/user-card";
import useCredentials from "@/_shared/hooks/useCredentials";
import { useRouter } from "next/router";
import { FaDiscord } from "react-icons/fa6";
import { api } from "convex/_generated/api";
import { useAction, useMutation } from "convex/react";

export default function Profile() {
  const { credentials, isReady, setLeagueData } = useCredentials();
  const removeDiscord = useMutation(api.users.removeDiscord);
  const router = useRouter();

  const handleClickLobby = () => {
    removeDiscord({
        summonerId: credentials.leagueClientData.summoner.summonerId
    }).then(() => {
        setLeagueData(credentials.leagueClientData)
    })
  };

  return (
    <React.Fragment>
      {isReady() && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <UserCard
            leagueData={credentials.leagueClientData!}
            discordData={credentials.discordData!}
          />

          <Button className="w-64" variant="destructive" onClick={handleClickLobby}>
            Remover Discord 
            <FaDiscord className="ml-2" />
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
