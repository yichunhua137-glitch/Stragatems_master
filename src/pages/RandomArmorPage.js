import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getArmorImageByName,
  loadArmorData,
  pickRandomArmors,
} from '../utils/armorData';

function RandomArmorPage() {
  const [armors, setArmors] = useState([]);
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

  const reroll = useCallback(() => {
    const count = Math.max(1, Math.min(6, pickCount));
    setRolled(pickRandomArmors(available, count));
  }, [available, pickCount]);

  useEffect(() => {
    if (!loading && !error) {
      reroll();
    }
  }, [loading, error, reroll]);

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
            return (
              <article key={`${item.id}-${index}`} className="armor-card">
                <div className="armor-card-layout">
                  <div className="armor-card-content">
                    <div className="armor-card-head">
                      <h3>{item.name}</h3>
                      <span className={`armor-class-chip ${item.classKey}`}>
                        {item.classLabel}
                      </span>
                    </div>
                    <p className="armor-desc">{item.description}</p>

                    <div className="armor-stat-row">
                      <div className="armor-stat">
                        <span>Armor</span>
                        <strong>{item.armorRating || '--'}</strong>
                      </div>
                      <div className="armor-stat">
                        <span>Speed</span>
                        <strong>{item.speed || '--'}</strong>
                      </div>
                      <div className="armor-stat">
                        <span>Stamina</span>
                        <strong>{item.staminaRegen || '--'}</strong>
                      </div>
                    </div>

                    <div className="armor-meta-block">
                      <strong>{passive.name || `Passive ${item.passive}`}</strong>
                      {passive.description ? (
                        <span>{passive.description}</span>
                      ) : (
                        <span>No passive description.</span>
                      )}
                    </div>
                  </div>

                  <div className="armor-image-slot">
                    <img
                      src={getArmorImageByName(item.name)}
                      alt={item.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                        if (event.currentTarget.nextElementSibling) {
                          event.currentTarget.nextElementSibling.style.display = 'block';
                        }
                      }}
                    />
                    <span className="armor-image-fallback">Image Missing</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RandomArmorPage;
