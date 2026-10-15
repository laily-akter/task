import React from 'react';
import {
  Zap,
  BarChart2,
  Megaphone,
  ArrowRight,
  Pause,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';

export default function QuickActionsBar({ onAction }) {
  const handleAction = (name) => {
    if (onAction) onAction(name);
  };

  return (
    <div className="quick-actions-bar">
      <div className="quick-actions-left">
        <div className="quick-actions-zap-glow">
          <Zap size={14} fill="#00e676" color="#00e676" />
        </div>
        <span className="quick-actions-title">Quick Actions</span>
      </div>

      <div className="quick-actions-group">
        {/* Launch Supply Campaign (Solid Green) */}
        <button
          type="button"
          className="btn-quick btn-quick-primary"
          onClick={() => handleAction('Launch Supply Campaign')}
        >
          <BarChart2 size={13} strokeWidth={2.5} />
          <span>Launch Supply Campaign</span>
        </button>

        {/* Run Promotion (Solid Orange with Megaphone icon) */}
        <button
          type="button"
          className="btn-quick btn-quick-orange"
          onClick={() => handleAction('Run Promotion')}
        >
          <Megaphone size={13} strokeWidth={2.2} />
          <span>Run Promotion</span>
        </button>

        {/* Notify Partners (Dark Outline with Arrow Right) */}
        <button
          type="button"
          className="btn-quick btn-quick-outline"
          onClick={() => handleAction('Notify Partners')}
        >
          <ArrowRight size={13} strokeWidth={2.5} />
          <span>Notify Partners</span>
        </button>

        {/* Pause Zone (Dark Outline with Pause icon) */}
        <button
          type="button"
          className="btn-quick btn-quick-outline"
          onClick={() => handleAction('Pause Zone')}
        >
          <Pause size={12} strokeWidth={2.5} />
          <span>Pause Zone</span>
        </button>

        {/* Escalate Incident (Red outlined with Alert Triangle) */}
        <button
          type="button"
          className="btn-quick btn-quick-red-outline"
          onClick={() => handleAction('Escalate Incident')}
        >
          <AlertTriangle size={13} strokeWidth={2.2} />
          <span>Escalate Incident</span>
        </button>

        {/* More Actions (···) */}
        <button
          type="button"
          className="btn-quick btn-quick-outline"
          style={{ padding: '6px 10px' }}
          onClick={() => handleAction('More Actions')}
        >
          <MoreHorizontal size={14} />
          <span>More Actions</span>
        </button>
      </div>
    </div>
  );
}
