import React from 'react';
import { DIR_LABEL } from '../constants/directions';

// Shared settings dock for keybinds and core training controls.
function SettingsDock({
  page,
  settingsOpen,
  onToggleSettings,
  onStart,
  trainCount,
  setTrainCount,
  randomLength,
  setRandomLength,
  endlessMode,
  setEndlessMode,
  pauseEnabled,
  setPauseEnabled,
  pauseMs,
  setPauseMs,
  bindingTarget,
  setBindingTarget,
  keyBindings,
}) {
  return (
    <div className="settings-dock">
      {(page === 'training' || page === 'random') && (
        <button
          type="button"
          className="start-trigger"
          onClick={onStart}
        >
          Start
        </button>
      )}
      <button
        type="button"
        className={`settings-trigger ${settingsOpen ? 'active' : ''}`}
        onClick={onToggleSettings}
      >
        ⚙
      </button>
      {settingsOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <span>Keybinds, compliance knobs, and approved excuses.</span>
          </div>
          <div className="settings-section">
            <label htmlFor="count">Training count</label>
            <div className="count-control">
              <input
                id="count"
                type="range"
                min="1"
                max="20"
                value={trainCount}
                onChange={(event) => setTrainCount(Number(event.target.value))}
              />
              <span>{trainCount} items</span>
            </div>
          </div>
          {page === 'random' && (
            <div className="settings-section">
              <label htmlFor="random-length">Random sequence length</label>
              <div className="count-control">
                <input
                  id="random-length"
                  type="range"
                  min="2"
                  max="12"
                  value={randomLength}
                  onChange={(event) => setRandomLength(Number(event.target.value))}
                />
                <span>{randomLength} steps</span>
              </div>
            </div>
          )}
          <div className="settings-section">
            <label>Endless mode</label>
            <div className="toggle-row">
              <button
                type="button"
                className={`toggle-chip ${endlessMode ? 'active' : ''}`}
                onClick={() => setEndlessMode((prev) => !prev)}
              >
                {endlessMode ? 'On' : 'Off'}
              </button>
            </div>
          </div>
          <div className="settings-section">
            <label>Stratagem switch pause</label>
            <div className="toggle-row">
              <button
                type="button"
                className={`toggle-chip ${pauseEnabled ? 'active' : ''}`}
                onClick={() => setPauseEnabled((prev) => !prev)}
              >
                {pauseEnabled ? 'Enabled' : 'Off'}
              </button>
              <div className="count-control">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={pauseMs}
                  onChange={(event) => setPauseMs(Number(event.target.value))}
                  disabled={!pauseEnabled}
                />
                <span>{pauseMs} ms</span>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <label>Key bindings</label>
            <div className="bind-grid">
              {['up', 'left', 'down', 'right'].map((dir) => (
                <button
                  key={dir}
                  type="button"
                  className={`bind-chip ${
                    bindingTarget === dir ? 'listening' : ''
                  }`}
                  onClick={() =>
                    setBindingTarget((current) => (current === dir ? null : dir))
                  }
                >
                  <span className="bind-dir">{DIR_LABEL[dir]}</span>
                  <span className="bind-key">{keyBindings[dir] || '-'}</span>
                </button>
              ))}
            </div>
            <p className="bind-hint">Click a direction, then press a new key to bind.</p>
          </div>
          <div className="settings-section rules">
            <label>Usage</label>
            <p>
              Use WASD (or your custom keys) to enter directions in order.
              Incorrect inputs will be remembered by history.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsDock;
