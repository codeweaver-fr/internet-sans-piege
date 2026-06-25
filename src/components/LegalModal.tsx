import { motion } from "framer-motion";
import HolographicAssistant from "./layout/HolographicAssistant";
import { LEGAL_CONTENT, type LegalSection } from "../data/legal";
import "../styles/LegalModal.css";

interface Props {
  section: LegalSection;
  onClose: () => void;
}

export default function LegalModal({ section, onClose }: Props) {
  const data = LEGAL_CONTENT[section];

  return (
    <motion.div
      className="legal-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="legal-modal legal-modal-with-assistant"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal-modal-scan" />

        <button className="legal-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="legal-modal-grid">
          <div className="legal-modal-main">
            <div className="legal-modal-header">
              <div className="legal-modal-icon">▣</div>

              <div>
                <p className="legal-modal-kicker">Centre de conformité</p>
                <h2>{data.title}</h2>
              </div>
            </div>

            <div className="legal-modal-content">
              {data.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="legal-validation-box">
              <p>
                En fermant cette fenêtre, vous confirmez avoir pu consulter ces
                informations.
              </p>
            </div>

            <div className="legal-modal-footer">
              <span>ISP_LEGAL_PROTOCOL</span>

              <button type="button" onClick={onClose}>
                ✓ J’ai lu et compris
              </button>
            </div>
          </div>

          <aside className="legal-modal-assistant">
            <HolographicAssistant />

            <p>
              Assistant conformité actif. Les informations affichées concernent
              la transparence, le contact et la collecte minimale des données.
            </p>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
