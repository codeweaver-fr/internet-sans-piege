import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LegalModal from "./LegalModal";
import type { LegalSection } from "../data/legal";
import "../styles/Footer.css";

export default function Footer() {
  const [activeSection, setActiveSection] = useState<LegalSection | null>(null);

  return (
    <>
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Internet Sans Piège — Diagnostic de
          sensibilisation aux risques numériques.
        </p>

        <nav>
          <button type="button" onClick={() => setActiveSection("mentions")}>
            Mentions légales
          </button>

          <button type="button" onClick={() => setActiveSection("privacy")}>
            Données personnelles
          </button>

          <button type="button" onClick={() => setActiveSection("contact")}>
            Contact
          </button>
        </nav>
      </footer>

      <AnimatePresence>
        {activeSection && (
          <LegalModal
            section={activeSection}
            onClose={() => setActiveSection(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}