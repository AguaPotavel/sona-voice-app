"use client";

import { api } from "convex/_generated/api";
import { useAction, useMutation } from "convex/react";

import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { Credentials } from "league-connect";

export type TConnectionState =
  | "connected"
  | "disconnected"
  | "connecting"
  | "error";

export type TCredentialsState = "ready" | "missing-discord" | "disconnected";

export type TLeagueClient = Credentials & {
  state: TConnectionState;
  summoner?: any;
  version?: string;
  champions?: any;
};

export type TDiscordData = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  global_name: string;
  email: string;
  verified: boolean;
  state: TConnectionState;
};

export type TCredentials = {
  leagueClientData: TLeagueClient | null;
  discordData: TDiscordData | null;
  state: TCredentialsState;
  synced: boolean;
  appVersion: string;
};

const credentialsAtom = atom<TCredentials>({
  leagueClientData: null,
  discordData: null,
  state: "disconnected",
  synced: false,
  appVersion: "0.0.1",
});

const useCredentials = () => {
  // @ts-ignore
  const user = useAction(api.actions.getUserByIdAction);
  // @ts-ignore
  const createUser = useMutation(api.users.createUserIfNotExists);
  const [credentials, setCredentials] = useAtom(credentialsAtom);
  useHydrateAtoms([[credentialsAtom, credentials]]);

  async function setLeagueData(leagueData: TLeagueClient) {
    const usersMatch = await user({
      summonerId: leagueData?.summoner.summonerId,
    });

    if (usersMatch === null) {
      const r = await createUser({
        summonerId: leagueData?.summoner.summonerId,
        summonerName:
          leagueData?.summoner.gameName + "-" + leagueData?.summoner.tagLine,
        discordId: undefined,
        discordName: undefined,
      });

      setCredentials({
        ...credentials,
        leagueClientData: leagueData,
        state: "missing-discord",
      });
    } else if ("discordId" in usersMatch === false || usersMatch.discordId === null) {
      setCredentials({
        ...credentials,
        leagueClientData: leagueData,
        state: "missing-discord",
      });
    } else {
      setCredentials({
        ...credentials,
        leagueClientData: leagueData,
        discordData: {
          id: usersMatch.discordId,
          username: usersMatch.discordName,
        } as any,
        state: "ready",
        synced: true,
      });
    }

    // setCredentials(mockCredentials as TCredentials);
  }

  function isReady() {
    return credentials.state === "ready";
  }

  function setAppVersion(appVersion: string) {
    setCredentials((old) => ({ ...old, appVersion }));
  }

  return {
    credentials,
    setCredentials,
    isReady,
    setLeagueData,
    setAppVersion,
  };
};

export default useCredentials;
