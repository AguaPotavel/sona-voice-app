import { Loader } from "@/_shared/components/loader";
import { AnimatePresence, motion } from "framer-motion";

const WaitingStep = () => {
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
            Aguardando novo passo
          </h1>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitingStep;
