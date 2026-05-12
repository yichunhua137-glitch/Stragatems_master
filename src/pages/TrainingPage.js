import React, { useState } from 'react';
import StratagemSelector from '../components/StratagemSelector';
import { DIR_ICON } from '../constants/directions';

const TRAINING_NOTICE_STORAGE_KEY = 'stragatems.trainingNoticeSeen.v1';

// Core stratagem training page.
function TrainingPage({
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
  globalRecords,
  stratagemStats,
  activeStratagem,
  activeIndex,
  trainingSet,
  trainingDone,
  setActiveIndex,
  setInputSeq,
  setStatus,
  errorFlash,
  inputSeq,
  status,
  keysPerSec,
  trainCount,
  setTrainCount,
  endlessMode,
  setEndlessMode,
  mobileGameplay,
  controlsLocked,
  mobileStep,
  onEnterMobilePlay,
  onExitMobilePlay,
  onRestartTraining,
  onToggleFullscreen,
  isFullscreenMode,
  fullscreenButtonLabel,
  fullscreenAriaLabel,
  globalRecord,
  isAuthenticated,
  needsUsername,
  cloudSyncStatus,
}) {
  const [showTrainingNotice, setShowTrainingNotice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(TRAINING_NOTICE_STORAGE_KEY) !== 'true';
  });

  const dismissTrainingNotice = () => {
    setShowTrainingNotice(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TRAINING_NOTICE_STORAGE_KEY, 'true');
    }
  };

  if (mobileGameplay && mobileStep === 'setup') {
    return (
      <section className="section training-section training-mobile-select">
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
              globalRecords={globalRecords}
              stratagemStats={stratagemStats}
              showBest
            />
            <div className="training-inline-controls">
              <div className="training-inline-control">
                <label htmlFor="training-count-inline">Training count</label>
                <div className="count-control">
                  <input
                    id="training-count-inline"
                    type="range"
                    min="1"
                    max="20"
                    value={trainCount}
                    onChange={(event) => setTrainCount(Number(event.target.value))}
                  />
                  <span>{trainCount} items</span>
                </div>
              </div>
              <div className="training-inline-control">
                <label>Endless mode</label>
                <div className="toggle-row">
                  <button
                    type="button"
                    className={`toggle-chip ${endlessMode ? 'active' : ''}`}
                    onClick={() => setEndlessMode((prev) => !prev)}
                  >
                    {endlessMode ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </div>
            <div className="training-mobile-actions">
              <button
                type="button"
                className="primary"
                onClick={onEnterMobilePlay}
                disabled={controlsLocked}
              >
                Confirm and Enter Training
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`section training-section ${
        mobileGameplay ? 'training-mobile-play' : ''
      }`}
    >
      {!mobileGameplay && showTrainingNotice && (
        <div className="training-notice-overlay">
          <div className="training-notice-card">
            <strong>Training Notice</strong>
            <span>
              Key bindings can be customized from the Settings panel in the bottom-right
              corner. Login is now available from the top bar if you want to sync your
              records.
            </span>
            <div className="mode-picker-actions">
              <button
                type="button"
                className="primary"
                onClick={dismissTrainingNotice}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
      {!mobileGameplay && (
        <div className="section-title">
          <h2>Stratagem Training</h2>
          <p>Drill the basics until your fingers file their own requisition forms.</p>
        </div>
      )}
      <div className="training-grid">
        {!mobileGameplay && (
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
              globalRecords={globalRecords}
              stratagemStats={stratagemStats}
              showBest
            />
          </div>
        )}

        <div className="training-panel training-panel-plain">
          {!mobileGameplay && (
            <div className="training-inline-controls training-inline-controls-stage">
              <div className="training-inline-control">
                <label htmlFor="training-count-stage">Training count</label>
                <div className="count-control">
                  <input
                    id="training-count-stage"
                    type="range"
                    min="1"
                    max="20"
                    value={trainCount}
                    onChange={(event) => setTrainCount(Number(event.target.value))}
                  />
                  <span>{trainCount} items</span>
                </div>
              </div>
              <div className="training-inline-control">
                <label>Endless mode</label>
                <div className="toggle-row">
                  <button
                    type="button"
                    className={`toggle-chip ${endlessMode ? 'active' : ''}`}
                    onClick={() => setEndlessMode((prev) => !prev)}
                  >
                    {endlessMode ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="training-stage">
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
                  onClick={onExitMobilePlay}
                  aria-label="Back to stratagem selection"
                >
                  &times;
                </button>
              </div>
            )}
            <div className="stage-left">
              {activeStratagem ? (
                <div className={`active-card compact ${mobileGameplay ? 'mobile-drill' : ''}`}>
                  <div className="active-strip-shell">
                    <div
                      className="active-strip"
                      style={{ '--active-index': activeIndex }}
                    >
                      {trainingSet.map((item, index) => (
                        <button
                          key={`strip-${item.id}-${index}`}
                          className={`strip-icon ${
                            index === activeIndex
                              ? trainingDone
                                ? 'done'
                                : 'active'
                              : index < activeIndex
                              ? 'done'
                              : ''
                          }`}
                          onClick={() => {
                            setActiveIndex(index);
                            setInputSeq([]);
                            setStatus('Awaiting WASD input');
                          }}
                          title={item.name}
                        >
                          <div className="strip-icon-art">
                            {item.icon ? (
                              <img
                                className="stratagem-logo"
                                src={getStratagemLogo(item.icon)}
                                alt={item.name}
                                loading="lazy"
                              />
                            ) : (
                              item.tag
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="active-name-bar">{activeStratagem.name}</div>
                  <div
                    className={`active-code center ${
                      errorFlash ? 'error-flash' : ''
                    }`}
                  >
                    {activeStratagem.code.map((dir, idx) => (
                      <span
                        key={`${activeStratagem.id}-active-${idx}`}
                        className={inputSeq[idx] ? 'code-chip entered' : 'code-chip'}
                      >
                        <span
                          className={`code-icon dir-${dir}`}
                          style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                          aria-hidden="true"
                        />
                      </span>
                    ))}
                  </div>
                  <div className="active-status center">{status}</div>
                  {trainingDone && (
                    <div className="active-metrics">
                      <span>Keys/sec</span>
                      <strong>{keysPerSec}</strong>
                    </div>
                  )}
                  <div className="active-times">
                    <span>
                      This run:
                      {stratagemStats[activeStratagem?.id]?.lastMs
                        ? (stratagemStats[activeStratagem.id].lastMs / 1000).toFixed(2)
                        : '--'}
                      s
                    </span>
                    <span>
                      Best:
                      {stratagemStats[activeStratagem?.id]?.bestMs
                        ? (stratagemStats[activeStratagem.id].bestMs / 1000).toFixed(2)
                        : '--'}
                      s
                    </span>
                  </div>
                  <div className="active-times active-times-remote">
                    <span>
                      World:
                      {globalRecord?.bestMs
                        ? (globalRecord.bestMs / 1000).toFixed(2)
                        : '--'}
                      s
                    </span>
                    <span>Held by: {globalRecord?.username || '--'}</span>
                  </div>
                  {!isAuthenticated && (
                    <div className="training-cloud-note">
                      Login is optional. Sign in if you want your best time to claim
                      the global record.
                    </div>
                  )}
                  {isAuthenticated && needsUsername && (
                    <div className="training-cloud-note">
                      Finish setting a username before cloud records can be claimed.
                    </div>
                  )}
                  {isAuthenticated && !needsUsername && cloudSyncStatus?.text && (
                    <div className={`training-cloud-note ${cloudSyncStatus.tone || ''}`}>
                      {cloudSyncStatus.text}
                    </div>
                  )}
                  {mobileGameplay && trainingDone && (
                    <div className="training-mobile-restart">
                      <button
                        type="button"
                        className="primary"
                        onClick={onRestartTraining}
                      >
                        Restart
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="active-empty">Select a stratagem and click "Start"</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrainingPage;

