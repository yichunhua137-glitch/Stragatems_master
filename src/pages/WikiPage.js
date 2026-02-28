import React from 'react';
import { DIR_ICON } from '../constants/directions';

// Read-only stratagem encyclopedia with search/filter.
function WikiPage({
  wikiQuery,
  setWikiQuery,
  wikiSection,
  setWikiSection,
  wikiSections,
  wikiResults,
  getStratagemLogo,
}) {
  return (
    <section className="section wiki-section">
      <div className="section-title">
        <span>02</span>
        <h2>Stratagem Wiki</h2>
        <p>Officially approved methods for solving problems with bigger explosions.</p>
      </div>
      <div className="wiki-controls">
        <label className="wiki-field">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search name or id"
            value={wikiQuery}
            onChange={(event) => setWikiQuery(event.target.value)}
          />
        </label>
        <label className="wiki-field">
          <span>Section</span>
          <select
            value={wikiSection}
            onChange={(event) => setWikiSection(event.target.value)}
          >
            <option value="all">All sections</option>
            {wikiSections.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <div className="wiki-count">{wikiResults.length} results</div>
      </div>
      <div className="wiki-grid">
        {wikiResults.map((item) => (
          <article key={item.id} className="wiki-card">
            <div className="wiki-card-header">
              <div className="wiki-icon">
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
              <div className="wiki-title">
                <h3>{item.name}</h3>
                <span>{item.section}</span>
              </div>
            </div>
            <div className="wiki-code">
              {item.code.map((dir, idx) => (
                <span key={`${item.id}-wiki-${idx}`} className="wiki-code-chip">
                  <span
                    className={`wiki-code-icon dir-${dir}`}
                    style={{ '--icon-url': `url(${DIR_ICON[dir]})` }}
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
            <div className="wiki-meta">
              <span>Cooldown: {item.cooldown}</span>
              <span>Unlock: {item.unlock}</span>
            </div>
            <p className="wiki-desc">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WikiPage;
