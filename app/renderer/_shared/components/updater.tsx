import { cn } from "@/_shared/utils/cn";
import { cva } from "class-variance-authority";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const loaderOutVariants = cva("rounded-full bg-gray-800 absolute", {
  variants: {
    size: {
      default: "w-16 h-16",
      sm: "w-10 h-10",
      lg: "w-24 h-24",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const loaderInnerVariants = cva("rounded-full bg-primary-500 absolute", {
  variants: {
    size: {
      default: "w-10 h-10",
      sm: "w-6 h-6",
      lg: "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Updater = ({
  size,
  className,
  progress,
}: {
  size?: "default" | "sm" | "lg" | undefined;
  className?: string;
  progress?: number;
}) => {
  const value = useMotionValue(0);

  useEffect(() => {
    if (progress !== undefined) {
      value.set(progress + 10);

      console.log(value.get() / 100)
      console.log(progress)
    }

    
  }, [progress]);

  return (
    <motion.div
      className={cn(
        "relative w-full h-full flex flex-1 flex-col p-2 m-2 items-center justify-center",
        className
      )}
    >
      <motion.h1 className="font-sans text-6xl font-bold">SONA</motion.h1>

      <motion.div
        layout
        className={cn(
          "rounded-full min-h-4 w-44 p-1 bg-gray-800 flex items-center mb-4 overflow-hidden",
            progress !== undefined ? "p-0 justify-start left-0" : ""
        )}
      >
        {progress === undefined && (
          <motion.div
            className="rounded-full bg-primary-500 h-2 w-2"
            animate={{
              x: [0, 160, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
              },
            }}
          ></motion.div>
        )}

        {progress !== undefined && (
          <motion.div
            className="bg-primary-500 h-full w-full"
            animate={{
              scaleX: value.get() / 100,
              transition: {
                duration: 1,
                type: "spring",
              },
            }}
          ></motion.div>
        )}
      </motion.div>

      <motion.h1
        className="font-sans text-sm font-bold"
        animate={{
          opacity: [1, 0.5, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
          },
        }}
      >
        {progress === undefined && "Buscando atualizações"}

        {progress !== undefined && `Atualizando: ${progress.toFixed(2)}%`}
      </motion.h1>
    </motion.div>
  );
};

export { Updater };
