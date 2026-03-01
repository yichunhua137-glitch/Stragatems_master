import React from 'react';
import StratagemSelector from '../components/StratagemSelector';
import { DIR_ICON } from '../constants/directions';

// Dedicated challenge variant where stratagem codes shift on a timer.
function ChallengeInterferencePage({
  selectedIds,
  allStratagems,
  stratagemSections,
  onToggleAll,
  onToggleSection,
  onToggleSelect,
  onHoverInfo,
  onHoverPos,
  onHoverClear,
  getStratagemLogo,
  challengeLevel,
  setChallengeLevel,
  challengeScore,
  challengeTimeLeft,
  challengeStreak,
  challengeBestStreak,
  challengeFailed,
  setChallengeScore,
  setChallengeRetries,
  startChallengeLevel,
  beginChallengeRun,
  challengeLevelComplete,
  challengeRetries,
  getChallengeTargetCount,
  challengeSet,
  challengeActiveIndex,
  challengeStarted,
  challengeErrorFlash,
  challengeInputSeq,
  challengeStatus,
  challengeCompleted,
  setChallengeLevelAndStartNext,
  challengeInterferenceMs,
  setChallengeInterferenceMs,
  challengeInterferenceLeftMs,
}) {
  return (
    <section className="section challenge-section">
      <div className="section-title">
        <span>09</span>
        <h2>Illuminate Interference</h2>
        <p>Codes shift on a timer. Mid-input shifts force a full restart.</p>
      </div>
      <div className="training-grid challenge-grid">
        <div className="training-left">
          <StratagemSelector
            title="Selectable Stratagems"
            selectedIds={selectedIds}
            allStratagems={allStratagems}
            stratagemSections={stratagemSections}
            onToggleAll={onToggleAll}
            onToggleSection={onToggleSection}
            onToggleSelect={onToggleSelect}
            onHoverInfo={onHoverInfo}
            onHoverPos={onHoverPos}
            onHoverClear={onHoverClear}
            getStratagemLogo={getStratagemLogo}
          />
        </div>

        <div className="challenge-panel">
          <div className="challenge-controls">
            <div className="challenge-row">
              <div>
                <label>Mode</label>
                <div className="toggle-row">
                  <button type="button" className="toggle-chip active">
                    Complete N
                  </button>
                </div>
              </div>
              <div>
                <label>Level</label>
                <div className="challenge-level">
                  <button
                    type="button"
                    className="toggle-chip"
                    onClick={() => setChallengeLevel((prev) => Math.max(1, prev - 1))}
                    disabled={challengeLevel <= 1}
                  >
                    -
                  </button>
                  <span>Level {challengeLevel}</span>
                  <button
                    type="button"
                    className="toggle-chip"
                    onClick={() => setChallengeLevel((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="challenge-row">
              <div>
                <label>Interference Cycle</label>
                <div className="count-control">
                  <input
                    type="range"
                    min="3000"
                    max="12000"
                    step="500"
                    value={challengeInterferenceMs}
                    onChange={(event) =>
                      setChallengeInterferenceMs(Number(event.target.value))
                    }
                  />
                  <span>{(challengeInterferenceMs / 1000).toFixed(1)}s</span>
                </div>
              </div>
              <div className="challenge-metrics">
                <div>
                  <span>Code Shift</span>
                  <strong>
                    {challengeStarted
                      ? `${Math.max(0, challengeInterferenceLeftMs / 1000).toFixed(
                          1
                        )}s`
                      : 'Ready'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="challenge-row">
              <div className="challenge-metrics">
                <div>
                  <span>Score</span>
                  <strong>{challengeScore}</strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>{(challengeTimeLeft / 1000).toFixed(1)}s</strong>
                </div>
                <div>
                  <span>Streak</span>
                  <strong>{challengeStreak}</strong>
                </div>
                <div>
                  <span>Best</span>
                  <strong>{challengeBestStreak}</strong>
                </div>
              </div>
            </div>

            <div className="challenge-row">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setChallengeScore((prev) =>
                    challengeFailed ? Math.max(0, prev - 200) : prev
                  );
                  setChallengeRetries((prev) => (challengeFailed ? prev + 1 : 0));
                  startChallengeLevel(challengeLevel, 'count');
                  beginChallengeRun(challengeLevel, 'count');
                }}
              >
                {challengeFailed ? 'Retry (-200)' : 'Start Level'}
              </button>
              {challengeLevelComplete && !challengeFailed && (
                <button
                  type="button"
                  className="primary ghost"
                  onClick={setChallengeLevelAndStartNext}
                >
                  Next Level
                </button>
              )}
              <span className="challenge-hint">
                Target: {getChallengeTargetCount(challengeLevel)} stratagems
              </span>
            </div>
          </div>

          <div className="challenge-stage">
            {(() => {
              const activeItem = challengeSet[challengeActiveIndex];
              if (!challengeStarted) {
                return (
                  <div className="active-empty">
                    Press Space, Enter, or Start Level to begin.
                  </div>
                );
              }
              if (!activeItem) {
                return (
                  <div className="active-empty">
                    Select stratagems and start the challenge.
                  </div>
                );
              }
              return (
                <div className="active-card compact">
                  <div className="active-name-bar">{activeItem.name}</div>
                  <div
                    className={`active-code center ${
                      challengeErrorFlash ? 'error-flash' : ''
                    }`}
                  >
                    {activeItem.code.map((dir, idx) => (
                      <span
                        key={`${activeItem.id}-interference-${idx}`}
                        className={
                          challengeInputSeq[idx] ? 'code-chip entered' : 'code-chip'
                        }
                      >
                        <span
                          className={`code-icon dir-${dir}`}
                          style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                          aria-hidden="true"
                        />
                      </span>
                    ))}
                  </div>
                  <div className="active-status center">{challengeStatus}</div>
                  <div className="challenge-progress">
                    <span>
                      Completed: {challengeCompleted} /{' '}
                      {getChallengeTargetCount(challengeLevel)}
                    </span>
                    <span>Retries: {challengeRetries}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChallengeInterferencePage;
