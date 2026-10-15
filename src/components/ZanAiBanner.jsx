import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';

export default function ZanAiBanner({ onOpenInsight }) {
  return (
    <div className="zanai-insight-banner">
      <div className="insight-left">
        <div className="insight-badge-group">
          <div className="zanai-glow-icon">
            <Zap size={16} fill="#00e676" />
          </div>
          <span className="zanai-tag-text">ZanAI Insight</span>
          <span className="ai-chip">AI</span>
        </div>

        <p className="insight-message">
          Demand increased <strong>18% in Lagos</strong>. Recommend activating additional delivery partners during <strong>5PM - 9PM</strong> to reduce waiting time and capture more orders.
        </p>
      </div>

      <button className="insight-action-btn" onClick={onOpenInsight}>
        <span>View insights</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
