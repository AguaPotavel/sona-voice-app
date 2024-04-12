import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { useEffect, useState } from "react";

import { FaClone } from "react-icons/fa6";
import CryptoJs from "crypto-js";

const ConnectDiscord = ({ summonerId }) => {
  const [token, setToken] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    asyncSet();
  }, []);

  const asyncSet = async () => {
    const t = await CryptoJs.AES.encrypt(
      summonerId.toString(),
      process.env.NEXT_PUBLIC_SONA_SECRET_DISCORD_OAUTH
    ).toString();
    setToken(t);
  };

  const signIn = async () => {
    const { send, on } = window.ipc;

    on("discord-oauth", (callback: any) => {
      console.log("discord-oauth closed", callback);
    });

    send("discord-oauth", { url: process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL });
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const textEllipsis = (text: string) => {
    if (text === null) return "Carregando...";

    return (
      text.substring(0, 10) +
      "..." +
      text.substring(text.length - 10, text.length)
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="w-screen h-screen flex flex-col py-4 px-6 rounded-md fixed z-30 bg-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 20 }}
      >
        <motion.div
          layout
          className="flex flex-1 flex-col w-full h-80 items-center justify-center mb-6"
        >
          <motion.div layout className="flex flex-col p-2">
            <h1 className="text-2xl">Seu token:</h1>

            <h1 className="text-sm text-gray-500">
              Clique no token para copiar
            </h1>
            <h1
              className="flex flex-row text-md p-4 my-2 bg-gray-800 cursor-pointer rounded-md"
              onClick={copyToken}
            >
              {textEllipsis(token)}
              <FaClone className="ml-2 text-xl text-primary-500" />
            </h1>

            <AnimatePresence>
              {copied && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-sm text-primary-500"
                >
                  Token copiado!
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>

          <Button onClick={signIn}>Entrar com discord</Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { ConnectDiscord };
