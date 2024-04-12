import useCredentials from "@/_shared/hooks/useCredentials";
import useLeague from "@/_shared/hooks/useLeague";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const variantOne = {
  initial: {
    opacity: 0,
    x: 300,
    y: 0,
    transition: { duration: 0.1, type: "spring", stiffness: 100 },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, delay: 0, type: "spring", stiffness: 150 },
  },
  exit: {
    y: -400,
    x: 300,
    scale: 1,
    transition: { duration: 1, type: "spring", stiffness: 100 },
  },
};

const ChampSelect = () => {
  const { credentials } = useCredentials();
  const [champion, setChampion] = useState(null);
  const [oldChampion, setOldChampion] = useState(null); // [champion, setChampion
  const [championList, setChampionList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (credentials.leagueClientData?.champions.data) {
      setChampionList(
        Object.keys(credentials.leagueClientData?.champions.data).map(
          (key) => credentials.leagueClientData?.champions.data[key]
        )
      );
    }
  }, []);

  useEffect(() => {
    if (championList.length === 0) return;

    setChampion(championList[Math.floor(Math.random() * championList.length)]);

    const interval = setInterval(() => {
      if (championList.length > 0) {
        setChampion(
          championList[Math.floor(Math.random() * championList.length)]
        );
      }
    }, 4400);
    return () => {
      clearInterval(interval);
    };
  }, [championList]);

  useEffect(() => {
    if (champion !== oldChampion) {
      setOldChampion(champion);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }

    return () => {
      setShow(false);
    };
  }, [champion]);

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
          <AnimatePresence>
            {show && <Champ champion={champion} />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Champ = ({ champion }) => {
  return (
    <motion.div
      variants={variantOne}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className="flex flex-col items-center gap-4 relative p-2"
    >
      <div className="w-[160px] h-60 overflow-hidden bg-gray-900 flex justify-center items-center border-2 border-primary-500 relative">
        <div className="min-w-full min-h-full absolute z-30 bg-gradient-to-b from-gray-500/10 to-gray-900"></div>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
          className="h-72 scale-x-110 bottom-0 z-0"
        />
      </div>

      <motion.div className="flex flex-col text-center absolute bottom-0 z-40">
        <h1 className="text-xl font-semibold">{champion.name}</h1>
        <h1 className="text-xs">{champion.title}</h1>
      </motion.div>
    </motion.div>
  );
};

export default ChampSelect;
