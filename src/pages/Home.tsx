import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  onStart: () => void;
}

const STATS = [
  { num: "11", label: "Scénarios" },
  { num: "5 min", label: "Durée" },
  { num: "110", label: "Points max" },
];

const THREATS = [
  "Phishing",
  "Faux SMS",
  "Usurpation",
  "Faux support",
  "Faux concours",
  "Wi-Fi piégé",
];

export default function Home({ onStart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="home-hero home-hero-split"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home-grid-layout">
        <motion.div
          className="home-left"
          initial={{ opacity: 0, x: -26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            className="home-badge"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="home-badge-dot" />
            Système actif · Diagnostic numérique
          </motion.div>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            className="home-title-wrap"
          >
            <motion.h1
              className="home-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Internet
              <br />
              <span>Sans Piège</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="home-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Découvrez votre niveau de vigilance avant qu’un vrai piège ne se présente.
          </motion.p>

          <motion.p
            className="home-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.45 }}
          >
            Un diagnostic gratuit, rapide et immersif pour apprendre à repérer les
            signaux d’alerte les plus courants : faux SMS, faux conseiller bancaire,
            phishing, QR Code suspect, Wi-Fi piégé et usurpation d’identité.
          </motion.p>

          <motion.div
            className="home-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
          >
            <motion.button
              className="home-cta"
              onClick={onStart}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Lancer le diagnostic →
            </motion.button>

            <span className="home-action-note">Sans inscription · 5 minutes</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="home-right"
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          <div className="home-terminal-card">
            <div className="home-terminal-header">
              <span />
              <span />
              <span />
              <strong>VIGILANCE_CENTER</strong>
            </div>

            <div className="home-intro-card">
              <strong>Bienvenue dans votre centre de vigilance numérique.</strong>
              <p>
                Vous allez être confronté à des situations réalistes. Votre mission :
                identifier les pièges, repérer les indices suspects et adopter les bons réflexes.
              </p>
            </div>

            <div className="home-stats">
              {STATS.map(({ num, label }, i) => (
                <div className="home-stat" key={label}>
                  <strong>{num}</strong>
                  <span>{label}</span>
                  {i < STATS.length - 1 && <i aria-hidden="true" />}
                </div>
              ))}
            </div>

            <div className="home-threats">
              {THREATS.map((threat) => (
                <span key={threat}>⚠ {threat}</span>
              ))}
            </div>

            <p className="home-proof">
              11 scénarios réalistes inspirés de situations numériques du quotidien.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}