import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function Badge({ caption }) {
  const [scope, animate] = useAnimate();
  useEffect(()=>{
    animate(scope.current, {y:[-10, 5, -2.5, 1.25, 0] }, { duration: 0.4 });
  },[caption]);
  return (
    <motion.span ref={scope}  className="badge">
      {caption}
    </motion.span>
  );
}
