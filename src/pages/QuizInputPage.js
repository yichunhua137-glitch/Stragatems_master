import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DIR_ICON } from '../constants/directions';

function QuizInputPage({ allStratagems, getStratagemLogo, keyToDir }) {
  const [activeItem, setActiveItem] = useState(null);
  const [inputSeq, setInputSeq] = useState([]);
  const [status, setStatus] = useState('Press Start to begin blind input quiz');
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const accuracy = useMemo(() => {
    if (!attempts) return '0%';
    return `${Math.round((score / attempts) * 100)}%`;
  }, [score, attempts]);

  const rollNext = useCallback(() => {
    if (!allStratagems.length) {
      setActiveItem(null);
      return;
    }
    const next = allStratagems[Math.floor(Math.random() * allStratagems.length)];
    setActiveItem(next);
    setInputSeq([]);
    setRevealed(false);
    setStatus('Input code using WASD');
  }, [allStratagems]);

  useEffect(() => {
    rollNext();
  }, [rollNext]);

  useEffect(() => {
    const onKey = (event) => {
      const tag = event.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (!activeItem || revealed) return;
      const pressed = event.key?.toLowerCase();
      const dir = keyToDir[pressed];
      if (!dir) return;
      event.preventDefault();
      const next = [...inputSeq, dir];
      const expected = activeItem.code;
      const matches = expected[next.length - 1] === dir;
      if (!matches) {
        setStatus('Incorrect, try again');
        setInputSeq([]);
        setAttempts((prev) => prev + 1);
        return;
      }
      setInputSeq(next);
      if (next.length === expected.length) {
        setRevealed(true);
        setStatus('Correct. Code revealed.');
        setScore((prev) => prev + 1);
        setAttempts((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeItem, inputSeq, keyToDir, revealed]);

  if (!activeItem) return null;

  return (
    <section className="section quiz-section">
      <div className="section-title">
        <span>12</span>
        <h2>Icon Blind Input</h2>
        <p>Blind mode: only slot count is shown. Enter full code to reveal answer.</p>
      </div>
      <div className="quiz-panel">
        <div className="quiz-header-stats">
          <span>Score {score}</span>
          <span>Attempts {attempts}</span>
          <span>Accuracy {accuracy}</span>
        </div>
        <div className="quiz-slot-info">
          <img
            className="quiz-slot-logo"
            src={getStratagemLogo(activeItem.icon)}
            alt="stratagem icon"
          />
        </div>
        <div className="active-status center">{status}</div>
        <div className={`quiz-slot-grid ${revealed ? 'revealed' : ''}`}>
          {activeItem.code.map((dir, idx) =>
            revealed ? (
              <span
                key={`${activeItem.id}-quiz-input-${idx}`}
                className={inputSeq[idx] ? 'code-chip entered' : 'code-chip'}
              >
                <span
                  className={`code-icon dir-${dir}`}
                  style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                  aria-hidden="true"
                />
              </span>
            ) : (
              <span
                key={`${activeItem.id}-quiz-input-slot-${idx}`}
                className={`quiz-slot-box ${inputSeq[idx] ? 'filled' : ''}`}
              />
            )
          )}
        </div>
        {revealed && (
          <div className="quiz-reveal-card">
            <img src={getStratagemLogo(activeItem.icon)} alt={activeItem.name} />
            <strong>{activeItem.name}</strong>
          </div>
        )}
        <div className="quiz-actions">
          <button type="button" className="primary" onClick={rollNext}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuizInputPage;
