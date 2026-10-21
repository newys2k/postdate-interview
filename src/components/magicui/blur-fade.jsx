import { motion, useReducedMotion } from "framer-motion";

// Magic UI "Blur Fade": used only for the intro and reveal entrances.
export function BlurFade({ children, delay = 0, duration = 0.5, y = 10, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
