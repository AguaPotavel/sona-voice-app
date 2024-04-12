import {
  authenticate,
  createHttp2Request,
  createHttpSession,
  createHttp1Request,
} from "league-connect";

import { TCredentials, TLeagueClient } from "@/_shared/hooks/useCredentials";

let credentials = null;

async function getLastVersion(): Promise<string> {
  try {
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const data = await response.json();

    return data[0];
  } catch (err) {
    return "error";
  }
}

async function getLastChampionsList(version: string): Promise<any> {
  try {
    const response = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return "error";
  }
}

async function connect(): Promise<TCredentials> {
  try {
    let credential = null;
    try {
      credential = await authenticate({ awaitConnection: true });
    } catch (e) {
      console.log(e);

      setTimeout(() => {
        connect();
      }, 5000);
    }

    const version = await getLastVersion();

    if (version === "error") {
      throw new Error("Error getting the latest version");
    }

    const champions = await getLastChampionsList(version);

    const session = await createHttpSession(credential);
    const response = await createHttp2Request(
      {
        method: "GET",
        url: "/lol-summoner/v1/current-summoner",
      },
      session,
      credential
    );

    const userInformation = await response.json();

    session.close();

    credentials = credential;

    if (userInformation.accountId === undefined) {
      return {
        state: "disconnected",
      } as TCredentials;
    }

    return {
      leagueClientData: {
        ...credential,
        state: "connected",
        summoner: userInformation,
        version,
        champions,
      } as TLeagueClient,
      state: "ready",
    } as TCredentials;
  } catch (err) {
    console.log(err);

    return {
      state: "disconnected",
    } as TCredentials;
  }
}

const getLobby = async (credentials: TLeagueClient) => {
  const response = await createHttp1Request(
    {
      method: "GET",
      url: "/lol-gameflow/v1/session",
    },
    credentials
  );

  return response.json();
};

const goLobby = async (credentials: TLeagueClient) => {
  const response = await createHttp1Request(
    {
      method: "POST",
      url: "/lol-lobby/v2/lobby",
      body: {
        queueId: 420,
        isCustom: false,
      },
    },
    credentials
  );

  return response.json();
};

const startSearch = async (credentials: TLeagueClient) => {
  await createHttp1Request(
    {
      method: "POST",
      url: "/lol-lobby/v2/lobby/matchmaking/search",
    },
    credentials
  );
  return true;
};

const stopSearch = async (credentials: TLeagueClient) => {
  await createHttp1Request(
    {
      method: "DELETE",
      url: "/lol-lobby/v2/lobby/matchmaking/search",
    },
    credentials
  );
  return true;
};

const accept = async (credentials: TLeagueClient) => {
  await createHttp1Request(
    {
      method: "POST",
      url: "/lol-matchmaking/v1/ready-check/accept",
    },
    credentials
  );

  return true;
};

const decline = async (credentials: TLeagueClient) => {
  await createHttp1Request(
    {
      method: "POST",
      url: "/lol-matchmaking/v1/ready-check/decline",
    },
    credentials
  );

  return true;
};

const getCredential = () => {
  return credentials;
};

export {
  connect,
  getCredential,
  startSearch,
  accept,
  getLobby,
  goLobby,
  stopSearch,
  decline,
};
