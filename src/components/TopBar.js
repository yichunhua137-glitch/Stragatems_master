import React, { useEffect, useMemo, useState } from 'react';

// Top navigation with two group dropdowns: Stratagem and Weapon.
function TopBar({
  openMenuGroup,
  page,
  setShowSplash,
  onOpenMenu,
  onCloseMenu,
  onSelectPage,
}) {
  const helldiverQuips = useMemo(
    () => [
      'Friendly fire is just supervised learning.',
      'Remember: every casualty improves the average.',
      'Democracy is non-negotiable. Your life is.',
      'If in doubt, call orbital. If still in doubt, call two.',
      'A minefield is just a very committed perimeter.',
      'Retreating is unauthorized forward movement.',
      'Supplies are limited. Courage is mandatory.',
      'Your respawn budget believes in you.',
      'Accuracy is optional. Volume is patriotic.',
      'The objective is secondary to glorious overkill.',
      'If it moves, report it. Then delete it.',
      'Low survival rates indicate high mission enthusiasm.',
      'Every crater is a signed receipt for freedom.',
      'Do not fear death; fear incomplete paperwork.',
      'Team cohesion improves after the first accidental airstrike.',
      'A true Helldiver never misses. The map just shifts.',
      'Collateral damage is still damage to the enemy economy.',
      'If you can hear the barrage, you are probably outside it.',
      'Morale is stored in the stratagem cooldown timer.',
      'No witness, no friendly fire report.',
      'Victory is guaranteed. Survival remains experimental.',
      'Your helmet camera is for training, not complaints.',
      'Managed Democracy appreciates your recyclable remains.',
      'The safest drop zone is usually somewhere else.',
    ],
    []
  );

  const groupItems = {
    stratagem: [
      { id: 'training', label: 'Training' },
      { id: 'wiki', label: 'Wiki' },
      { id: 'loadout', label: 'Random Loadout' },
    ],
    challenge: [
      { id: 'challenge', label: 'Challenge' },
      { id: 'random', label: 'Random Code' },
    ],
    weapon: [
      { id: 'weapon', label: 'Weapon Wiki' },
      { id: 'weapon-random', label: 'Random Weapon' },
    ],
  };

  const activeGroup =
    page === 'weapon' || page === 'weapon-random'
      ? 'weapon'
      : page === 'challenge' || page === 'random'
      ? 'challenge'
      : 'stratagem';
  const currentLabel =
    [
      ...groupItems.stratagem,
      ...groupItems.challenge,
      ...groupItems.weapon,
    ].find((item) => item.id === page)?.label || 'Training';
  const modeHeadline =
    activeGroup === 'challenge'
      ? 'Mandatory Heroism'
      : activeGroup === 'weapon'
      ? 'Approved Armaments'
      : 'Democracy Directive';
  const [quipIndex, setQuipIndex] = useState(() =>
    Math.floor(Math.random() * helldiverQuips.length)
  );

  useEffect(() => {
    setQuipIndex(Math.floor(Math.random() * helldiverQuips.length));
  }, [page, helldiverQuips]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuipIndex((prev) => (prev + 1) % helldiverQuips.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [helldiverQuips.length]);

  const toggleGroup = (groupId) => {
    if (openMenuGroup === groupId) {
      onCloseMenu();
      return;
    }
    onOpenMenu(groupId);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-head">
          <button
            type="button"
            className="brand-mark"
            onClick={() => setShowSplash(true)}
            aria-label="Open splash"
            title="By opening this site, you are hereby enlisted in the Helldivers."
          >
            HD2
          </button>
          <div className="topbar-mode">
            <span className="topbar-mode-label">{modeHeadline}</span>
            <span className="topbar-title">{currentLabel}</span>
            <span className="topbar-mode-quote">{helldiverQuips[quipIndex]}</span>
          </div>
        </div>

        <nav className="topbar-group-row" aria-label="Navigation groups">
          {[
            { id: 'stratagem', label: 'Stratagem' },
            { id: 'challenge', label: 'Challenge' },
            { id: 'weapon', label: 'Weapon' },
          ].map((group) => (
            <div key={group.id} className="topbar-group-item">
              <button
                type="button"
                className={`topbar-group-btn ${
                  activeGroup === group.id ? 'active' : ''
                } ${openMenuGroup === group.id ? 'open' : ''}`}
                onClick={() => toggleGroup(group.id)}
                aria-expanded={openMenuGroup === group.id}
                aria-controls={`${group.id}-menu`}
              >
                <span>{group.label}</span>
                <span className="topbar-group-arrow" aria-hidden="true">
                  ▼
                </span>
              </button>

              {openMenuGroup === group.id && (
                <div className="menu-dropdown" id={`${group.id}-menu`}>
                  <div className="menu-col">
                    <div className="menu-dropdown-title">
                      {group.id === 'stratagem'
                        ? 'Stratagem'
                        : group.id === 'challenge'
                        ? 'Challenge'
                        : 'Weapon'}
                    </div>
                    {groupItems[group.id].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={page === item.id ? 'active' : ''}
                        onClick={() => onSelectPage(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      {openMenuGroup && (
        <div className="menu-backdrop" onClick={onCloseMenu} aria-hidden="true" />
      )}
    </>
  );
}

export default TopBar;
