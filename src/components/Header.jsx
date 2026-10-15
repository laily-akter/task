import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  Globe,
  Clock,
  Bell,
  ChevronDown,
  X
} from 'lucide-react';

export default function Header({
  onToggleSidebar,
  activeRegion,
  setActiveRegion,
  selectedView,
  setSelectedView
}) {
  const [currentDateString, setCurrentDateString] = useState('Mon, 20 Jan 2026 14:25 (WAT)');
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const regionRef = useRef(null);
  const viewRef = useRef(null);

  // Live clock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentDateString(`Mon, 20 Jan 2026 ${hours}:${minutes} (WAT)`);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (regionRef.current && !regionRef.current.contains(event.target)) {
        setRegionMenuOpen(false);
      }
      if (viewRef.current && !viewRef.current.contains(event.target)) {
        setViewMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const regions = ['Global', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'North America'];
  const viewTypes = ['CEO View', 'Operations View', 'Support View', 'Expansion View'];

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>
        <div className="header-title-group">
          <h1>Command Center</h1>
          <p>Real-time Marketplace Intelligence · Global Insights</p>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="header-center">
        <div className="search-box">
          <Search size={14} style={{ color: '#4b586e', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search orders, restaurants, customers, partners..."
            aria-label="Search dashboard"
          />
          <span className="search-kbd">⌘K</span>
        </div>
      </div>

      <div className="header-right">
        {/* Mobile Search Toggle Button */}
        <button
          className="header-icon-btn mobile-search-toggle"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          aria-label="Search"
        >
          {mobileSearchOpen ? <X size={15} /> : <Search size={15} />}
        </button>

        {/* Region selector */}
        <div ref={regionRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="pill-dropdown-btn"
            onClick={() => {
              setRegionMenuOpen(!regionMenuOpen);
              setViewMenuOpen(false);
            }}
          >
            <Globe size={13} style={{ color: '#00e676', flexShrink: 0 }} />
            <span className="pill-dropdown-label">{activeRegion}</span>
            <ChevronDown size={12} style={{ color: '#64748b', flexShrink: 0 }} />
          </button>

          {regionMenuOpen && (
            <div className="dropdown-menu-card dropdown-menu-right">
              {regions.map((reg) => (
                <div
                  key={reg}
                  className={`dropdown-menu-item ${activeRegion === reg ? 'active' : ''}`}
                  onClick={() => {
                    setActiveRegion(reg);
                    setRegionMenuOpen(false);
                  }}
                >
                  {reg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time display */}
        <div className="header-time">
          <Clock size={13} style={{ color: '#64748b', flexShrink: 0 }} />
          <span>{currentDateString}</span>
        </div>

        {/* Notification button */}
        <button className="header-icon-btn" aria-label="Notifications">
          <Bell size={15} />
          <span className="notification-badge-dot"></span>
        </button>

        {/* User avatar & View Dropdown */}
        <div ref={viewRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="header-user-btn"
            onClick={() => {
              setViewMenuOpen(!viewMenuOpen);
              setRegionMenuOpen(false);
            }}
          >
            <div className="user-avatar-wrap">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Profile"
                className="user-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="user-avatar-fallback" style={{ display: 'none' }}>
                CC
              </div>
              <span className="user-online-dot" />
            </div>
            <div className="user-info-text">
              <div className="user-name-title">{selectedView}</div>
              <div className="user-role-title">Revenue · Growth</div>
            </div>
            <ChevronDown size={12} style={{ color: '#64748b', flexShrink: 0 }} />
          </button>

          {viewMenuOpen && (
            <div className="dropdown-menu-card dropdown-menu-right" style={{ width: '165px' }}>
              {viewTypes.map((v) => (
                <div
                  key={v}
                  className={`dropdown-menu-item ${selectedView === v ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedView(v);
                    setViewMenuOpen(false);
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Mobile Search Box */}
      {mobileSearchOpen && (
        <div className="mobile-search-bar">
          <Search size={14} style={{ color: '#4b586e', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search orders, restaurants, partners..."
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
