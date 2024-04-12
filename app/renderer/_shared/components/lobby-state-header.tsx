import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/_shared/utils/cn";
import { cva } from "class-variance-authority";
import { TGameFlow } from "../hooks/useWebsocket";
import { Loader } from "./loader";
import { useState, useEffect } from "react";

const stateVariants = cva(
  "flex flex-row rounded-full w-fit px-4 h-12 gap-2 bg-gray-800 font-bold",
  {
    variants: {
      state: {
        None: "bg-gray-900 text-primary-100 opacity-50",
        Unknown: "bg-gray-900 text-primary-100 opacity-50",
        Lobby: "bg-gray-900 text-primary-100 opacity-50",
        Matchmaking: "bg-primary-600 px-2 items-center text-primary-100",
        ReadyCheck: "bg-success-500 text-primary-100",
        ChampSelect: "bg-success-500 text-primary-100",
        GameStart: "bg-success-500 text-primary-100",
        InProgress: "bg-success-500 text-primary-100",
        WaitingForStats: "bg-gray-700 text-primary-100",
        EndOfGame: "bg-gray-700 text-primary-100",
        Error: "bg-error-500 text-primary-100",
      },
    },
    defaultVariants: {
      state: "Lobby",
    },
  }
);

const LobbyHeader = ({ state }: { state: TGameFlow }) => {
  const [animate, setAnimate] = useState(false);
  const [stateText, setStateText] = useState<TGameFlow>("None");

  useEffect(() => {
    setAnimate(true);
    setStateText(state);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, [state]);

  const text = (state: TGameFlow) => {
    switch (state) {
      case "None":
        return "Nenhum";
      case "Unknown":
        return "Desconhecido";
      case "Lobby":
        return "Lobby";
      case "Matchmaking":
        return "Procurando partida";
      case "ReadyCheck":
        return "Pronto";
      case "ChampSelect":
        return "Seleção de campeões";
      case "GameStart":
        return "Início da partida";
      case "InProgress":
        return "Em andamento";
      case "WaitingForStats":
        return "Esperando estatísticas";
      case "EndOfGame":
        return "Fim da partida";
      case "Error":
        return "Erro";
    }
  };

  return (
    <motion.div className={cn(stateVariants({ state }))}>
      <motion.div layout className="min-w-24">
        <AnimatePresence>
          {!animate && (
            <motion.div
              className="flex items-center justify-center h-full"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.9 } }}
              exit={{ y: -10, opacity: 0, transition: { duration: 0.1 } }}
            >
              {text(stateText)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {state === "Matchmaking" && <Loader size="xs" />}
    </motion.div>
  );
};

export { LobbyHeader };
