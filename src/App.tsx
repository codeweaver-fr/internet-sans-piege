import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CyberBackground from "./components/layout/CyberBackground";
import HolographicAssistant from "./components/layout/HolographicAssistant";
import Home from "./pages/Home";
import Diagnostic from "./pages/Diagnostic";
import Result from "./pages/Result";

type Screen = "home" | "boot" | "diagnostic" | "result";

const BOOT_LINES = [
  { icon: "✓", type: "ok", text: "Connexion sécurisée établie" },
  { icon: "✓", type: "ok", text: "Chargement des scénarios…" },
  { icon: "✓", type: "ok", text: "Analyse des menaces actives" },
  { icon: "⚠", type: "warn", text: "11 arnaques détectées ce mois" },
  { icon: "✓", type: "ok", text: "Module de vigilance chargé" },
  { icon: "✓", type: "ok", text: "Prêt. Démarrage du diagnostic." },
];

function Boot({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, index) =>
      window.setTimeout(() => {
        setVisible((previousVisible) => [...previousVisible, index]);
        setProgress(Math.round(((index + 1) / BOOT_LINES.length) * 100));

        if (index === BOOT_LINES.length - 1) {
          window.setTimeout(onDone, 800);
        }
      }, index * 520)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onDone]);

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        zIndex: 10,
        display: "grid",
        placeItems: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="boot-layout"
        style={{
          width: "min(100%, 1000px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 460px) 320px",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            background: "rgba(13,32,53,0.9)",
            border: "1px solid rgba(0,213,255,0.2)",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow:
              "0 0 60px rgba(0,213,255,0.08), 0 0 120px rgba(0,213,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(18px)",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid rgba(0,213,255,0.1)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />

            <span
              style={{
                marginLeft: "8px",
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "rgba(0,213,255,0.5)",
                letterSpacing: "1px",
              }}
            >
              ISP_DIAGNOSTIC_SYSTEM v2.4
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {BOOT_LINES.map((line, index) => (
              <motion.div
                key={line.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  lineHeight: 1.8,
                  color: line.type === "ok" ? "#00FF88" : "#FFB800",
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={
                  visible.includes(index)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -12 }
                }
                transition={{ duration: 0.25 }}
              >
                <span style={{ minWidth: 16 }}>{line.icon}</span>

                <span style={{ color: "rgba(232,244,255,0.7)" }}>
                  {line.text}
                </span>

                {index === visible[visible.length - 1] &&
                  index < BOOT_LINES.length - 1 && (
                    <motion.span
                      style={{ color: "#00D5FF" }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      ▌
                    </motion.span>
                  )}
              </motion.div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              height: "2px",
              background: "rgba(0,213,255,0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#00D5FF",
                borderRadius: "2px",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div
            style={{
              marginTop: "8px",
              textAlign: "right",
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "rgba(0,213,255,0.4)",
            }}
          >
            {progress}%
          </div>
        </motion.div>

        <HolographicAssistant />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [finalScore, setFinalScore] = useState(0);

  const handleBootDone = useCallback(() => {
    setScreen("diagnostic");
  }, []);

  function handleQuizDone(score: number) {
    setFinalScore(score);
    setScreen("result");
  }

  function handleRestart() {
    setFinalScore(0);
    setScreen("home");
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#081220",
        color: "#e8f4ff",
        overflow: "hidden",
      }}
    >
      <CyberBackground />

      <AnimatePresence mode="wait">
        {screen === "home" && (
          <Home key="home" onStart={() => setScreen("boot")} />
        )}

        {screen === "boot" && <Boot key="boot" onDone={handleBootDone} />}

        {screen === "diagnostic" && (
          <Diagnostic key="diagnostic" onDone={handleQuizDone} />
        )}

        {screen === "result" && (
          <Result
            key="result"
            score={finalScore}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}