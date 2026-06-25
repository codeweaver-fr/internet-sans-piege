import { motion } from "framer-motion";
import assistantHolo from "../../assets/assistant-holo.png";
import "../../styles/HolographicAssistant.css";

interface HolographicAssistantProps {
  compact?: boolean;
}

export default function HolographicAssistant({
  compact = false,
}: HolographicAssistantProps) {
  return (
    <motion.div
      className={compact ? "holo-assistant compact" : "holo-assistant"}
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.8 },
        x: { duration: 0.8 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        className="holo-assistant-halo"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.7, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="holo-assistant-scan"
        animate={{
          top: ["5%", "95%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <img
        src={assistantHolo}
        alt="Assistant numérique"
        className="holo-assistant-image"
        draggable={false}
      />

      <motion.div
        className="holo-assistant-floor"
        animate={{
          scaleX: [1, 1.15, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}