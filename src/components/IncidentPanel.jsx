import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  Check
} from 'lucide-react';

export default function IncidentPanel({ onClose, onResolve }) {
  const [isResolved, setIsResolved] = useState(false);

  const actions = [
    'Notified nearby delivery partners',
    'Activated surge incentive (₦500 per order)',
    'Repositioned idle partners from adjacent zones',
    'Increased partner visibility in Ikeja'
  ];

  const timeline = [
    { time: '12:13 PM', text: 'Incident detected (Auto-alert)', isOrange: false },
    { time: '12:15 PM', text: 'Operations team notified', isOrange: false },
    { time: '12:18 PM', text: 'Surge campaign activated', isOrange: false },
    { time: '12:25 PM', text: 'Additional partners mobilized', isOrange: false },
    { time: 'ETA 01:45 PM', text: 'Expected normalization', isOrange: true }
  ];

  const handleCloseIncident = () => {
    setIsResolved(true);
    if (onResolve) onResolve();
  };

  return (
    <div className="incident-panel">
      <div className="incident-header">
        <h2>Incident Details</h2>
        <button
          className="close-panel-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={15} />
        </button>
      </div>

      <div className="incident-content-scroll">
        {/* Red Alert Box */}
        <div className="incident-alert-box">
          <div className="incident-alert-circle">
            <AlertTriangle size={14} strokeWidth={2.8} />
          </div>
          <div className="alert-box-text">
            <div className="alert-top-title-row">
              <span className="alert-title">Ikeja Delivery Delay</span>
              <span className="alert-tag-high">High</span>
            </div>
            <p className="alert-description">
              High number of orders causing delivery delays in Ikeja Zone, Lagos
            </p>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="incident-meta-list">
          <div className="meta-row">
            <span className="meta-label">Incident ID</span>
            <span className="meta-value" style={{ fontFamily: 'var(--font-mono)' }}>
              INC-20260120-0047
            </span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Status</span>
            <div className="meta-value">
              {isResolved ? (
                <span style={{ color: '#00e676', fontWeight: 700, fontSize: '10px' }}>
                  ✓ Resolved
                </span>
              ) : (
                <span className="status-pill-investigating">Investigating</span>
              )}
            </div>
          </div>

          <div className="meta-row">
            <span className="meta-label">Reported</span>
            <span className="meta-value">20 Jan 2026, 12:13 PM</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Zone / Location</span>
            <span className="meta-value">Ikeja Zone, Lagos</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Owner</span>
            <span className="meta-value">Operations Team</span>
          </div>

          <div className="meta-row" style={{ flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
            <span className="meta-label">Root Cause</span>
            <span className="meta-value" style={{ textAlign: 'left', color: '#94a3b8', fontSize: '10px' }}>
              Sudden demand spike (+45%) due to lunch hour, limited active delivery partners in the zone.
            </span>
          </div>
        </div>

        {/* Actions Taken */}
        <div>
          <h3 className="incident-section-title">Actions Taken</h3>
          <div className="actions-checklist">
            {actions.map((act, i) => (
              <div key={i} className="action-check-item">
                <div className="action-check-badge">
                  <Check size={10} strokeWidth={3.5} />
                </div>
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Timeline: Time on the left, Timeline track & dot in the middle, Event text on the right */}
        <div>
          <h3 className="incident-section-title">Resolution Timeline</h3>
          <div className="resolution-timeline-container">
            {timeline.map((item, idx) => (
              <div key={idx} className="timeline-row-item">
                {/* 1. Time on the left */}
                <div className="timeline-time-col">{item.time}</div>

                {/* 2. Timeline track & dot AFTER the time */}
                <div className="timeline-track-col">
                  <div className={`timeline-dot-circle ${item.isOrange ? 'orange' : 'green'}`} />
                  {idx < timeline.length - 1 && <div className="timeline-connecting-line" />}
                </div>

                {/* 3. Event text on the right */}
                <div className="timeline-text-col">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          className="close-incident-btn"
          onClick={handleCloseIncident}
        >
          {isResolved ? 'Incident Closed' : 'Close incident'}
        </button>
      </div>
    </div>
  );
}
