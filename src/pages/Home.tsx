import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Props {
  onStart: () => void;
}

const STATS = [
  { num: "11", label: "Scénarios" },
  { num: "5 min", label: "Durée" },
  { num: "110", label: "Points max" },
];

const THREATS = [
  "Phishing", "Faux SMS", "Usurpation",
  "Faux support", "Faux concours", "Wi-Fi piégé",
];

const LOG_LINES = [
  "> Initialisation du centre de vigilance...",
  "> Chargement base de données menaces [OK]",
  "> 6 nouvelles arnaques détectées ce jour",
  "> Analyse comportementale activée...",
  "> Scénarios de phishing chargés [11/11]",
  "> Système de scoring prêt",
  "> Connexion sécurisée établie [TLS 1.3]",
  "> En attente du diagnostic utilisateur...",
]

function RadarDot({ x, y, isRed, delay, repeatDelay }: {
  x: number
  y: number
  isRed: boolean
  delay: number
  repeatDelay: number
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        top:  `${y}%`,
        width:  isRed ? 5 : 3,
        height: isRed ? 5 : 3,
        borderRadius: "50%",
        background: isRed ? "#FF4A4A" : "#00FF88",
        boxShadow:  isRed
          ? "0 0 8px rgba(255,74,74,0.9)"
          : "0 0 6px rgba(0,255,136,0.8)",
        transform: "translate(-50%,-50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.4, 1, 0] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay }}
    />
  )
}

export default function Home({ onStart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallaxe fluide
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const rotateX    = useTransform(springY, [-300, 300], [4, -4])
  const rotateY    = useTransform(springX, [-300, 300], [-4, 4])

  // Parallaxe couches
  const bgX        = useTransform(springX, [-300, 300], [-18, 18])
  const bgY        = useTransform(springY, [-300, 300], [-12, 12])
  const midX       = useTransform(springX, [-300, 300], [-8, 8])
  const midY       = useTransform(springY, [-300, 300], [-5, 5])

  // Vignette dynamique
  const vignetteOpacity = useTransform(
    springX,
    [-300, 0, 300],
    [0.7, 0.3, 0.7]
  )

  // Terminal logs
  const [visibleLogs, setVisibleLogs] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    LOG_LINES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, i])
        if (i === LOG_LINES.length - 1) setTimeout(() => setReady(true), 400)
      }, 300 + i * 380)
    })
  }, [])

  // Compteur menaces live
  const [threatCount, setThreatCount] = useState(6)
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.7)
        setThreatCount(n => n + Math.floor(Math.random() * 2 + 1))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Couche fond — parallaxe lente */}
      <motion.div style={{
        position: "fixed", inset: "-10%",
        x: bgX, y: bgY,
        background: `
          radial-gradient(ellipse at 25% 30%, rgba(0,213,255,0.09), transparent 45%),
          radial-gradient(ellipse at 75% 70%, rgba(100,60,255,0.07), transparent 45%)
        `,
        filter: "blur(40px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Vignette dynamique */}
      <motion.div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        opacity: vignetteOpacity,
      }} />

      {/* Layout */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        maxWidth: "1280px",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "2rem 2rem",
        alignItems: "center",
      }}>

        {/* ── GAUCHE ── */}
        <motion.div
          style={{ x: midX, y: midY }}
          initial={{ opacity: 0, x: -26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* Badge */}
          <motion.div
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "Space Mono, monospace",
              fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
              color: "#00D5FF",
              border: "1px solid rgba(0,213,255,0.28)",
              padding: "6px 16px", borderRadius: "4px",
              background: "rgba(0,213,255,0.06)",
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#00FF88",
              boxShadow: "0 0 10px rgba(0,255,136,0.9)",
              display: "inline-block",
            }}
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Système actif · Diagnostic numérique
          </motion.div>

          {/* Statut live */}
          <motion.div
            style={{
              display: "flex", gap: "1.2rem",
              marginBottom: "1.4rem",
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
          >
            <span style={{ color: "#FF4A4A" }}>
              ⬤ <span style={{ color: "rgba(232,244,255,0.5)" }}>Menaces actives : </span>
              <motion.span
                key={threatCount}
                style={{ color: "#FF4A4A", fontWeight: 700 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {threatCount}
              </motion.span>
            </span>
            <span style={{ color: "rgba(232,244,255,0.35)" }}>|</span>
            <span style={{ color: "rgba(232,244,255,0.45)" }}>
              Dernière détection : <span style={{ color: "#FFB800" }}>il y a 2 min</span>
            </span>
          </motion.div>

          {/* Titre 3D */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, marginBottom: "1.2rem" }}
          >
            <motion.h1
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 600, lineHeight: 1.05,
                letterSpacing: "-1px", color: "#fff",
                textShadow: "0 0 40px rgba(0,213,255,0.12), 0 4px 0 rgba(0,0,0,0.5)",
                margin: 0,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Internet<br />
              <motion.span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #ffffff 30%, #00D5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                // Aberration chromatique au hover
                whileHover={{
                  filter: [
                    "drop-shadow(2px 0 0 rgba(255,0,0,0.4)) drop-shadow(-2px 0 0 rgba(0,0,255,0.4))",
                    "drop-shadow(0 0 0 transparent)",
                  ],
                }}
              >
                Sans Piège
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.05rem", color: "#7aa8c7",
              lineHeight: 1.65, marginBottom: "0.8rem", maxWidth: "42ch",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          >
            Découvrez votre niveau de vigilance avant qu'un vrai piège ne se présente.
          </motion.p>

          <motion.p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.92rem", color: "rgba(122,168,199,0.65)",
              lineHeight: 1.7, marginBottom: "2rem", maxWidth: "44ch",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.45 }}
          >
            11 scénarios réalistes : faux SMS, phishing, faux conseiller bancaire,
            QR Code suspect, Wi-Fi piégé et usurpation d'identité.
          </motion.p>

          {/* Barre de préparation */}
          <motion.div
            style={{ marginBottom: "1.8rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontFamily: "Space Mono, monospace",
              fontSize: "9px", letterSpacing: "1.5px",
              textTransform: "uppercase", color: "rgba(0,213,255,0.5)",
              marginBottom: "6px",
            }}>
              <span>Système prêt</span>
              <motion.span
                style={{ color: "#00FF88" }}
                animate={{ opacity: ready ? 1 : [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: ready ? 0 : Infinity }}
              >
                {ready ? "100%" : "Chargement…"}
              </motion.span>
            </div>
            <div style={{
              height: "3px", borderRadius: "999px",
              background: "rgba(0,213,255,0.1)", overflow: "hidden",
            }}>
              <motion.div
                style={{
                  height: "100%", borderRadius: "999px",
                  background: "linear-gradient(90deg, #00D5FF, #00FF88)",
                  boxShadow: "0 0 12px rgba(0,213,255,0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: ready ? "100%" : "85%" }}
                transition={{ duration: 2.8, delay: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
          >
            <motion.button
              onClick={onStart}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "15px", fontWeight: 600,
                padding: "14px 36px", borderRadius: "8px",
                border: "none", cursor: "pointer",
                background: "#00D5FF", color: "#081220",
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(0,213,255,0)",
                  "0 0 28px rgba(0,213,255,0.55)",
                  "0 0 0px rgba(0,213,255,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 8px 32px rgba(0,213,255,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Lancer le diagnostic →
            </motion.button>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px", color: "rgba(122,168,199,0.5)",
              letterSpacing: "1px",
            }}>
              Sans inscription · 5 min
            </span>
          </motion.div>
        </motion.div>

        {/* ── DROITE ── */}
        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          {/* Terminal card avec sweep */}
          <motion.div
            style={{
              position: "relative", overflow: "hidden",
              borderRadius: "20px",
              border: "1px solid rgba(0,213,255,0.16)",
              background: `
                radial-gradient(circle at 50% 0%, rgba(0,213,255,0.08), transparent 50%),
                linear-gradient(180deg, rgba(17,37,64,0.97), rgba(5,14,27,0.99))
              `,
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.5),
                0 0 60px rgba(0,213,255,0.06),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
            }}
            whileHover={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 80px rgba(0,213,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)" }}
          >
            {/* Sweep lumineux */}
            <motion.div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(105deg, transparent 30%, rgba(0,213,255,0.07) 50%, transparent 70%)",
              zIndex: 1,
            }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            />

            {/* Header terminal */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "0.85rem 1.1rem",
              borderBottom: "1px solid rgba(0,213,255,0.1)",
              background: "rgba(0,0,0,0.2)",
              position: "relative", zIndex: 2,
            }}>
              {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
              <span style={{
                marginLeft: "8px", fontFamily: "Space Mono, monospace",
                fontSize: "10px", letterSpacing: "1.5px",
                color: "rgba(0,213,255,0.5)", textTransform: "uppercase",
              }}>
                VIGILANCE_CENTER
              </span>
            </div>

            {/* Zone logs */}
            <div style={{
              padding: "1rem 1.1rem",
              fontFamily: "Space Mono, monospace", fontSize: "11px",
              minHeight: "180px",
              borderBottom: "1px solid rgba(0,213,255,0.08)",
              position: "relative", zIndex: 2,
            }}>
              {LOG_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  style={{
                    color: i === LOG_LINES.length - 1 && visibleLogs.includes(i)
                      ? "#00FF88"
                      : "rgba(122,168,199,0.7)",
                    lineHeight: 1.9, display: "flex", alignItems: "center", gap: "6px",
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={visibleLogs.includes(i) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.25 }}
                >
                  {line}
                  {i === visibleLogs[visibleLogs.length - 1] && !ready && (
                    <motion.span
                      style={{ color: "#00D5FF" }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >▌</motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid rgba(0,213,255,0.08)",
              position: "relative", zIndex: 2,
            }}>
              {STATS.map(({ num, label }, i) => (
                <div key={label} style={{
                  flex: 1, padding: "1rem",
                  textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(0,213,255,0.08)" : "none",
                }}>
                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "1.4rem", fontWeight: 700,
                    color: "#00FF88",
                    textShadow: "0 0 16px rgba(0,255,136,0.4)",
                  }}>{num}</div>
                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "9px", color: "#7aa8c7",
                    textTransform: "uppercase", letterSpacing: "1.5px",
                    marginTop: "3px",
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Radar */}
            <div style={{ padding: "1rem 1.1rem", position: "relative", zIndex: 2 }}>
              <div style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px", letterSpacing: "2px",
                textTransform: "uppercase", color: "rgba(0,213,255,0.45)",
                marginBottom: "10px",
              }}>
                ◉ Radar menaces
              </div>
              <div style={{
                position: "relative", width: "100%", paddingBottom: "55%",
                overflow: "hidden",
              }}>
                {/* Cercles concentriques */}
                {[90, 65, 40].map((size, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: `${size}%`, paddingBottom: `${size * 0.55}%`,
                    border: "1px solid rgba(0,213,255,0.12)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }} />
                ))}
                {/* Croix centrale */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#00D5FF",
                  boxShadow: "0 0 10px rgba(0,213,255,0.8)",
                  transform: "translate(-50%,-50%)",
                }} />
                {/* Ligne tournante */}
                <motion.div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "40%", height: "1px",
                  background: "linear-gradient(90deg, rgba(0,213,255,0.8), transparent)",
                  transformOrigin: "0% 50%",
                  boxShadow: "0 0 8px rgba(0,213,255,0.5)",
                }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                {/* Points de menace */}
                {Array.from({ length: 6 }, (_, i) => {
                  const angle = (i / 6) * Math.PI * 2
                  const radius = 28 + (i % 2) * 10
                  return (
                    <RadarDot
                      key={i}
                      x={50 + Math.cos(angle) * radius}
                      y={50 + Math.sin(angle) * radius}
                      isRed={i % 3 === 0}
                      delay={i * 0.8}
                      repeatDelay={1.4}
                    />
                  )
                })}
              </div>
            </div>

            {/* Tags menaces */}
            <div style={{
              padding: "0 1.1rem 1rem",
              display: "flex", flexWrap: "wrap", gap: "6px",
              position: "relative", zIndex: 2,
            }}>
              {THREATS.map((t, i) => (
                <motion.span
                  key={t}
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "9px", letterSpacing: "0.5px",
                    padding: "4px 9px", borderRadius: "4px",
                    background: "rgba(255,184,0,0.07)",
                    border: "1px solid rgba(255,184,0,0.2)",
                    color: "rgba(255,184,0,0.65)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.07 }}
                >
                  ⚠ {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}