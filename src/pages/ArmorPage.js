import React, { useEffect, useMemo, useState } from 'react';
import { getArmorImageByName, loadArmorData } from '../utils/armorData';

function ArmorPage() {
  const [armors, setArmors] = useState([]);
  const [passiveMap, setPassiveMap] = useState({});
  const [search, setSearch] = useState('');
  const [armorClass, setArmorClass] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return armors.filter((item) => {
      if (armorClass !== 'all' && item.classKey !== armorClass) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.sourceId.toLowerCase().includes(query)
      );
    });
  }, [armors, armorClass, search]);

  return (
    <section className="section armor-section">
      <div className="section-title">
        <span>09</span>
        <h2>Armor Wiki</h2>
        <p>Browse armor sets by class, passive, and movement profile.</p>
      </div>

      <div className="armor-toolbar">
        <div className="armor-class-tabs">
          {[
            { value: 'all', label: 'All' },
            { value: 'light', label: 'Light' },
            { value: 'medium', label: 'Medium' },
            { value: 'heavy', label: 'Heavy' },
          ].map((entry) => (
            <button
              key={entry.value}
              type="button"
              className={`toggle-chip ${armorClass === entry.value ? 'active' : ''}`}
              onClick={() => setArmorClass(entry.value)}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <label className="armor-search">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search armor name or id"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div className="armor-count-badge">{filtered.length} armors</div>
      </div>

      {loading ? (
        <div className="page-placeholder">Loading armor database...</div>
      ) : error ? (
        <div className="page-placeholder">{error}</div>
      ) : (
        <div className="armor-grid">
          {filtered.map((item) => {
            const passive = passiveMap[item.passive] || {};
            return (
              <article key={item.id} className="armor-card">
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

export default ArmorPage;
