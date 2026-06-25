import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS } from "../data/questions";
import "../styles/Diagnostic.css";

interface Props {
  onDone: (score: number) => void;
}

const ANSWER_LETTERS = ["A", "B", "C", "D"];

export default function Diagnostic({ onDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isChangingQuestion, setIsChangingQuestion] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  const progress = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  function handleAnswer(points: number) {
    if (isChangingQuestion) return;

    setIsChangingQuestion(true);

    const nextScore = score + points;
    const isLastQuestion = currentIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      onDone(nextScore);
      return;
    }

    setScore(nextScore);
    setCurrentIndex((prev) => prev + 1);

    window.setTimeout(() => {
      setIsChangingQuestion(false);
    }, 250);
  }

  return (
    <main className="diagnostic-page-v4">
      <section className="diagnostic-shell-v4">
        <div className="diagnostic-glow-v4" />

        <header className="diagnostic-topbar-v4">
          <div>
            <span className="diagnostic-eyebrow-v4">
              Centre de sécurité numérique
            </span>
            <h1>Analyse comportementale</h1>
          </div>

          <div className="diagnostic-live-v4">
            <span />
            Surveillance active
          </div>
        </header>

        <div className="diagnostic-progress-row-v4">
          <span>
            Scénario {currentIndex + 1} / {QUESTIONS.length}
          </span>
          <strong>{progress}%</strong>
        </div>

        <div className="diagnostic-progress-track-v4">
          <motion.div
            className="diagnostic-progress-fill-v4"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentQuestion.id}
            className="diagnostic-content-v4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
          >
            <div className="diagnostic-main-v4">
              <div className="diagnostic-visual-v4">
                <div className="diagnostic-visual-header-v4">
                  <span>Incident #{currentQuestion.id}</span>
                  <strong>{currentQuestion.context}</strong>
                </div>

                <div className="diagnostic-image-frame-v4">
                  <img
                    src={currentQuestion.image}
                    alt={currentQuestion.title}
                    draggable={false}
                  />

                  <i className="corner-v4 corner-v4--tl" />
                  <i className="corner-v4 corner-v4--tr" />
                  <i className="corner-v4 corner-v4--bl" />
                  <i className="corner-v4 corner-v4--br" />
                </div>
              </div>

              <div className="diagnostic-question-v4">
                <span className="diagnostic-tag-v4">Situation à analyser</span>

                <h2>{currentQuestion.title}</h2>

                <p>{currentQuestion.scenario}</p>

                <strong className="diagnostic-prompt-v4">
                  Quelle serait votre première action ?
                </strong>

                <div className="diagnostic-answers-v4">
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      key={`${currentQuestion.id}-${answer.label}`}
                      type="button"
                      className="diagnostic-answer-v4"
                      disabled={isChangingQuestion}
                      onClick={() => handleAnswer(answer.points)}
                    >
                      <span>{ANSWER_LETTERS[index] ?? index + 1}</span>
                      <strong>{answer.label}</strong>
                      <i>›</i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>
    </main>
  );
}