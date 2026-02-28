import React from 'react';
import { DIR_LABEL } from '../constants/directions';

// Floating detail tooltip for stratagem icon tiles.
function HoverTooltip({ hoverInfo, hoverPos }) {
  if (!hoverInfo) return null;

  return (
    <div
      className="floating-tooltip"
      style={{
        left: hoverPos.x + 12,
        top: hoverPos.y + 12,
      }}
    >
      <strong>{hoverInfo.item.name}</strong>
      <div className="icon-tile-meta">
        <span>Cooldown: {hoverInfo.item.cooldown}</span>
        <span>Unlock: {hoverInfo.item.unlock}</span>
        <span>Section: {hoverInfo.section}</span>
      </div>
      <span>{hoverInfo.item.description}</span>
      <em>{hoverInfo.item.code.map((dir) => DIR_LABEL[dir]).join(' ')}</em>
    </div>
  );
}

export default HoverTooltip;
