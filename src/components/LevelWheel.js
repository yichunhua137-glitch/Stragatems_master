import React from 'react';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function LevelWheel({ value, onChange, min = 1, max = 99 }) {
  const center = clamp(value, min, max);
  const levels = [-2, -1, 0, 1, 2]
    .map((offset) => center + offset)
    .filter((lv) => lv >= min && lv <= max);

  const stepLevel = (delta) => onChange((prev) => clamp(prev + delta, min, max));

  return (
    <div className="level-wheel-wrap">
      <button
        type="button"
        className="level-wheel-step"
        onClick={() => stepLevel(1)}
        aria-label="Increase level"
      >
        +
      </button>
      <div
        className="level-wheel"
        onWheel={(event) => {
          event.preventDefault();
          if (event.deltaY < 0) stepLevel(1);
          if (event.deltaY > 0) stepLevel(-1);
        }}
      >
        {levels.map((lv) => (
          <div
            key={lv}
            className={`level-wheel-item ${lv === center ? 'active' : ''}`}
            onClick={() => onChange(lv)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onChange(lv);
            }}
          >
            {lv}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="level-wheel-step"
        onClick={() => stepLevel(-1)}
        aria-label="Decrease level"
      >
        -
      </button>
    </div>
  );
}

export default LevelWheel;

