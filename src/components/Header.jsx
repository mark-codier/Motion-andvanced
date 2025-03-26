import { useState } from "react";

import NewChallenge from "./NewChallenge.jsx";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();
  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge key='modal' onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button drag whileDrag={{scale:1000, transition:{duration:20}}} whileHover={{scale: 1.2}} transition={{duration:0.3}} onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
