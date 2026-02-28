import React from 'react';
import StratagemSelector from '../components/StratagemSelector';

// Random stratagem loadout generator.
function LoadoutPage({
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
  loadoutCount,
  setLoadoutCount,
  refreshLoadoutSet,
  loadoutSet,
}) {
  return (
    <section className="section loadout-section">
      <div className="section-title">
        <span>03</span>
        <h2>Random Stratagem Loadout</h2>
        <p>Let fate pick your gear, then pretend it was tactical genius.</p>
      </div>
      <div className="training-grid loadout-grid">
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

        <div className="loadout-panel">
          <div className="loadout-controls">
            <div className="loadout-control">
              <label htmlFor="loadout-count">Loadout size</label>
              <div className="count-control">
                <input
                  id="loadout-count"
                  type="range"
                  min="4"
                  max="10"
                  value={loadoutCount}
                  onChange={(event) => setLoadoutCount(Number(event.target.value))}
                />
                <span>{loadoutCount} items</span>
              </div>
            </div>
            <button
              type="button"
              className="primary"
              onClick={refreshLoadoutSet}
            >
              Generate Loadout
            </button>
            <span className="loadout-hint">Press Space or Enter to reroll your legal liability package.</span>
          </div>
          <div className="loadout-cards">
            {loadoutSet.length ? (
              loadoutSet.map((item, index) => (
                <article key={`${item.id}-${index}`} className="loadout-card">
                  <div className="loadout-card-icon">
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
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.section}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="page-placeholder">
                Select stratagems and generate a loadout. Command is not responsible for your choices.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadoutPage;
