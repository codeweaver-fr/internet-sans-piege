import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HolographicAssistant from "../components/layout/HolographicAssistant";
import "../styles/Result.css";

interface Props {
  score: number;
  onRestart: () => void;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const MAX_SCORE = 110;
const WORKSHOP_THRESHOLD = 75;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgojazlv";

function normalizeScore(value: number) {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > MAX_SCORE) return MAX_SCORE;
  return value;
}

function getResult(score: number) {
  if (score >= 95) {
    return {
      level: "Expert en vigilance",
      status: "Protection élevée",
      color: "#00FF88",
      glow: "rgba(0,255,136,0.4)",
      description:
        "Excellent résultat. Vous appliquez les bons réflexes face aux pièges numériques les plus courants.",
      advice: [
        "Continuez à vérifier les liens avant de cliquer.",
        "Gardez le réflexe de passer par les sites officiels.",
        "Vous pouvez aider votre entourage à adopter ces réflexes.",
      ],
      skills: [
        { label: "Phishing email", pct: 95 },
        { label: "Faux SMS", pct: 90 },
        { label: "Appels frauduleux", pct: 88 },
        { label: "Faux concours", pct: 92 },
      ],
    };
  }

  if (score >= 75) {
    return {
      level: "Vigilant",
      status: "Bon niveau",
      color: "#00D5FF",
      glow: "rgba(0,213,255,0.4)",
      description:
        "Vous repérez la majorité des situations à risque. Quelques réflexes peuvent encore être renforcés.",
      advice: [
        "Ne vous fiez jamais uniquement au logo ou au design.",
        "Vérifiez toujours l’adresse du site ou l’expéditeur.",
        "En cas de doute, contactez l’organisme par un autre moyen.",
      ],
      skills: [
        { label: "Phishing email", pct: 78 },
        { label: "Faux SMS", pct: 82 },
        { label: "Appels frauduleux", pct: 70 },
        { label: "Faux concours", pct: 75 },
      ],
    };
  }

  if (score >= 45) {
    return {
      level: "Prudent, mais exposé",
      status: "Vigilance moyenne",
      color: "#FFB800",
      glow: "rgba(255,184,0,0.4)",
      description:
        "Vous avez certains bons réflexes, mais plusieurs pièges peuvent encore vous tromper.",
      advice: [
        "Méfiez-vous des messages urgents ou alarmants.",
        "Ne donnez jamais de code reçu par SMS.",
        "Prenez le temps de vérifier avant toute action.",
      ],
      skills: [
        { label: "Phishing email", pct: 55 },
        { label: "Faux SMS", pct: 48 },
        { label: "Appels frauduleux", pct: 42 },
        { label: "Faux concours", pct: 60 },
      ],
    };
  }

  return {
    level: "À risque",
    status: "Vigilance fragile",
    color: "#FF4A4A",
    glow: "rgba(255,74,74,0.4)",
    description:
      "Plusieurs situations dangereuses n’ont pas été identifiées. Un accompagnement serait utile.",
    advice: [
      "Ne cliquez jamais sous pression.",
      "Ne transmettez pas d’informations sensibles par message.",
      "Demandez de l’aide avant d’agir en cas de doute.",
    ],
    skills: [
      { label: "Phishing email", pct: 30 },
      { label: "Faux SMS", pct: 25 },
      { label: "Appels frauduleux", pct: 20 },
      { label: "Faux concours", pct: 35 },
    ],
  };
}

function CircularGauge({
  score,
  max,
  color,
  glow,
}: {
  score: number;
  max: number;
  color: string;
  glow: string;
}) {
  const [displayed, setDisplayed] = useState(0);

  const safeScore = normalizeScore(score);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - circumference * (safeScore / max);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1600;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      setDisplayed(Math.round(safeScore * ease));

      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [safeScore]);

  return (
    <div className="result-gauge">
      <div
        className="result-gauge-glow"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        }}
      />

      <svg className="result-gauge-svg" width="180" height="180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />

        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>

      <div className="result-gauge-content">
        <span style={{ color, textShadow: `0 0 20px ${glow}` }}>
          {displayed}
        </span>
        <small>/ {max}</small>
      </div>
    </div>
  );
}

function SkillBar({
  label,
  pct,
  color,
  delay,
}: {
  label: string;
  pct: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="skill">
      <div className="skill-header">
        <span>{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>

      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Result({ score, onRestart }: Props) {
  const safeScore = normalizeScore(score);
  const result = getResult(safeScore);
  const percentage = Math.round((safeScore / MAX_SCORE) * 100);
  const shouldOfferWorkshop = percentage < WORKSHOP_THRESHOLD;

  const [showForm, setShowForm] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  function handleDecline() {
    setShowForm(false);
    setDeclined(true);
    setShowThanks(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const prenom = String(fd.get("prenom") || "").trim();
    const email = String(fd.get("email") || "").trim();

    if (!prenom || !email) {
      setSubmitStatus("error");
      setSubmitMessage("Merci de remplir tous les champs.");
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: fd,
      });

      if (!response.ok) {
        throw new Error("Erreur Formspree");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Votre demande a bien été envoyée. Vous serez recontacté si un événement est organisé."
      );

      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setSubmitMessage(
        "L’envoi a échoué. Merci de vérifier votre connexion ou de réessayer plus tard."
      );
    }
  }

  const adviceContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.45,
      },
    },
  };

  const adviceItem = {
    hidden: {
      opacity: 0,
      x: 18,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <main className="result-page">
      <section
        className="result-card"
        style={
          {
            "--result-color": result.color,
            "--result-glow": result.glow,
          } as React.CSSProperties
        }
      >
        <div className="result-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="result-kicker">Diagnostic terminé</p>

            <h1 className="result-title">
              Votre niveau de
              <br />
              <span>vigilance numérique</span>
            </h1>

            <p className="result-intro">
              Votre score indique votre capacité à repérer les pièges numériques
              dans des situations réalistes du quotidien.
            </p>

            <div className="result-score-card">
              <CircularGauge
                score={safeScore}
                max={MAX_SCORE}
                color={result.color}
                glow={result.glow}
              />

              <div className="result-score-content">
                <p className="result-status">{result.status}</p>
                <h2>{result.level}</h2>
                <p>{result.description}</p>

                <div className="skill-list">
                  {result.skills.map((skill, index) => (
                    <SkillBar
                      key={skill.label}
                      {...skill}
                      color={result.color}
                      delay={0.6 + index * 0.15}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            className="result-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <div className="panel-top">
              <span />
              <span />
              <span />
              <p>VIGILANCE_REPORT</p>
            </div>

            <HolographicAssistant />

            <div className="panel-content">
              <div className="global-score">
                <span>Score global</span>
                <strong>{percentage}%</strong>
              </div>

              <div className="global-track">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                />
              </div>

              <h3>Conseils prioritaires</h3>

              <motion.div
                className="advice-list"
                variants={adviceContainer}
                initial="hidden"
                animate="visible"
              >
                {result.advice.map((advice) => (
                  <motion.div
                    className="advice-item"
                    key={advice}
                    variants={adviceItem}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <span>✓</span>
                    <p>{advice}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.aside>
        </div>

        <div className="result-bottom-flow">
          <AnimatePresence mode="wait">
            {shouldOfferWorkshop && !declined && !showForm && (
              <motion.div
                key="workshop"
                className="result-workshop-box"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="form-kicker">
                  Accompagnement recommandé à une prochaine conférence ou atelier
                </p>

                <h3>Vous souhaitez aller plus loin ?</h3>

                <p>
                  Votre résultat montre que certains réflexes peuvent être
                  renforcés. Vous pouvez laisser vos coordonnées pour être
                  informé des prochains événements Internet Sans Piège.
                </p>

                <div className="result-actions">
                  <motion.button
                    type="button"
                    className="primary-btn"
                    onClick={() => setShowForm(true)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Oui, je souhaite être informé
                  </motion.button>

                  <motion.button
                    type="button"
                    className="secondary-btn"
                    onClick={handleDecline}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Non merci
                  </motion.button>
                </div>
              </motion.div>
            )}

            {showForm && shouldOfferWorkshop && !declined && (
              <motion.div
                key="form"
                className="result-form-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus !== "success" ? (
                  <form onSubmit={handleSubmit} className="result-form">
                    <input
                      type="hidden"
                      name="source"
                      value="Internet Sans Piège"
                    />
                    <input
                      type="hidden"
                      name="score"
                      value={`${safeScore}/${MAX_SCORE}`}
                    />
                    <input
                      type="hidden"
                      name="pourcentage"
                      value={`${percentage}%`}
                    />
                    <input type="hidden" name="niveau" value={result.level} />
                    <input type="hidden" name="statut" value={result.status} />
                    <input
                      type="hidden"
                      name="consentement"
                      value="Oui, la personne accepte d'être recontactée au sujet des événements Internet Sans Piège."
                    />
                    <input
                      type="hidden"
                      name="date"
                      value={new Date().toLocaleString("fr-FR")}
                    />

                    <div>
                      <p className="form-kicker">Internet Sans Piège</p>

                      <h3>
                        Être informé des prochains événements conférences,
                        ateliers, etc.
                      </h3>

                      <p>
                        Laissez vos coordonnées pour être recontacté uniquement
                        au sujet des événements Internet Sans Piège.
                      </p>
                    </div>

                    <div className="form-grid">
                      <input
                        name="prenom"
                        type="text"
                        placeholder="Votre prénom"
                        required
                      />

                      <input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        required
                      />
                    </div>

                    <label className="form-consent">
                      <input type="checkbox" required />
                      <span>
                        Les informations recueillies via ce formulaire sont
                        utilisées uniquement pour vous recontacter au sujet des
                        événements Internet Sans Piège. Elles ne sont ni
                        revendues, ni utilisées à d’autres fins. Vous pouvez
                        demander l’accès, la rectification ou la suppression de
                        vos données à tout moment.
                      </span>
                    </label>

                    {submitMessage && (
                      <p className={`form-message ${submitStatus}`}>
                        {submitMessage}
                      </p>
                    )}

                    <div className="form-actions">
                      <motion.button
                        type="submit"
                        className="form-submit"
                        disabled={submitStatus === "loading"}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {submitStatus === "loading"
                          ? "Envoi en cours..."
                          : "Envoyer ma demande"}
                      </motion.button>

                      <button
                        type="button"
                        className="form-cancel"
                        onClick={handleDecline}
                      >
                        Finalement non
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h3>Demande envoyée</h3>
                    <p>{submitMessage}</p>

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={onRestart}
                    >
                      Refaire le diagnostic
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {showThanks && (
              <motion.div
                key="thanks"
                className="thanks-card"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="thanks-icon">✓</div>

                <p className="form-kicker">Internet Sans Piège</p>

                <h3>Merci pour votre participation</h3>

                <p>
                  Vous venez de réaliser le diagnostic Internet Sans Piège.
                </p>

                <p>
                  Même sans laisser vos coordonnées, vous avez déjà fait un
                  premier pas pour renforcer votre vigilance face aux principales
                  arnaques numériques.
                </p>

                <p>
                  N’hésitez pas à refaire le diagnostic dans quelques mois ou à
                  le partager autour de vous.
                </p>

                <motion.button
                  type="button"
                  className="secondary-btn"
                  onClick={onRestart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Refaire le diagnostic
                </motion.button>
              </motion.div>
            )}

            {!shouldOfferWorkshop && (
              <motion.div
                key="restart"
                className="result-actions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="button"
                  className="secondary-btn"
                  onClick={onRestart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Refaire le diagnostic
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}