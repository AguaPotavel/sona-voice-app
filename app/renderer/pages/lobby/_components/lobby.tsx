import { Button } from "@/_shared/components/button";
import useLeague from "@/_shared/hooks/useLeague";
import { AnimatePresence, motion } from "framer-motion";

const StartMatchMaking = () => {
    const { startMatchMaking } = useLeague();
    
    const handleClick = () => {
        startMatchMaking();
    };

    return(
        <AnimatePresence>
            <motion.div
                className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Button onClick={handleClick} className="my-2 rounded-lg">
                    <h1 className="text-sm font-semibold text-center">Buscar partida</h1>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}


export default StartMatchMaking;