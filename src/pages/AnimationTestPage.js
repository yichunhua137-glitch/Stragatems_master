import React, { useEffect, useMemo, useState } from 'react';

const ANIMATION_GROUPS = [
  {
    id: 'helldiver-walk',
    label: 'Helldiver Walking',
    frames: [
      '/animation/movement/helldiver walking/Sprite-0001.png',
      '/animation/movement/helldiver walking/Sprite-0002.png',
      '/animation/movement/helldiver walking/Sprite-0003.png',
      '/animation/movement/helldiver walking/Sprite-0004.png',
    ],
  },
  {
    id: 'captain-idle',
    label: 'Captain Idle',
    frames: [
      '/animation/idle/captain idle/Sprite-0004.png',
      '/animation/idle/captain idle/Sprite-0005.png',
      '/animation/idle/captain idle/Sprite-0006.png',
    ],
  },
  {
    id: 'democracy-officer-idle',
    label: 'Democracy Officer Idle',
    frames: [
      '/animation/idle/democracy officer idle/Sprite-0001.png',
      '/animation/idle/democracy officer idle/Sprite-0002.png',
      '/animation/idle/democracy officer idle/Sprite-0003.png',
    ],
  },
  {
    id: 'general-idle',
    label: 'General Idle',
    frames: [
      '/animation/idle/general idle/Sprite-0002.png',
      '/animation/idle/general idle/Sprite-0003.png',
      '/animation/idle/general idle/Sprite-0004.png',
    ],
  },
  {
    id: 'miss-eagle-idle',
    label: 'Miss Eagle Idle',
    frames: [
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy1.png',
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy2.png',
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy3.png',
    ],
  },
  {
    id: 'mission-controller-idle',
    label: 'Mission Controller Idle',
    frames: [
      '/animation/idle/mission controller idle/Sprite-0002.png',
      '/animation/idle/mission controller idle/Sprite-0003.png',
      '/animation/idle/mission controller idle/Sprite-0004.png',
    ],
  },
  {
    id: 'seaf-idle',
    label: 'SEAF Idle',
    frames: [
      '/animation/idle/seaf idle/Sprite-0003.png',
      '/animation/idle/seaf idle/Sprite-0004.png',
      '/animation/idle/seaf idle/Sprite-0005.png',
    ],
  },
];

function AnimationTestPage() {
  const [groupId, setGroupId] = useState(ANIMATION_GROUPS[0].id);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeGroup = useMemo(
    () =>
      ANIMATION_GROUPS.find((group) => group.id === groupId) ||
      ANIMATION_GROUPS[0],
    [groupId]
  );
  const frameIntervalMs = useMemo(
    () => (activeGroup.id.includes('-idle') ? 600 : 150),
    [activeGroup.id]
  );

  useEffect(() => {
    setFrameIndex(0);
  }, [groupId]);

  useEffect(() => {
    if (!isPlaying || activeGroup.frames.length < 2) return undefined;
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % activeGroup.frames.length);
    }, frameIntervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, activeGroup.frames.length, frameIntervalMs]);

  const currentFrame = activeGroup.frames[frameIndex] || '';

  return (
    <section className="section page-shell animation-test-section">
      <div className="section-title">
        <span>07</span>
        <h2>Animation Test</h2>
        <p>Independent sandbox page. You can remove it anytime.</p>
      </div>

      <div className="animation-test-panel">
        <div className="animation-test-controls">
          <label htmlFor="animation-group">Set</label>
          <select
            id="animation-group"
            value={groupId}
            onChange={(event) => setGroupId(event.target.value)}
          >
            {ANIMATION_GROUPS.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={`toggle-chip ${isPlaying ? 'active' : ''}`}
            onClick={() => setIsPlaying((prev) => !prev)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        <div className="animation-stage">
          <img
            src={`${process.env.PUBLIC_URL}${currentFrame}`}
            alt={activeGroup.label}
            className="animation-frame"
            onError={() => setIsPlaying(false)}
          />
        </div>

        <div className="animation-test-meta">
          <span>{activeGroup.label}</span>
          <strong>
            Frame {frameIndex + 1}/{activeGroup.frames.length}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default AnimationTestPage;
