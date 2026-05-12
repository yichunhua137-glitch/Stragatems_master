import React from 'react';

// Reusable stratagem selection list used by training/loadout/challenge pages.
function StratagemSelector({
  title,
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
  showBest = false,
}) {
  return (
    <aside className="stratagem-list">
      <div className="list-header">
        <h3>{title}</h3>
        <div className="list-header-right">
          <span>{selectedIds.length} selected</span>
          <button
            type="button"
            className={`select-toggle ${
              selectedIds.length === allStratagems.length ? 'active' : ''
            }`}
            onClick={onToggleAll}
          >
            {selectedIds.length === allStratagems.length ? 'Clear all' : 'Select all'}
          </button>
        </div>
      </div>
      <div className="list-scroll">
        {stratagemSections.map((section) => {
          const sectionIds = section.items.map((item) => item.id);
          const selectedCount = sectionIds.filter((id) =>
            selectedIds.includes(id)
          ).length;
          const allSelected =
            selectedCount > 0 && selectedCount === sectionIds.length;
          return (
            <div key={section.name} className="section-block">
              <button
                className={`section-block-title ${
                  allSelected ? 'active' : ''
                }`}
                onClick={() => onToggleSection(section)}
              >
                <span># {section.name}</span>
                <em>
                  {selectedCount}/{sectionIds.length}
                </em>
              </button>
              <div className="section-grid">
                {section.items.map((item) => {
                  const globalRecord = globalRecords?.[item.id];
                  return (
                    <button
                      key={item.id}
                      className={`icon-tile ${
                        selectedIds.includes(item.id) ? 'active' : ''
                      }`}
                      onClick={() => onToggleSelect(item.id)}
                      onMouseEnter={(event) => {
                        onHoverInfo({ item, section: section.name });
                        onHoverPos({ x: event.clientX, y: event.clientY });
                      }}
                      onMouseMove={(event) =>
                        onHoverPos({ x: event.clientX, y: event.clientY })
                      }
                      onMouseLeave={onHoverClear}
                      >
                        <div className="icon-tile-art">
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
                      {globalRecord?.bestMs && (
                        <div className="icon-tile-metrics">
                          <span className="icon-tile-metric icon-tile-metric-world">
                            <strong>WR</strong>
                            <em>{(globalRecord.bestMs / 1000).toFixed(2)}s</em>
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default StratagemSelector;
