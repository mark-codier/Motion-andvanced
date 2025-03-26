import { createPortal } from "react-dom";
import { motion } from "framer-motion";
export default function Modal({ title, children, onClose }) {
  return createPortal(
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="backdrop"
      onClick={onClose}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.5 }}
    >
      <motion.dialog
        variants={{
          hidden:{ opacity: 0, y: 50 },
          visible:{ opacity: 1, y: 0 }
        }}
        // initial='hidden'
        // animate='visible'
        // exit={{ opacity: 0, y: 50 
        transition={{ duration: 0.9 }}
        open
        className="modal"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>,
     </motion.div>,
    document.getElementById("modal")
  );
}
