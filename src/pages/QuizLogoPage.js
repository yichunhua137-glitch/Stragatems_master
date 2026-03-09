import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DIR_ICON } from '../constants/directions';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function QuizLogoPage({ allStratagems, getStratagemLogo }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [pickedId, setPickedId] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const accuracy = useMemo(() => {
    if (!attempts) return '0%';
    return `${Math.round((score / attempts) * 100)}%`;
  }, [score, attempts]);

  const nextQuestion = useCallback(() => {
    if (allStratagems.length < 4) return;
    const shuffled = shuffle(allStratagems);
    const target = shuffled[0];
    const opts = shuffle(shuffled.slice(0, 4));
    setQuestion(target);
    setOptions(opts);
    setPickedId(null);
  }, [allStratagems]);

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  if (!question) return null;

  return (
    <section className="section quiz-section">
      <div className="section-title">
        <span>13</span>
        <h2>Code Match Quiz</h2>
        <p>Read the code and choose the correct stratagem logo from 4 options.</p>
      </div>
      <div className="quiz-panel">
        <div className="quiz-header-stats">
          <span>Score {score}</span>
          <span>Attempts {attempts}</span>
          <span>Accuracy {accuracy}</span>
        </div>

        <div className="active-code center">
          {question.code.map((dir, idx) => (
            <span key={`${question.id}-quiz-logo-${idx}`} className="code-chip entered">
              <span
                className={`code-icon dir-${dir}`}
                style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>

        <div className="quiz-logo-grid">
          {options.map((item) => {
            const isPicked = pickedId === item.id;
            const isCorrect = item.id === question.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`quiz-logo-tile ${
                  pickedId
                    ? isCorrect
                      ? 'correct'
                      : isPicked
                      ? 'wrong'
                      : ''
                    : ''
                }`}
                onClick={() => {
                  if (pickedId) return;
                  setPickedId(item.id);
                  setAttempts((prev) => prev + 1);
                  if (isCorrect) setScore((prev) => prev + 1);
                }}
              >
                <img src={getStratagemLogo(item.icon)} alt={item.name} />
              </button>
            );
          })}
        </div>

        <div className="quiz-actions">
          <button type="button" className="primary" onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuizLogoPage;

