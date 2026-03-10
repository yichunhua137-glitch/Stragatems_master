import React, { useEffect, useMemo, useState } from 'react';
import { loadArmorData, pickRandomArmors } from '../utils/armorData';

function RandomArmorPage() {
  const [armors, setArmors] = useState([]);
  const [slotMap, setSlotMap] = useState({});
  const [passiveMap, setPassiveMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [pickCount, setPickCount] = useState(3);
  const [enabledClass, setEnabledClass] = useState({
    light: true,
    medium: true,
    heavy: true,
  });
  const [rolled, setRolled] = useState([]);

  useEffect(() => {
    let mounted = true;
    loadArmorData()
      .then((data) => {
        if (!mounted) return;
        setArmors(data.armors);
        setSlotMap(data.slotMap);
        setPassiveMap(data.passiveMap);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load armor data');
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const available = useMemo(
    () =>
      armors.filter((item) => enabledClass[item.classKey]),
    [armors, enabledClass]
  );

  const reroll = () => {
    const count = Math.max(1, Math.min(6, pickCount));
    setRolled(pickRandomArmors(available, count));
  };

  useEffect(() => {
    if (!loading && !error) {
      reroll();
    }
  }, [loading, error]);

  return (
    <section className="section armor-section">
      <div className="section-title">
        <span>10</span>
        <h2>Random Armor</h2>
        <p>Randomized picks from light/medium/heavy armor pools.</p>
      </div>

      <div className="armor-random-controls">
        <div className="weapon-random-count">
          <label htmlFor="random-armor-count">Armor count</label>
          <div className="count-control">
            <button
              type="button"
              className="count-step"
              onClick={() => setPickCount((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              id="random-armor-count"
              type="range"
              min="1"
              max="6"
              value={pickCount}
              onChange={(event) => setPickCount(Number(event.target.value))}
            />
            <button
              type="button"
              className="count-step"
              onClick={() => setPickCount((prev) => Math.min(6, prev + 1))}
            >
              +
            </button>
            <span>{pickCount}</span>
          </div>
        </div>

        <div className="armor-class-toggle-row">
          {[
            ['light', 'Light'],
            ['medium', 'Medium'],
            ['heavy', 'Heavy'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`toggle-chip ${enabledClass[key] ? 'active' : ''}`}
              onClick={() =>
                setEnabledClass((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button type="button" className="primary" onClick={reroll}>
          Reroll Armor
        </button>
      </div>

      {loading ? (
        <div className="page-placeholder">Loading armor database...</div>
      ) : error ? (
        <div className="page-placeholder">{error}</div>
      ) : !available.length ? (
        <div className="page-placeholder">Enable at least one armor class.</div>
      ) : (
        <div className="armor-grid">
          {rolled.map((item, index) => {
            const passive = passiveMap[item.passive] || {};
            const slot = slotMap[item.slot] || `Slot ${item.slot}`;
            return (
              <article key={`${item.id}-${index}`} className="armor-card">
                <div className="armor-header-row">
                  <h3>{item.name}</h3>
                  <span className={`armor-class-chip ${item.classKey}`}>
                    {item.classLabel}
                  </span>
                </div>
                <div className="armor-stats">
                  <span>Armor {item.armorRating}</span>
                  <span>Speed {item.speed}</span>
                  <span>Stamina Regen {item.staminaRegen}</span>
                </div>
                <div className="armor-meta-block">
                  <strong>Slot</strong>
                  <span>{slot}</span>
                </div>
                <div className="armor-meta-block">
                  <strong>Passive</strong>
                  <span>{passive.name || `Passive ${item.passive}`}</span>
                </div>
                {passive.description ? (
                  <p className="weapon-armor-note">{passive.description}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RandomArmorPage;
