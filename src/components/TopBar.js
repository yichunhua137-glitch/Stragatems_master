import React, { useEffect, useMemo, useRef, useState } from 'react';

// Top navigation with two group dropdowns: Stratagem and Weapon.
function TopBar({
  openMenuGroup,
  page,
  setShowSplash,
  onOpenMenu,
  onCloseMenu,
  onSelectPage,
}) {
  const WALKER_SIZE = 117;
  const movingFrames = useMemo(
    () => [
      `${process.env.PUBLIC_URL}/moving/sprite_upscaled_8x-export1.png`,
      `${process.env.PUBLIC_URL}/moving/sprite_upscaled_8x-export2.png`,
      `${process.env.PUBLIC_URL}/moving/sprite_upscaled_8x-export3.png`,
      `${process.env.PUBLIC_URL}/moving/sprite_upscaled_8x-export4.png`,
      `${process.env.PUBLIC_URL}/moving/sprite_upscaled_8x-export5.png`,
    ],
    []
  );
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
      'Team cohesion improves after accidental airstrikes.',
      'A true Helldiver never misses. The map just shifts.',
      'Collateral damage hurts the enemy economy.',
      'If you can hear the barrage, you are probably outside it.',
      'Morale is stored in the stratagem cooldown timer.',
      'No witness, no friendly fire report.',
      'Victory is guaranteed. Survival remains experimental.',
      'Your helmet camera is for training, not complaints.',
      'Managed Democracy appreciates recyclable remains.',
      'The safest drop zone is usually elsewhere.',
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
      { id: 'challenge-interference', label: 'Interference' },
      { id: 'signal-hijack', label: 'Broadcast Relay' },
    ],
    quiz: [
      { id: 'quiz-input', label: 'Icon Blind Input' },
      { id: 'quiz-logo', label: 'Code Match' },
    ],
    weapon: [
      { id: 'weapon', label: 'Weapon Wiki' },
      { id: 'weapon-random', label: 'Random Weapon' },
    ],
    armor: [
      { id: 'armor', label: 'Armor' },
      { id: 'armor-random', label: 'Random Armor' },
    ],
  };

  const activeGroup =
    page === 'quiz-input' || page === 'quiz-logo'
      ? 'quiz'
      : page === 'armor' || page === 'armor-random'
      ? 'armor'
      : page === 'weapon' || page === 'weapon-random'
      ? 'weapon'
      : page === 'challenge' ||
        page === 'random' ||
        page === 'challenge-interference' ||
        page === 'signal-hijack' ||
        page === 'animation-test'
      ? 'challenge'
      : 'stratagem';
  const currentLabel =
    [
      ...groupItems.stratagem,
      ...groupItems.challenge,
      ...groupItems.quiz,
      ...groupItems.weapon,
      ...groupItems.armor,
    ].find((item) => item.id === page)?.label || 'Training';
  const modeHeadline =
    activeGroup === 'challenge'
      ? 'Mandatory Heroism'
      : activeGroup === 'quiz'
      ? 'Cognitive Screening'
      : activeGroup === 'armor'
      ? 'Defensive Doctrine'
      : activeGroup === 'weapon'
      ? 'Approved Armaments'
      : 'Democracy Directive';
  const [quipIndex, setQuipIndex] = useState(() =>
    Math.floor(Math.random() * helldiverQuips.length)
  );
  const [frameIndex, setFrameIndex] = useState(0);
  const [walkPos, setWalkPos] = useState(0);
  const [walkDir, setWalkDir] = useState(1);
  const [walkBounds, setWalkBounds] = useState({ min: 260, max: 520 });
  const topbarRef = useRef(null);
  const titleRef = useRef(null);
  const groupRowRef = useRef(null);

  useEffect(() => {
    setQuipIndex(Math.floor(Math.random() * helldiverQuips.length));
  }, [page, helldiverQuips]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuipIndex((prev) => (prev + 1) % helldiverQuips.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [helldiverQuips.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % movingFrames.length);
    }, 120);
    return () => clearInterval(timer);
  }, [movingFrames.length]);

  useEffect(() => {
    const step = 0.012;
    const timer = setInterval(() => {
      setWalkPos((prev) => {
        const next = prev + step * walkDir;
        if (next >= 1) {
          setWalkDir(-1);
          return 1;
        }
        if (next <= 0) {
          setWalkDir(1);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [walkDir]);

  useEffect(() => {
    const updateBounds = () => {
      const topbarEl = topbarRef.current;
      const titleEl = titleRef.current;
      const navEl = groupRowRef.current;
      if (!topbarEl || !titleEl || !navEl) return;
      const topbarRect = topbarEl.getBoundingClientRect();
      const titleRect = titleEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const min = titleRect.right - topbarRect.left + 30;
      const max = navRect.left - topbarRect.left - 30 - WALKER_SIZE;
      setWalkBounds({
        min,
        max: Math.max(min, max),
      });
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [page, openMenuGroup]);

  const toggleGroup = (groupId) => {
    if (openMenuGroup === groupId) {
      onCloseMenu();
      return;
    }
    onOpenMenu(groupId);
  };

  return (
    <>
      <header className="topbar" ref={topbarRef}>
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
            <span className="topbar-title" ref={titleRef}>
              {currentLabel}
            </span>
            <span className="topbar-mode-quote">{helldiverQuips[quipIndex]}</span>
          </div>
        </div>

        <div className="heading-walker" aria-hidden="true">
          <img
            className={`heading-walker-sprite ${walkDir < 0 ? 'leftward' : 'rightward'}`}
            src={movingFrames[frameIndex]}
            alt=""
            style={{
              left: `${walkBounds.min + (walkBounds.max - walkBounds.min) * walkPos}px`,
            }}
          />
        </div>

        <nav className="topbar-group-row" aria-label="Navigation groups" ref={groupRowRef}>
          {[
            { id: 'stratagem', label: 'Stratagem' },
            { id: 'challenge', label: 'Challenge' },
            { id: 'quiz', label: 'Quiz' },
            { id: 'weapon', label: 'Weapon' },
            { id: 'armor', label: 'Armor' },
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
                  &#9662;
                </span>
              </button>

              {openMenuGroup === group.id && (
                <div
                  className={`menu-dropdown ${
                    group.id === 'armor' || group.id === 'weapon' ? 'align-right' : ''
                  }`}
                  id={`${group.id}-menu`}
                >
                  <div className="menu-col">
                    <div className="menu-dropdown-title">
                      {group.id === 'stratagem'
                        ? 'Stratagem'
                        : group.id === 'challenge'
                        ? 'Challenge'
                        : group.id === 'quiz'
                        ? 'Quiz'
                        : group.id === 'armor'
                        ? 'Armor'
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

