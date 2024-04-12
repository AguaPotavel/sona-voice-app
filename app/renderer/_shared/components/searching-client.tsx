import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "./loader";

const SearchingClient = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-screen h-screen flex flex-col py-4 px-6 rounded-md fixed z-30 bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex flex-1 flex-col w-full h-80 items-center justify-center mb-6">
          <div className="flex w-full h-auto items-center justify-center mb-6">
            <Loader />
          </div>
          <div className="mt-6 animate-pulse">
            <h2 className="text-lg font-semibold">
              Buscando seu cliente do League of Legends
            </h2>
            <h3 className="text-xs">
              Se você não tiver o cliente aberto, por favor, abra-o.
            </h3>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { SearchingClient };
