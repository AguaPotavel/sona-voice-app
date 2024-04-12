import { cn } from "@/_shared/utils/cn";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

const loaderOutVariants = cva("rounded-full bg-primary-600/40 absolute", {
  variants: {
    size: {
      default: "w-16 h-16",
      xs: "w-4 h-4",
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
      xs: "w-2 h-2",
      sm: "w-6 h-6",
      lg: "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Loader = ({ size, className }: { size?: "default" | "sm" | "lg" | "xs" | undefined, className?: string }) => {
  return (
    <motion.div className={cn("relative w-full flex flex-1 p-2 m-2 items-center justify-center", className)}>
      <motion.div
        className={cn(loaderOutVariants({ size }))}
        animate={{
          scale: [1.5, 1, 1.5],
          transition: { duration: 1.2, repeat: Infinity},
        }}
      ></motion.div>
      <motion.div
        className={cn(loaderInnerVariants({ size }))}
        animate={{
          scale: [1, 1.5, 1],
          transition: { duration: 1.2, repeat: Infinity },
        }}
      ></motion.div>
    </motion.div>
  );
};

export { Loader };
