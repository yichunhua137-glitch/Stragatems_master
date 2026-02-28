import React from 'react';
import StratagemSelector from '../components/StratagemSelector';
import { DIR_ICON } from '../constants/directions';

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
}) {
  return (
    <section className="section training-section">
      <div className="section-title">
        <span>01</span>
        <h2>Stratagem Training</h2>
        <p>Drill the basics until your fingers file their own requisition forms.</p>
      </div>
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
            stratagemStats={stratagemStats}
            showBest
          />
        </div>

        <div className="training-panel">
          <div className="panel-controls" />

          <div className="training-stage">
            <div className="stage-left">
              {activeStratagem ? (
                <div className="active-card compact">
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
