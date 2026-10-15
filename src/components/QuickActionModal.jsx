import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

export default function QuickActionModal({ actionType, isOpen, onClose, onConfirm }) {
  const [success, setSuccess] = useState(false);

  if (!isOpen || !actionType) return null;

  const handleExecute = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onConfirm) onConfirm(actionType);
      onClose();
    }, 1000);
  };

  const config = {
    'Launch Supply Campaign': {
      title: 'Launch Supply Campaign',
      color: '#00e676',
      desc: 'Deploy 50+ idle courier partners to high-density zones (Ikeja & Lagos Island) with guaranteed surge rate ₦500/order.',
      btnLabel: 'Confirm & Dispatch',
      target: 'Zone: Lagos Central (Ikeja & Victoria Island)'
    },
    'Run Promotion': {
      title: 'Run Instant Promotion',
      color: '#f97316',
      desc: 'Broadcast 15% discount push notification to 12,500 active customers nearby restaurants with slow prep queues.',
      btnLabel: 'Broadcast Promotion',
      target: 'Audience: 12,500 nearby users'
    },
    'Notify Partners': {
      title: 'Broadcast Notification to Partners',
      color: '#3b82f6',
      desc: 'Send high-priority SMS and in-app alerts to 450 verified riders within 3km of Ikeja Zone.',
      btnLabel: 'Send Broadcast',
      target: 'Recipients: 450 Verified Riders'
    },
    'Pause Zone': {
      title: 'Temporarily Pause Zone Orders',
      color: '#eab308',
      desc: 'Halt new incoming order checkout for 15 minutes to allow dispatch queue to clear backlog.',
      btnLabel: 'Pause Zone (15 mins)',
      target: 'Zone: Ikeja Delivery Cluster'
    },
    'Escalate Incident': {
      title: 'Escalate Incident to Tier 2',
      color: '#ef4444',
      desc: 'Trigger automatic page to Regional Operations Director and unlock manual dispatch override.',
      btnLabel: 'Escalate Now',
      target: 'Priority: P1 Urgent Operations'
    },
    'More Actions': {
      title: 'Marketplace Operations Controls',
      color: '#00e676',
      desc: 'Access advanced geofencing, dynamic rider commission recalculation, and emergency store offline overrides.',
      btnLabel: 'Access Console',
      target: 'Access Level: Executive Super Admin'
    }
  }[actionType] || {
    title: actionType,
    color: '#00e676',
    desc: 'Execute administrative action on marketplace live systems.',
    btnLabel: 'Confirm Action',
    target: 'Marketplace All Nodes'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: config.color,
                boxShadow: `0 0 10px ${config.color}`
              }}
            />
            <span className="modal-title">{config.title}</span>
          </div>
          <button className="close-panel-btn" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(0, 230, 118, 0.2)',
                  color: '#00e676',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto'
                }}
              >
                <Check size={24} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '4px' }}>Action Executed Successfully</h3>
              <p style={{ color: '#64748b', fontSize: '11.5px' }}>Marketplace telemetry updated in real time.</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '14px' }}>
                {config.desc}
              </p>

              <div
                style={{
                  background: '#080d14',
                  border: '1px solid #172230',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AlertCircle size={15} style={{ color: config.color, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Target: <strong style={{ color: '#fff' }}>{config.target}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {!success && (
          <div className="modal-footer">
            <button
              onClick={onClose}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: '#0f1622',
                color: '#94a3b8',
                fontSize: '11.5px',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: config.color === '#ef4444' ? '#ef4444' : '#00e676',
                color: config.color === '#ef4444' ? '#fff' : '#03140a',
                fontSize: '11.5px',
                fontWeight: 700,
                boxShadow: `0 0 12px ${config.color}55`
              }}
            >
              {config.btnLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
