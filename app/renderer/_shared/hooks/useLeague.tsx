import useCredentials from "./useCredentials";

const useLeague = () => {
    const { credentials } = useCredentials();
    

    function goToLobby() {
        const { send, on } = window.ipc;

        if (credentials.leagueClientData !== null) {
            send("set-gameflow", { type: "lobby" });
        }
    }

    function startMatchMaking() {
        const { send, on } = window.ipc;

        if (credentials.leagueClientData !== null) {
            send("set-gameflow", { type: "start-search" });
        }
    }

    function stopMatchMaking() {
        const { send, on } = window.ipc;

        if (credentials.leagueClientData !== null) {
            send("set-gameflow", { type: "stop-search" });
        }
    }

    function acceptMatch() {
        const { send, on } = window.ipc;

        if (credentials.leagueClientData !== null) {
            send("set-gameflow", { type: "accept-match" });
        }
    }

    function declineMatch() {
        const { send, on } = window.ipc;

        if (credentials.leagueClientData !== null) {
            send("set-gameflow", { type: "decline-match" });
        }
    }


  
  return { goToLobby, startMatchMaking, acceptMatch, declineMatch, stopMatchMaking };
};

export default useLeague;
