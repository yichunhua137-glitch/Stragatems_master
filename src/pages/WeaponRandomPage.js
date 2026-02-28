import React from 'react';

// Randomized weapon loadout generator by slot.
function WeaponRandomPage({
  randomWeaponCount,
  setRandomWeaponCount,
  rollRandomWeapons,
  randomWeaponSet,
  getWeaponImage,
  getApIcon,
}) {
  return (
    <section className="section weapon-random-section">
      <div className="section-title">
        <span>07</span>
        <h2>Random Weapon Loadout</h2>
        <p>Spin the armory wheel and trust destiny with your ammo economy.</p>
      </div>
      <div className="weapon-random-controls">
        <div className="weapon-random-count">
          <label htmlFor="random-weapon-count">Count per slot</label>
          <div className="count-control">
            <button
              type="button"
              className="count-step"
              onClick={() => setRandomWeaponCount((prev) => Math.max(1, prev - 1))}
              aria-label="Decrease random count"
            >
              -
            </button>
            <input
              id="random-weapon-count"
              type="range"
              min="1"
              max="5"
              value={randomWeaponCount}
              onChange={(event) => setRandomWeaponCount(Number(event.target.value))}
            />
            <button
              type="button"
              className="count-step"
              onClick={() => setRandomWeaponCount((prev) => Math.min(5, prev + 1))}
              aria-label="Increase random count"
            >
              +
            </button>
            <span>{randomWeaponCount}</span>
          </div>
        </div>
        <button type="button" className="primary" onClick={rollRandomWeapons}>
          Reroll Loadout
        </button>
      </div>
      <div className="weapon-random-grid">
        {[
          { label: 'Primary', items: randomWeaponSet.primary },
          { label: 'Secondary (Slot 2)', items: randomWeaponSet.secondary },
          { label: 'Grenade (Slot 4)', items: randomWeaponSet.grenade },
        ].map(({ label, items }) => (
          <article key={label} className="weapon-random-card">
            <div className="weapon-random-label">{label}</div>
            {items?.length ? (
              <div className="weapon-random-list">
                {items.map((item, idx) => (
                  <div key={`${label}-${item.id}-${idx}`} className="weapon-random-body">
                    <div
                      className={`weapon-card-icon ${
                        item.slot === 'Slot 4' ? 'grenade' : ''
                      } ${item.id === 'k-2-throwing-knife' ? 'k2-offset' : ''}`}
                    >
                      {item.image ? (
                        <img src={getWeaponImage(item.image)} alt={item.name} loading="lazy" />
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </div>
                    <div className="weapon-card-body">
                      <h3>{item.name}</h3>
                      <div className="weapon-meta">
                        <span>{item.slot}</span>
                        <span>{item.category}</span>
                      </div>
                      {item.armor?.length ? (
                        <div className="weapon-armor">
                          <span className="weapon-armor-label">Armor Pen</span>
                          <div className="weapon-armor-tags">
                            {item.armor.map((armor, index) => (
                              <span
                                key={`${item.id}-random-armor-${index}`}
                                className="weapon-armor-chip"
                              >
                                {getApIcon(armor.value) ? (
                                  <img src={getApIcon(armor.value)} alt={`AP ${armor.value}`} />
                                ) : (
                                  `${armor.value}${
                                    armor.type ? ` ${armor.type.toUpperCase()}` : ''
                                  }`
                                )}
                              </span>
                            ))}
                            {item.armorNote && (
                              <span className="weapon-armor-note">{item.armorNote}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="weapon-armor muted">
                          <span className="weapon-armor-label">Armor Pen</span>
                          <span className="weapon-armor-note">Unknown</span>
                        </div>
                      )}
                      <p className="weapon-link">Wiki: {item.link}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="page-placeholder">No weapon found for {label}. Even command has limits.</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeaponRandomPage;
