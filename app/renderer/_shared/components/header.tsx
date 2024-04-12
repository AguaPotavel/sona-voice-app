import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";
import { FaClone } from "react-icons/fa6";
import CryptoJs from "crypto-js";
import { LobbyHeader } from "./lobby-state-header";
import { TGameFlow } from "../hooks/useWebsocket";

const Header = ({
  children,
  gameFlow,
}: {
  children: React.ReactNode;
  gameFlow: TGameFlow;
}) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/home");
  };

  const handleGoLobby = () => {
    router.push("/lobby");
  };

  const handleGoProfile = () => {
    router.push("/profile");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-row py-2 px-4 justify-center rounded-md z-40 bg-black w-full bg-gray-800 h-24 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 20 }}
      >
        <motion.div className="flex flex-1 flex-start">{children}</motion.div>
        <motion.div className="flex flex-1 items-center justify-end gap-1">
          <Button
            onClick={handleGoHome}
            className="w-24 px-8"
            variant="ghost"
          >
            Home
          </Button>
          <Button
            onClick={handleGoLobby}
            className="w-24 px-8"
            variant="ghost"
          >
            Ir para Lobby
          </Button>

          <Button
            onClick={handleGoProfile}
            className="w-24 px-4"
            variant="ghost"
          >
            Editar perfil
          </Button>
        </motion.div>
        {/* <motion.div className="flex flex-1 items-center justify-end">
          <LobbyHeader state={gameFlow} />
        </motion.div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export { Header };
