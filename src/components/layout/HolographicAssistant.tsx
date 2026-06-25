import { motion } from "framer-motion";
import assistantHolo from "../../assets/assistant-holo.png";

export default function HolographicAssistant() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -12, 0],
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
      style={{
        position: "relative",
        width: "320px",
        height: "420px",
        pointerEvents: "none",
      }}
    >
      {/* Halo */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.7, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, rgba(0,213,255,0.22), transparent 70%)",
          filter: "blur(28px)",
          zIndex: 0,
        }}
      />

      {/* Scan */}
      <motion.div
        animate={{
          top: ["5%", "95%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #00D5FF, transparent)",
          boxShadow: "0 0 20px #00D5FF",
          zIndex: 3,
        }}
      />

      {/* Image */}
      <img
        src={assistantHolo}
        alt="Assistant numérique"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          mixBlendMode: "screen",
          filter: `
            drop-shadow(0 0 15px rgba(0,213,255,.7))
            drop-shadow(0 0 40px rgba(0,213,255,.4))
            saturate(1.2)
          `,
        }}
      />

      {/* Cercle au sol */}
      <motion.div
        animate={{
          scaleX: [1, 1.15, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "180px",
          height: "22px",
          borderRadius: "50%",
          border: "1px solid rgba(0,213,255,0.25)",
          background: "rgba(0,213,255,0.08)",
          boxShadow: "0 0 25px rgba(0,213,255,0.2)",
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}