import React, { useEffect, useMemo, useState } from 'react';
import { loadArmorData } from '../utils/armorData';

function ArmorPage() {
  const [armors, setArmors] = useState([]);
  const [slotMap, setSlotMap] = useState({});
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
        <p>Browse light, medium, and heavy armor with slot/passive details.</p>
      </div>

      <div className="armor-controls">
        <label className="weapon-field">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search armor name or id"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="weapon-field">
          <span>Class</span>
          <select
            value={armorClass}
            onChange={(event) => setArmorClass(event.target.value)}
          >
            <option value="all">All classes</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </label>

        <div className="weapon-count">{filtered.length} armors</div>
      </div>

      {loading ? (
        <div className="page-placeholder">Loading armor database...</div>
      ) : error ? (
        <div className="page-placeholder">{error}</div>
      ) : (
        <div className="armor-grid">
          {filtered.map((item) => {
            const passive = passiveMap[item.passive] || {};
            const slot = slotMap[item.slot] || `Slot ${item.slot}`;
            return (
              <article key={item.id} className="armor-card">
                <div className="armor-header-row">
                  <h3>{item.name}</h3>
                  <span className={`armor-class-chip ${item.classKey}`}>
                    {item.classLabel}
                  </span>
                </div>
                <p className="wiki-desc">{item.description}</p>

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

export default ArmorPage;
