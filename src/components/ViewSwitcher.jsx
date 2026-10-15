import React from 'react';
import { viewsList } from '../data/mockData';

function MiniBarSparkline({ bars = [], color = '#00e676' }) {
  const maxVal = Math.max(...bars, 100);
  return (
    <div className="view-sparkline-row">
      {bars.map((val, idx) => {
        const heightPct = (val / maxVal) * 100;
        return (
          <div
            key={idx}
            className="view-sparkline-bar"
            style={{
              height: `${heightPct}%`,
              background: color,
              opacity: 0.45 + (idx / bars.length) * 0.55
            }}
          />
        );
      })}
    </div>
  );
}

export default function ViewSwitcher({ activeView, onSelectView }) {
  return (
    <div className="views-mini-switcher">
      <div className="views-switcher-header">
        <span className="views-switcher-title">Intelligence View</span>
        <span className="views-switcher-badge">Live</span>
      </div>

      <div className="views-list-container">
        {viewsList.map((view) => {
          const isActive = activeView.toLowerCase().includes(view.id);
          const activeBorderColor = view.color || '#00e676';

          return (
            <div
              key={view.id}
              className={`view-option-item ${isActive ? 'active' : ''}`}
              style={{
                borderColor: isActive ? activeBorderColor : 'transparent',
                boxShadow: isActive ? `0 0 16px ${activeBorderColor}26` : 'none'
              }}
              onClick={() => onSelectView(view.name)}
            >
              <div className="view-item-text">
                <div
                  className="view-title-main"
                  style={{ color: isActive ? activeBorderColor : '#e2e8f0' }}
                >
                  <span
                    className="view-indicator-dot"
                    style={{ background: activeBorderColor }}
                  />
                  {view.name}
                </div>
                <div className="view-tags-sub">{view.subtitle}</div>
              </div>
              <MiniBarSparkline bars={view.bars} color={view.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
