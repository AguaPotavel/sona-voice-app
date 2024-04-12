import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@/_shared/components/loader";
import { useEffect, useState } from "react";
import { Button } from "@/_shared/components/button";
import useLeague from "@/_shared/hooks/useLeague";

const SearchingMatch = () => {
  const [time, setTime] = useState(0);
  const { stopMatchMaking } = useLeague();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((old) => old + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="p-8 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="flex items-center justify-center mb-8">
            <Loader size="sm" />
          </div>
          <h1 className="text-xl font-semibold text-center">
            Procurando partida
          </h1>
          <h2 className="text-xl font-semibold text-center tabular-nums">
            {formatTime(time)}
          </h2>

          <div className="flex items-center justify-center my-8">
            <Button variant="secondary" onClick={stopMatchMaking}>
              Cancelar busca
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchingMatch;
