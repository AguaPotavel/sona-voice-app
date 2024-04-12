import { motion, AnimatePresence } from "framer-motion";
import type {
  TDiscordData,
  TLeagueClient,
} from "@/_shared/hooks/useCredentials";
import {  useState } from "react";
import { FaDiscord } from "react-icons/fa";


const PlayerHeader = ({
  leagueData,
  discordData,
}: {
  leagueData: TLeagueClient;
  discordData: TDiscordData;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-md flex flex-row items-center justify-center w-fit p-4 relative">
      <img
        src={
          "https://ddragon.leagueoflegends.com/cdn/" +
          leagueData.version +
          "/img/profileicon/" +
          leagueData.summoner.profileIconId +
          ".png"
        }
        alt={leagueData.summoner.name}
        className="w-12 h-12 rounded-full border-2 border-custom-primary-100"
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col ml-4 w-full">
          <h2 className="text-sm font-semibold">
            {leagueData.summoner.gameName}
          </h2>
          <p className="text-xs">#{leagueData.summoner.tagLine}</p>
          <div className="flex flex-row items-center">
            <FaDiscord className="w-4 h-4 mr-2" />
            <span className="text-xs">{discordData.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlayerHeader };
