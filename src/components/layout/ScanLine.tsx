import { motion } from "framer-motion";

export default function ScanLine() {
  return (
    <>
      <motion.div
        className="isp-scanline"
        animate={{
          y: ["-10vh", "110vh"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="isp-scan-glow"
        animate={{
          y: ["-10vh", "110vh"],
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}