import type { TDiscordData, TLeagueClient } from "@/_shared/hooks/useCredentials";
import { FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";

const UserCard = ({
  leagueData,
  discordData,
}: {
  leagueData: TLeagueClient;
  discordData: TDiscordData;
}) => {
  return (
    <motion.div
      className="flex flex-col py-4 px-6 bg-gray-800 rounded-md items-center w-64 m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: .5 } }}
    >
      <img
        src={
          "https://ddragon.leagueoflegends.com/cdn/" +
          leagueData.version +
          "/img/profileicon/" +
          leagueData.summoner.profileIconId +
          ".png"
        }
        alt={leagueData.summoner.name}
        className="w-20 h-20 rounded-full mb-4 border-2 border-custom-primary-100"
      />
      <div className="flex flex-col ml-4 w-full">
        <h2 className="text-lg font-semibold">
          {leagueData.summoner.gameName}
        </h2>
        <p className="text-sm">#{leagueData.summoner.tagLine}</p>
        <div className="flex flex-row items-center">
          <FaDiscord className="w-4 h-4 mr-2" />
          <span className="text-sm">{discordData.username}</span>
        </div>
      </div>
    </motion.div>
  );
};

export { UserCard };
