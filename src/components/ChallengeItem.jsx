import { useContext, useState } from "react";
import { ChallengesContext } from "../store/challenges-context.jsx";
import { motion } from "framer-motion";
export default function ChallengeItem({
  challenge,
  onViewDetails,
  handleConfetti,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    handleConfetti();
      updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <motion.li layout="position" exit={{ opacity: 0, y: -10 }}>
      <article className="challenge-item">
        <header>
          <img src={challenge.image.src} alt={challenge.image.alt} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div
          className={`challenge-item-details ${isExpanded ? "expanded" : ""}`}
        >
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span
                className="challenge-item-details-icon"
                initial={{ rotate: 180 }}
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                &#9650;
              </motion.span>
            </button>
          </p>
          {isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="challenge-item-description">
                {challenge.description}
              </p>
            </motion.div>
          )}
        </div>
      </article>
    </motion.li>
  );
}
