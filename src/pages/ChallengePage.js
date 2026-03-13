import React, { useState } from 'react';
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
  challengeHighScore,
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
  mobileGameplay,
  controlsLocked,
  onExitMobilePlay,
  onToggleFullscreen,
  isFullscreenMode,
  fullscreenButtonLabel,
  fullscreenAriaLabel,
}) {
  const [mobileStep, setMobileStep] = useState('setup');

  const handleStartOrRetry = () => {
    setChallengeScore((prev) => (challengeFailed ? Math.max(0, prev - 200) : prev));
    setChallengeRetries((prev) => (challengeFailed ? prev + 1 : 0));
    startChallengeLevel();
    beginChallengeRun();
  };

  if (mobileGameplay && mobileStep === 'setup') {
    return (
      <section className="section challenge-section training-mobile-select">
        <div className="training-grid">
          <div className="training-left">
            <StratagemSelector
              title="Stratagem Arsenal"
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
            <div className="training-mobile-actions">
              <button
                type="button"
                className="primary"
                onClick={() => setMobileStep('play')}
                disabled={controlsLocked}
              >
                Confirm and Enter Challenge
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section challenge-section ${mobileGameplay ? 'training-mobile-play' : ''}`}>
      {!mobileGameplay && <div className="section-title">
        <div className="challenge-header-row">
          <div className="challenge-heading-main">
            <span>04</span>
            <h2>Stratagem Challenge</h2>
          </div>
          <div className="challenge-records">
            <div className="challenge-record-row">
              <span>Best Record</span>
              <strong>Score {challengeHighScore}</strong>
              <strong>Streak {challengeBestStreak}</strong>
            </div>
            <div className="challenge-record-row">
              <span>This Run</span>
              <strong>Score {challengeScore}</strong>
              <strong>Time {(challengeTimeLeft / 1000).toFixed(1)}s</strong>
              <strong>Streak {challengeStreak}</strong>
            </div>
          </div>
        </div>
        <p>Compete for glory, points, and the right to blame your teammates.</p>
      </div>}
      <div className="training-grid challenge-grid">
        {!mobileGameplay && <div className="training-left">
          <StratagemSelector
            title="Stratagem Arsenal"
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
        </div>}

        <div className="challenge-panel">
          <div className="challenge-controls">
            <div className="challenge-control-grid">
              <div className="challenge-control-card">
                <label>Mode</label>
                <div className="toggle-row">
                  <button
                    type="button"
                    className={`toggle-chip ${challengeMode === 'count' ? 'active' : ''}`}
                    onClick={() => setChallengeMode('count')}
                  >
                    Complete N
                  </button>
                  <button
                    type="button"
                    className={`toggle-chip ${challengeMode === 'timed' ? 'active' : ''}`}
                    onClick={() => setChallengeMode('timed')}
                  >
                    Time Attack
                  </button>
                </div>
              </div>

              <div className="challenge-control-card">
                <label>Level</label>
                <div className="challenge-level-input">
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
                      onClick={() => setChallengeLevel((prev) => Math.min(99, prev + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {challengeLevelComplete && !challengeFailed && (
                <div className="challenge-control-card challenge-control-card-wide challenge-actions">
                  <button
                    type="button"
                    className="primary ghost"
                    onClick={setChallengeLevelAndStartNext}
                  >
                    Next Level
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="challenge-stage">
            {mobileGameplay && (
              <div className="mobile-top-controls">
                <button
                  type="button"
                  className="training-fullscreen-btn"
                  onClick={onToggleFullscreen}
                  aria-label={fullscreenAriaLabel}
                >
                  {fullscreenButtonLabel}
                </button>
                <button
                  type="button"
                  className="training-back-btn"
                  onClick={() => {
                    setMobileStep('setup');
                    if (onExitMobilePlay) onExitMobilePlay();
                  }}
                  aria-label="Back to stratagem selection"
                >
                  &times;
                </button>
              </div>
            )}
            {(() => {
              const activeItem =
                challengeMode === 'count'
                  ? challengeSet[challengeActiveIndex]
                  : challengeSet[0];
              if (!challengeStarted) {
                return (
                  <div className="active-empty challenge-empty">
                    <span>Press Space or Enter to begin. Survival is optional.</span>
                    <button type="button" className="primary stage-start-btn" onClick={handleStartOrRetry}>
                      Start Level
                    </button>
                    <span className="challenge-hint stage-target-hint">
                      Target:{' '}
                      {challengeMode === 'count'
                        ? `${getChallengeTargetCount(challengeLevel)} stratagems`
                        : 'score as many as possible'}
                    </span>
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
                <div className={`active-card compact ${mobileGameplay ? 'mobile-drill' : ''}`}>
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
                  {challengeFailed && (
                    <div className="challenge-stage-actions">
                      <button
                        type="button"
                        className="primary"
                        onClick={handleStartOrRetry}
                      >
                        Retry (-200)
                      </button>
                    </div>
                  )}
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

