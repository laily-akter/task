import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopMetrics from './components/TopMetrics';
import ViewSwitcher from './components/ViewSwitcher';
import ZanAiBanner from './components/ZanAiBanner';
import MarketplaceMap from './components/MarketplaceMap';
import LiveActivityFeed from './components/LiveActivityFeed';
import IncidentPanel from './components/IncidentPanel';
import PerformanceSection from './components/PerformanceSection';
import DataTablesSection from './components/DataTablesSection';
import QuickActionsBar from './components/QuickActionsBar';
import AskZanAiModal from './components/AskZanAiModal';
import QuickActionModal from './components/QuickActionModal';
import { initialKpis } from './data/mockData';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('command-center');
  const [activeRegion, setActiveRegion] = useState('Global');
  const [selectedView, setSelectedView] = useState('CEO View');
  const [mapTab, setMapTab] = useState('Global');

  // Interactive Modals State
  const [zanAiOpen, setZanAiOpen] = useState(false);
  const [zanAiQuery, setZanAiQuery] = useState('');
  const [quickActionModal, setQuickActionModal] = useState({ isOpen: false, actionType: null });
  const [incidentOpen, setIncidentOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenZanAi = (initialPrompt = '') => {
    setZanAiQuery(initialPrompt);
    setZanAiOpen(true);
  };

  const handleQuickAction = (actionName) => {
    setQuickActionModal({ isOpen: true, actionType: actionName });
  };

  const handleConfirmQuickAction = (actionName) => {
    showToast(`✓ Action executed successfully: ${actionName}`);
  };

  return (
    <div className="dashboard-layout">
      {/* MOBILE BACKDROP OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar backdrop"
        />
      )}

      {/* 1. FIXED LEFT SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeNav}
        setActiveTab={(id) => {
          setActiveNav(id);
          setSidebarOpen(false);
        }}
        onOpenZanAi={() => handleOpenZanAi('Provide an executive summary of current operations')}
      />

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <div className="main-wrapper">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />

        <main className="content-body">
          {/* MASTER 2-COLUMN LAYOUT */}
          <div className="master-grid-container">
            {/* LEFT / CENTER INTELLIGENCE AREA */}
            <div className="left-intelligence-col">
              {/* Top 5 KPI Cards */}
              <TopMetrics kpis={initialKpis} />

              {/* ZanAI Insight Recommendation Banner */}
              <ZanAiBanner
                onOpenInsight={() =>
                  handleOpenZanAi('Recommend optimal courier allocation in Lagos for 5PM - 9PM')
                }
              />

              {/* Map + Live Activity Feed Row */}
              <div className="map-and-feed-row">
                <MarketplaceMap
                  activeTab={mapTab}
                  onTabChange={(tab) => setMapTab(tab)}
                />

                <LiveActivityFeed />
              </div>

              {/* Mid Section: Today's Performance + Order Trends + Marketplace Health Score */}
              <PerformanceSection
                onOpenDetails={() =>
                  handleOpenZanAi('Break down Marketplace Health Score factors and recommended optimizations')
                }
              />

              {/* Lower Section: 3 Top Performing Data Tables */}
              <DataTablesSection />
            </div>

            {/* RIGHT COLUMN: VIEW SWITCHER + INCIDENT DETAILS */}
            <div className="right-panel-col">
              {/* 3 Views Switcher */}
              <ViewSwitcher
                activeView={selectedView}
                onSelectView={(viewName) => {
                  setSelectedView(viewName);
                  showToast(`Switched to ${viewName}`);
                }}
              />

              {/* Incident Details Panel */}
              {incidentOpen ? (
                <IncidentPanel
                  onClose={() => setIncidentOpen(false)}
                  onResolve={() => {
                    showToast('✓ Incident INC-20260120-0047 marked as Resolved');
                  }}
                />
              ) : (
                <div className="incident-minimized-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#f59e0b', fontWeight: 600 }}>
                    <AlertTriangle size={15} />
                    <span>1 Incident Logged</span>
                  </div>
                  <p style={{ margin: '6px 0 10px 0', fontSize: '10.5px' }}>
                    Ikeja Delivery Delay (Resolved)
                  </p>
                  <button
                    className="reopen-incident-btn"
                    onClick={() => setIncidentOpen(true)}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 3. FIXED BOTTOM QUICK ACTIONS BAR */}
      <QuickActionsBar onAction={handleQuickAction} />

      {/* 4. INTERACTIVE MODALS */}
      <AskZanAiModal
        isOpen={zanAiOpen}
        onClose={() => setZanAiOpen(false)}
        initialQuery={zanAiQuery}
      />

      <QuickActionModal
        isOpen={quickActionModal.isOpen}
        actionType={quickActionModal.actionType}
        onClose={() => setQuickActionModal({ isOpen: false, actionType: null })}
        onConfirm={handleConfirmQuickAction}
      />

      {/* 5. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={15} color="#00e676" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
