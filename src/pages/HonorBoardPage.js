import React, { useMemo } from 'react';

function HonorBoardPage({
  allStratagems,
  authConfigured,
  globalRecords,
  onOpenAuth,
  personalCloudReady,
  personalRecords,
  profile,
  session,
  getStratagemLogo,
}) {
  const mergedRows = useMemo(() => {
    return allStratagems
      .map((item) => {
        const personal = personalRecords[item.id] || null;
        const world = globalRecords[item.id] || null;
        return {
          item,
          personal,
          world,
        };
      })
      .filter((row) => row.personal || row.world)
      .sort((a, b) => {
        if (a.personal && !b.personal) return -1;
        if (!a.personal && b.personal) return 1;

        const aTime = a.personal?.bestMs ?? Number.POSITIVE_INFINITY;
        const bTime = b.personal?.bestMs ?? Number.POSITIVE_INFINITY;
        if (aTime !== bTime) return aTime - bTime;

        return a.item.name.localeCompare(b.item.name);
      });
  }, [allStratagems, globalRecords, personalRecords]);

  const claimedWorldRecords = useMemo(
    () =>
      Object.values(globalRecords).filter(
        (record) => profile?.username && record.username === profile.username
      ).length,
    [globalRecords, profile]
  );

  const personalBestCount = Object.keys(personalRecords).length;

  const fastestPersonal = useMemo(() => {
    const records = Object.values(personalRecords);
    if (!records.length) return null;

    return records.reduce((best, current) =>
      !best || current.bestMs < best.bestMs ? current : best
    , null);
  }, [personalRecords]);

  return (
    <section className="section honor-section">
      <div className="challenge-header-row honor-header-row">
        <div className="challenge-heading-main">
          <span>Cloud Commendations</span>
          <h2>Honor Board</h2>
          <p>
            Review your cloud-issued personal bests against the current world record
            holders.
          </p>
        </div>

        <div className="challenge-records honor-summary">
          <div className="challenge-record-row">
            <span>Pilot</span>
            <strong>{profile?.username || session?.user?.email || 'Guest'}</strong>
          </div>
          <div className="challenge-record-row">
            <span>Personal Bests</span>
            <strong>{personalBestCount}</strong>
          </div>
          <div className="challenge-record-row">
            <span>World Records Held</span>
            <strong>{claimedWorldRecords}</strong>
          </div>
          <div className="challenge-record-row">
            <span>Fastest Personal</span>
            <strong>
              {fastestPersonal ? `${(fastestPersonal.bestMs / 1000).toFixed(2)}s` : '--'}
            </strong>
          </div>
        </div>
      </div>

      {!authConfigured && (
        <div className="page-placeholder">
          Supabase is not configured for this build, so cloud honor records are
          unavailable.
        </div>
      )}

      {authConfigured && !session && (
        <div className="honor-login-shell">
          <div className="page-placeholder honor-login-card">
            <strong>Sign in required</strong>
            <span>
              Guest mode can still train, but the Honor Board only shows cloud records
              attached to a pilot account.
            </span>
            <button type="button" className="primary" onClick={onOpenAuth}>
              Open Login
            </button>
          </div>
        </div>
      )}

      {authConfigured && session && !personalCloudReady && (
        <div className="page-placeholder honor-empty">
          Personal cloud bests are not enabled yet. Run the SQL in
          <code> supabase/personal_bests.sql </code>
          to create the personal best table and policies.
        </div>
      )}

      {authConfigured && session && personalCloudReady && (
        <div className="honor-grid">
          {mergedRows.length ? (
            mergedRows.map(({ item, personal, world }) => {
              const ownsWorldRecord =
                personal &&
                world &&
                profile?.username &&
                world.username === profile.username &&
                world.bestMs === personal.bestMs;

              return (
                <article key={item.id} className="honor-card">
                  <div className="honor-card-icon">
                    {item.icon ? (
                      <img
                        className="stratagem-logo"
                        src={getStratagemLogo(item.icon)}
                        alt={item.name}
                        loading="lazy"
                      />
                    ) : (
                      <span>{item.tag}</span>
                    )}
                  </div>

                  <div className="honor-card-body">
                    <div className="honor-card-head">
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.section}</span>
                      </div>
                      {ownsWorldRecord && <em>World Record Holder</em>}
                    </div>

                    <div className="honor-card-times">
                      <div className="honor-time-block">
                        <span>Personal</span>
                        <strong>
                          {personal ? `${(personal.bestMs / 1000).toFixed(2)}s` : '--'}
                        </strong>
                      </div>
                      <div className="honor-time-block">
                        <span>World</span>
                        <strong>
                          {world ? `${(world.bestMs / 1000).toFixed(2)}s` : '--'}
                        </strong>
                      </div>
                      <div className="honor-time-block">
                        <span>Held By</span>
                        <strong>{world?.username || '--'}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="page-placeholder honor-empty">
              No cloud personal bests yet. Finish a stratagem while signed in and your
              best time will appear here.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default HonorBoardPage;
