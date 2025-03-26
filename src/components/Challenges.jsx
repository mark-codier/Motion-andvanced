import { useContext, useState, useEffect } from "react";
import { ChallengesContext } from "../store/challenges-context.jsx";
import ChallengeItem from "./ChallengeItem.jsx";
import ChallengeTabs from "./ChallengeTabs.jsx";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState("active");
  const [selectedClass, setSelectedClass] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [confetState, setConfetState] = useState({
    timeout: 0,
    status: false,
    pieces: 200,
  });

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleSelectClass(newClass) {
    setSelectedClass(newClass);
  }

  function handleConfetti() {
    const interval = setInterval(() => {
      setConfetState((prevState) => {
        const newPieces = Math.max(0, prevState.pieces - 10); // Decrease pieces gradually
        return { ...prevState, pieces: newPieces };
      });
    }, 300); // Decrease every 300ms

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setConfetState((prevState) => ({
        timeout: null,
        status: false,
        pieces: 0,
      }));
    }, 6000); // Stop after 6 seconds

    setConfetState((prev) => {
      if (prev.status) {
        clearTimeout(prev.timeout);
        clearInterval(prev.timeout);
      }
      return { timeout, status: true, pieces: 200 };
    });
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }
      return id;
    });
  }

  const semiFilteredChallenges =
    selectedClass === "all"
      ? challenges
      : challenges.filter((challenge) => {
          return challenge.class === selectedClass;
        });

  const filteredChallenges = {
    active: semiFilteredChallenges.filter(
      (challenge) => challenge.status === "active"
    ),
    completed: semiFilteredChallenges.filter(
      (challenge) => challenge.status === "completed"
    ),
    failed: semiFilteredChallenges.filter(
      (challenge) => challenge.status === "failed"
    ),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      {confetState.status && <Confetti numberOfPieces={confetState.pieces} />}
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        onSelectClass={handleSelectClass}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 && (
            <motion.ol
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    handleConfetti={handleConfetti}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedChallenges.length === 0 && <p>No challenges found.</p>}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
