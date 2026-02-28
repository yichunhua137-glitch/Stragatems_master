import React from 'react';
import StratagemSelector from '../components/StratagemSelector';
import { DIR_ICON } from '../constants/directions';

// Scored challenge mode with level/timer progression.
function ChallengePage({
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
  challengeMode,
  setChallengeMode,
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
  getChallengeDurationMs,
  challengeEndRef,
  setChallengeStarted,
  setChallengeTimeLeft,
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
}) {
  return (
    <section className="section challenge-section">
      <div className="section-title">
        <span>04</span>
        <h2>Stratagem Challenge</h2>
        <p>Compete for glory, points, and the right to blame your teammates.</p>
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
                  <button
                    type="button"
                    className={`toggle-chip ${
                      challengeMode === 'count' ? 'active' : ''
                    }`}
                    onClick={() => setChallengeMode('count')}
                  >
                    Complete N
                  </button>
                  <button
                    type="button"
                    className={`toggle-chip ${
                      challengeMode === 'timed' ? 'active' : ''
                    }`}
                    onClick={() => setChallengeMode('timed')}
                  >
                    Time Attack
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
                  startChallengeLevel();
                  const durationMs = getChallengeDurationMs(
                    challengeMode,
                    challengeLevel
                  );
                  challengeEndRef.current = Date.now() + durationMs;
                  setChallengeTimeLeft(durationMs);
                  setChallengeStarted(true);
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
                Target:{' '}
                {challengeMode === 'count'
                  ? `${getChallengeTargetCount(challengeLevel)} stratagems`
                  : 'score as many as possible'}
              </span>
            </div>
          </div>

          <div className="challenge-stage">
            {(() => {
              const activeItem =
                challengeMode === 'count'
                  ? challengeSet[challengeActiveIndex]
                  : challengeSet[0];
              if (!challengeStarted) {
                return (
                  <div className="active-empty">
                    Press Space or Enter to begin. Survival is optional.
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
                        key={`${activeItem.id}-challenge-${idx}`}
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
                      Completed: {challengeCompleted}
                      {challengeMode === 'count'
                        ? ` / ${getChallengeTargetCount(challengeLevel)}`
                        : ''}
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

export default ChallengePage;
