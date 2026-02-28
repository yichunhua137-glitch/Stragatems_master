import React from 'react';

// Intro splash shown before the app UI is unlocked.
function SplashScreen({ splashLogoUrl, onClose }) {
  return (
    <div className="splash" onClick={onClose}>
      <div className="splash-backdrop" />
      <div className="splash-hazard" />
      <div className="splash-content">
        <div className="splash-badge">SUPER EARTH FIELD OPS</div>
        <div
          className="splash-emblem"
          style={{ '--splash-logo': `url(${splashLogoUrl})` }}
          aria-hidden="true"
        />
        <div className="splash-title">
          <span>HELLDIVER</span>
          <span className="splash-title-accent">TRAINING</span>
        </div>
        <p className="splash-subtitle">Strategic Ordnance Operations Terminal</p>
        <div className="splash-cta">
          <span>Click anywhere to deploy</span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
