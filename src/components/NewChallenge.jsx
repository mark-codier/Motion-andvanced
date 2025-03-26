import { useContext, useState } from "react";
import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";
import { motion, useAnimate } from "framer-motion";

export default function NewChallenge({ onDone }) {
  const [scope, animate] = useAnimate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Updated array with "class" included
    const arrOfInputs = ["title", "description", "deadline", "class", "image"];
    const [t, d, dl, c, img] = arrOfInputs;

    const challenge = {
      [t]: scope.current.querySelector(`#${t}`).value,
      [d]: scope.current.querySelector(`#${d}`).value,
      [dl]: scope.current.querySelector(`#${dl}`).value,
      [c]: scope.current.querySelector(`#${c}`).value, // Get class from scope
      [img]: selectedImage,
    };

    const isNotValidObj = {
      [t]: Boolean(!challenge.title.trim()),
      [d]: Boolean(!challenge.description.trim()),
      [dl]: Boolean(!challenge.deadline.trim()),
      [c]: Boolean(!challenge.class), // Ensure class is selected
      [img]: Boolean(!challenge.image),
    };

    const isNotValidArray = Object.values(isNotValidObj);
    if (isNotValidArray.includes(true)) {
      const selectorString = isNotValidArray
        .map((item, index) => {
          if (item) {
            if (index === 4) return `#new-challenge-images`; // For image selection
            return `#${arrOfInputs[index]}`;
          }
          return null;
        })
        .filter(Boolean)
        .join(", ");

      animate(
        selectorString,
        { x: [-10, 10, -10, 10, 0] },
        { duration: 0.5, delayChildren: 0.4 }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form ref={scope} id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input type="date" name="deadline" id="deadline" />
        </p>

        {/* Dropdown Selector for Challenge Class */}
        <p>
          <label htmlFor="class">Category</label>
          <select id="class">
            <option value="" disabled selected>Select a category</option>
            <option value="work">Work</option>
            <option value="private">Private</option>
            <option value="home">Home</option>
            <option value="fitness">Fitness</option>
            <option value="reading">Reading</option>
            <option value="studying">Studying</option>
            <option value="coding">Coding</option>
          </select>
        </p>

        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
              variants={{
                hidden: { opacity: 0, scale: 0.4 },
                visible: { opacity: 1, scale: [0.8, 1.5, 1] },
              }}
              transition={{ duration: 0.5 }}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>Cancel</button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
