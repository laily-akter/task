import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, ArrowRight } from 'lucide-react';

export default function AskZanAiModal({ isOpen, onClose, initialQuery }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello, Chief! I have analyzed the operational flow. Ikeja Zone is currently experiencing a +45% lunch hour surge. Would you like me to deploy 25 reserved fleet units or initiate a temporary surge incentive?'
    }
  ]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!query.trim()) return;
    const userText = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Action executed for "${userText}". Marketplace parameters adjusted. Order wait time forecasted to normalize to 18 mins by 13:45.`
        }
      ]);
    }, 600);
  };

  const samplePrompts = [
    'Deploy additional partners in Ikeja',
    'Calculate revenue impact of current delay',
    'Run 10% promo for Victoria Island customers'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#00e676', display: 'flex' }}>
              <Sparkles size={16} />
            </span>
            <span className="modal-title">ZanAI Copilot</span>
            <span className="ai-chip">Live Intelligence</span>
          </div>
          <button className="close-panel-btn" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {m.sender === 'ai' && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0, 230, 118, 0.2)',
                      border: '1px solid #00e676',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00e676',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={13} />
                  </div>
                )}
                <div
                  style={{
                    background: m.sender === 'user' ? '#00e676' : '#141e2b',
                    color: m.sender === 'user' ? '#03140a' : '#e2e8f0',
                    fontWeight: m.sender === 'user' ? 600 : 400,
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '11.5px',
                    lineHeight: '1.4',
                    border: m.sender === 'user' ? 'none' : '1px solid #233347'
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px' }}>Suggested Actions:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  style={{
                    textAlign: 'left',
                    padding: '5px 8px',
                    background: '#090e15',
                    border: '1px solid #1a2737',
                    borderRadius: '6px',
                    fontSize: '10.5px',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => {
                    setQuery(p);
                  }}
                >
                  <span>{p}</span>
                  <ArrowRight size={11} style={{ color: '#00e676' }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ padding: '8px 12px' }}>
          <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask ZanAI anything about operations, supply or revenue..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: '#070b10',
                border: '1px solid #1a2737',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '11.5px',
                color: '#fff'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#00e676',
                color: '#03140a',
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '11.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Send size={12} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
