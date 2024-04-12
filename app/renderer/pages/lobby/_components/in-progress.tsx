import useCredentials from "@/_shared/hooks/useCredentials";
import { AnimatePresence, motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa6";

const variantDivLeft = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.5, delayChildren: 0.5, staggerChildren: 0.5 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delayChildren: 0.2, staggerChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, delayChildren: 0.5, staggerChildren: 0.5 },
  },
};

const variantDivRight = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.5, delayChildren: 0.5, staggerChildren: 0.5 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delayChildren: 0.2, staggerChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, delayChildren: 0.5, staggerChildren: 0.5 },
  },
};

const variantItemLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

const variantItemRight = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
};

const order = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

const InProgress = ({ gameData }: { gameData: any }) => {
  const { credentials } = useCredentials();

  const handleOpenDiscord = () => {
    const { send } = window.ipc;

    send("open-discord", { url: process.env.NEXT_PUBLIC_LINK_DISCORD_INVITE });
  };

  return (
    <main className="w-full h-full flex flex-1 flex-row relative">
      {gameData?.teamOne && gameData?.teamTwo && (
        <>
          <section className="flex flex-1 flex-col h-fit p-2 items-start">
            <h1 className="font-bold text-xl p-3 bg-gradient-to-l from-blue-500 to-gray-800 min-w-[205px] rounded-md mb-2 text-right">
              Time 1
            </h1>

            <motion.ul
              variants={variantDivLeft}
              initial={"hidden"}
              animate={"visible"}
              className="flex flex-col h-fit gap-2"
            >
              {gameData.teamOne
                .sort(
                  (a: any, b: any) =>
                    order.indexOf(a.selectedPosition) -
                    order.indexOf(b.selectedPosition)
                )
                .map((player: any) => (
                  <PlayerIconTeamOne
                    player={player}
                    version={credentials.leagueClientData?.version as string}
                    championsList={credentials.leagueClientData?.champions}
                    selections={gameData.playerChampionSelections}
                  />
                ))}
            </motion.ul>
          </section>

          <section className="flex flex-1 flex-col h-fit p-2 items-end">
            <h1 className="font-bold text-xl p-3 bg-gradient-to-r from-red-500 to-gray-800 min-w-[205px] rounded-md mb-2">
              Time 2
            </h1>
            <motion.ul
              variants={variantDivRight}
              initial={"hidden"}
              animate={"visible"}
              className="flex flex-col h-fit gap-2"
            >
              {gameData.teamTwo
                .sort(
                  (a: any, b: any) =>
                    order.indexOf(a.selectedPosition) -
                    order.indexOf(b.selectedPosition)
                )
                .map((player: any) => (
                  <PlayerIconTeamTwo
                    player={player}
                    version={credentials.leagueClientData?.version as string}
                    championsList={credentials.leagueClientData?.champions}
                    selections={gameData.playerChampionSelections}
                  />
                ))}
            </motion.ul>
          </section>
        </>
      )}

      <div className="absolute w-full h-full flex items-center justify-center">
        <motion.div className="p-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ rotate: 20, scale: 0 }}
            animate={{
              rotate: 0,
              scale: 1,
              transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                delay: 1.2,
              },
            }}
            onClick={handleOpenDiscord}
            className="w-28 h-28 bg-primary-500 rounded-full flex justify-center items-center relative cursor-pointer"
          >
            <motion.h1
              className="font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200,
                  delay: 1.7,
                },
              }}
            >
              Abrir Discord
            </motion.h1>

            <FaDiscord className="absolute text-gray-50 text-7xl opacity-10" />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

const PlayerIconTeamOne = ({
  player,
  version,
  championsList,
  selections,
}: {
  player: any;
  version: string;
  championsList: any;
  selections: any;
}) => {
  const getSkinByChampionId = (championId: number) => {
    return (
      selections.filter(
        (selection: any) => selection.championId === championId
      )?.[0]?.selectedSkinIndex || 0
    );
  };

  function getChampionName(championId: number) {
    if (championsList?.data === undefined) return "";

    return (
      Object.keys(championsList.data).find(
        (key) => championsList.data[key].key === championId.toString()
      ) || ""
    );
  }

  return (
    <motion.li
      variants={variantItemLeft}
      className="relative flex h-12 flex-row items-center justify-start mt-2"
    >
      <img
        className="rounded-full border-2 border-blue-500"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player?.profileIconId}.png`}
        width={40}
      />

      <div className="relative ml-2 p-4 bg-gradient-to-r from-gray-800 from-10% via-gray-800 via-50% to-gray-900 w-[160px] max-w-[160px] rounded-md border-r-2 border-blue-500">
        <div className="absolute w-full h-full left-0 top-0 z-10 bg-gradient-to-r from-gray-800 from-10% via-gray-800/20 via-50% to-gray-900/5"></div>

        <motion.h2
          initial={{ opacity: 0.2, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 1.5 } }}
          className="relative font-bold z-30 whitespace-nowrap"
        >
          {getChampionName(player?.championId)}
        </motion.h2>

        <div className="absolute w-full h-full left-0 top-0 overflow-hidden">
          <img
            className="rounded-md opacity-20 w-full contain absolute -top-20 left-0 z-0"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampionName(
              player?.championId
            )}_${getSkinByChampionId(player?.championId)}.jpg`}
          />
        </div>
      </div>
    </motion.li>
  );
};

const PlayerIconTeamTwo = ({
  player,
  version,
  championsList,
  selections,
}: {
  player: any;
  version: string;
  championsList: any;
  selections: any;
}) => {
  const getSkinByChampionId = (championId: number) => {
    return (
      selections.filter(
        (selection: any) => selection.championId === championId
      )?.[0]?.selectedSkinIndex || 0
    );
  };

  function getChampionName(championId: number) {
    if (championsList?.data === undefined) return "";

    return (
      Object.keys(championsList.data).find(
        (key) => championsList.data[key].key === championId.toString()
      ) || ""
    );
  }

  return (
    <motion.li
      variants={variantItemRight}
      className="flex h-12 flex-row items-center justify-start mt-2"
    >
      <div className="relative mr-2 p-4 bg-gradient-to-l from-gray-800 from-10% via-gray-800 via-50% to-gray-900 w-[160px] max-w-[160px] rounded-md border-l-2 border-red-500">
        <div className="absolute w-full h-full left-0 top-0 z-10 bg-gradient-to-l from-gray-800/90 from-5% via-gray-800/10 via-50% to-gray-900/5"></div>

        <motion.h2
          initial={{ opacity: 0.2, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 1.5 } }}
          className="relative font-bold z-30 whitespace-nowrap"
        >
          {getChampionName(player?.championId)}
        </motion.h2>

        <div className="absolute w-full h-full left-0 top-0 overflow-hidden">
          <img
            className="rounded-md opacity-20 w-full  absolute -top-20 left-0 z-0"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampionName(
              player?.championId
            )}_${getSkinByChampionId(player?.championId)}.jpg`}
          />
        </div>
      </div>

      <img
        className="rounded-full border-2 border-red-500 "
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player?.profileIconId}.png`}
        width={40}
      />
    </motion.li>
  );
};

export default InProgress;
