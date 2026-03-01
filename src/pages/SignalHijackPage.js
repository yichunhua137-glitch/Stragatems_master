import React, { useEffect, useState } from 'react';
import { DIR_ICON } from '../constants/directions';

const STABLE_MS = 5000;
const GLITCH_MS = 1400;
const NORMAL_CODE = ['up', 'down', 'right', 'left', 'up'];

function SignalHijackPage() {
  const [phase, setPhase] = useState('stable');
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setPhase('stable');
    const glitchTimer = setTimeout(() => setPhase('glitch'), STABLE_MS);
    const hijackTimer = setTimeout(
      () => setPhase('hijacked'),
      STABLE_MS + GLITCH_MS
    );
    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(hijackTimer);
    };
  }, [runId]);

  return (
    <section className="section signal-hijack-section page-shell">
      <div className="section-title">
        <span>10</span>
        <h2>Signal Hijack Event</h2>
        <p>Automaton tower interference can jam stratagem channels completely.</p>
      </div>

      <div className="signal-console">
        <div className="signal-meta">
          <span>Stratagem Uplink</span>
          <strong>
            {phase === 'stable'
              ? 'Operational'
              : phase === 'glitch'
              ? 'Distorted'
              : 'Compromised'}
          </strong>
        </div>

        <div className={`signal-feed ${phase}`}>
          {phase === 'stable' && (
            <div className="signal-screen training">
              <div className="active-card compact">
                <div className="active-name-bar">Reinforce</div>
                <div className="active-code center">
                  {NORMAL_CODE.map((dir, idx) => (
                    <span key={`normal-code-${idx}`} className="code-chip">
                      <span
                        className={`code-icon dir-${dir}`}
                        style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                        aria-hidden="true"
                      />
                    </span>
                  ))}
                </div>
                <div className="active-status center">Awaiting WASD input</div>
                <div className="challenge-progress">
                  <span>Completed: 0 / 6</span>
                  <span>Retries: 0</span>
                </div>
              </div>
              <p className="signal-note">
                Signal stable. Interference expected in 5 seconds.
              </p>
            </div>
          )}

          {phase === 'glitch' && (
            <div className="signal-screen glitch training">
              <div className="active-card compact">
                <div className="active-name-bar">Reinforce</div>
                <div className="active-code center">
                  {NORMAL_CODE.map((dir, idx) => (
                    <span key={`glitch-code-${idx}`} className="code-chip">
                      <span
                        className={`code-icon dir-${dir}`}
                        style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                        aria-hidden="true"
                      />
                    </span>
                  ))}
                </div>
                <div className="active-status center">Signal unstable...</div>
              </div>
            </div>
          )}

          {phase === 'hijacked' && (
            <div className="signal-screen hijacked">
              <h3>Signal Hijacked</h3>
              <p>Automaton propaganda feed has overridden this channel.</p>
              <div className="video-wrap">
                <iframe
                  title="Automaton hijack video"
                  src="https://player.bilibili.com/player.html?bvid=BV1KCcgzZEc6&page=1&autoplay=1&danmaku=0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <a
                className="signal-link"
                href="https://www.bilibili.com/video/BV1KCcgzZEc6/"
                target="_blank"
                rel="noreferrer"
              >
                Open on Bilibili
              </a>
            </div>
          )}
        </div>

        <div className="signal-actions">
          <button
            type="button"
            className="primary"
            onClick={() => setRunId((prev) => prev + 1)}
          >
            Restart Sequence
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignalHijackPage;
