import React from 'react';

// Weapon browser with slot/category filters.
function WeaponPage({
  weaponQuery,
  setWeaponQuery,
  weaponSlot,
  setWeaponSlot,
  weaponCategory,
  setWeaponCategory,
  weaponSlots,
  weaponCategories,
  weaponResults,
  getWeaponImage,
  getApIcon,
}) {
  return (
    <section className="section weapon-section">
      <div className="section-title">
        <span>06</span>
        <h2>Weapon Wiki</h2>
        <p>Browse approved tools for peaceful conflict resolution.</p>
      </div>
      <div className="weapon-controls">
        <label className="weapon-field">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search weapon name or id"
            value={weaponQuery}
            onChange={(event) => setWeaponQuery(event.target.value)}
          />
        </label>
        <label className="weapon-field">
          <span>Slot</span>
          <select
            value={weaponSlot}
            onChange={(event) => {
              setWeaponSlot(event.target.value);
              setWeaponCategory('all');
            }}
          >
            <option value="all">All slots</option>
            {weaponSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <label className="weapon-field">
          <span>Category</span>
          <select
            value={weaponCategory}
            onChange={(event) => setWeaponCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {weaponCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="weapon-count">{weaponResults.length} weapons</div>
      </div>
      <div className="weapon-grid">
        {weaponResults.length ? (
          weaponResults.map((item) => (
            <article key={item.id} className="weapon-card">
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
                          key={`${item.id}-armor-${index}`}
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
            </article>
          ))
        ) : (
          <div className="page-placeholder">
            No weapon data found. Please report to logistics for stern disappointment.
          </div>
        )}
      </div>
    </section>
  );
}

export default WeaponPage;
