import { motion } from "framer-motion";
import assistantHolo from "../../assets/assistant-holo.png";
import "../../styles/HolographicAssistant.css";

interface HolographicAssistantProps {
  compact?: boolean;
}

export default function HolographicAssistant({
  compact = false,
}: HolographicAssistantProps) {
  const cls = compact ? "holo-assistant compact" : "holo-assistant";

  return (
    <motion.div
      className={cls}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Halo ambiant */}
      <motion.div
        className="holo-assistant-halo"
        animate={{
          scale:   [1, 1.12, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan line */}
      <motion.div
        className="holo-assistant-scan"
        animate={{
          top:     ["5%", "95%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.4,
        }}
      />

      {/* Image — flottement géré par CSS holoFloat */}
      <img
        src={assistantHolo}
        alt="Assistant numérique"
        className="holo-assistant-image"
        draggable={false}
      />

      {/* Particules orbitales */}
      <div className="holo-assistant-particles">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="holo-particle" />
        ))}
      </div>

      {/* Anneau rotatif */}
      <div className="holo-assistant-ring" />

      {/* Sol / projection */}
      <motion.div
        className="holo-assistant-floor"
        animate={{
          scaleX:  [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}