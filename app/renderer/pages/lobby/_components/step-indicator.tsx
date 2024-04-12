import { ReactNode, useState, useEffect } from "react";

import { cn } from "@/_shared/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 20, scale: .8, },
  animate: { opacity: 1, y: 0, scale: 1, },
  exit: { opacity: 0, y: 20, scale: .8, transition: { duration: 0.5 } },
};

const progressBar = cva(
  "h-1 flex w-full bg-primary-500 absolute bottom-0",
  {
    variants: {
      variant: {
        Lobby: "w-1/6",
        Matchmaking: "w-2/6",
        ReadyCheck: "w-3/6",
        ChampSelect: "w-4/6",
        InProgress: "w-5/6",
        WaitingForStats: "w-6/6",
        Error: "w-1/6",
        Unknown: "w-1/6",
      },
    },
    defaultVariants: {
      variant: "Lobby",
    },
  }
);

export enum Step {
  Lobby = "No Lobby",
  Matchmaking = "Buscando partida",
  ReadyCheck = "Partida pronta",
  ChampSelect = "Seleção de Campeões",
  InProgress = "Em partida",
  WaitingForStats = "Aguardando stats",
  Error = "Error",
  Unknown = "Unknown",
}

const StepIndicator = ({ matcher }: { matcher: keyof typeof Step }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(false);
    setTimeout(() => {
      setShowText(true);
    }, 200);
  }, [matcher]);

  function setShow({ step }: { step: keyof typeof Step }) {
    if (matcher === step) {
      return true;
    }
    return false;
  }

  return (
    <motion.ul layout className="w-full flex p-2 min-h-10 bg-gray-800 rounded-md overflow-hidden items-center justify-center relative">
      <AnimatePresence>
        {showText && (
          <motion.li className="font-bold text-primary-500" variants={variants} initial={"initial"} animate={"animate"} exit={"exit"}>{Step[matcher as keyof typeof Step]}</motion.li>
        )}
      </AnimatePresence>

      <motion.li layout className={cn(progressBar({ variant: matcher }))}></motion.li>
    </motion.ul>
  );
};

export default StepIndicator;
