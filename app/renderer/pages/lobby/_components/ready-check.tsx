import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/_shared/components/button";
import useLeague from "@/_shared/hooks/useLeague";

const ReadyCheck = () => {
    const { acceptMatch, declineMatch } = useLeague();

    return(
        <AnimatePresence>
            <motion.div
                className="flex flex-row gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Button onClick={acceptMatch} className="my-2 rounded-lg">
                    <h1 className="text-sm font-semibold text-center">Aceitar</h1>
                </Button>

                <Button onClick={declineMatch} className="my-2 rounded-lg" variant="secondary">
                    <h1 className="text-sm font-semibold text-center">Recusar</h1>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}


export default ReadyCheck;