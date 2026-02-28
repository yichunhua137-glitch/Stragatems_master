import React from 'react';
import { DIR_ICON } from '../constants/directions';

// Free-form random arrow sequence trainer.
function RandomPage({ randomErrorFlash, randomSequence, randomInput, randomStatus, randomElapsed }) {
  return (
    <section className="section page-shell">
      <div className="section-title">
        <span>05</span>
        <h2>Random Code Training</h2>
        <p>Because memorizing chaos is still safer than the battlefield.</p>
      </div>
      <div className="random-shell">
        <div
          className={`active-code center random-code ${
            randomErrorFlash ? 'error-flash' : ''
          }`}
        >
          {randomSequence.map((dir, idx) => (
            <span
              key={`random-${idx}`}
              className={randomInput[idx] ? 'code-chip entered' : 'code-chip'}
            >
              <span
                className={`code-icon dir-${dir}`}
                style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
        <div className="active-status center">{randomStatus}</div>
        <div className="random-metrics">
          <span>Time</span>
          <strong>{(randomElapsed / 1000).toFixed(2)}s</strong>
        </div>
      </div>
    </section>
  );
}

export default RandomPage;
