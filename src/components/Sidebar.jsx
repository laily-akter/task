import React from 'react';
import {
  Home,
  ShieldCheck,
  Box,
  Store,
  ShoppingCart,
  Users,
  TrendingUp,
  CreditCard,
  Award,
  ShieldAlert,
  Zap,
  BarChart2,
  Sliders,
  ChevronRight,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

const navItems = [
  { id: 'command-center', label: 'Command Center', icon: Home, active: true },
  { id: 'executive', label: 'Executive', icon: ShieldCheck },
  { id: 'marketplace-ops', label: 'Marketplace Operations', icon: Box, hasSubmenu: true },
  { id: 'restaurants', label: 'Restaurants', icon: Store },
  { id: 'delivery-partners', label: 'Delivery Partners', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'growth', label: 'Growth & Activation', icon: TrendingUp },
  { id: 'finance', label: 'Finance & Payments', icon: CreditCard },
  { id: 'loyalty', label: 'Loyalty & Benefits', icon: Award },
  { id: 'trust-safety', label: 'Trust & Safety', icon: ShieldAlert },
  { id: 'ai-analytics', label: 'AI & Analytics', icon: Zap },
  { id: 'reports', label: 'Reports', icon: BarChart2 },
  { id: 'system-admin', label: 'System Administration', icon: Sliders, hasSubmenu: true },
];

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab, onOpenZanAi }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-top-section">
        {/* Brand Logo & Mobile Close Row */}
        <div className="sidebar-brand-row">
          <div className="sidebar-brand">
            <div className="brand-logo-icon">
              <Zap size={14} fill="#00e676" color="#00e676" />
            </div>
            <div className="brand-text-col">
              <span className="brand-title">ZanMarket</span>
              <span className="brand-badge-pro">PRO</span>
            </div>
          </div>
          <button
            className="sidebar-close-mobile-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
              >
                <div className="nav-item-content">
                  <Icon size={15} />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && !isActive && (
                  <ChevronRight size={12} className="submenu-chevron" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-ai-card">
        <div className="ai-card-title">
          <span className="ai-card-icon">
            <Zap size={13} fill="#00e676" />
          </span>
          <span>ZanAI Assistant</span>
        </div>
        <p className="ai-card-desc">
          Get insights, generate reports, or take action.
        </p>
        <button
          type="button"
          className="ai-card-btn"
          onClick={() => {
            if (onOpenZanAi) onOpenZanAi();
            if (onClose) onClose();
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} />
            Ask ZanAI
          </span>
          <ArrowRight size={11} />
        </button>
      </div>
    </aside>
  );
}
