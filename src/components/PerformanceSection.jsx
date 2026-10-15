import React from 'react';
import { hourlyTrends } from '../data/mockData';

export default function PerformanceSection({ onOpenDetails }) {
  const trendRange = 'Last 24 Hours';

  // Exact 6 performance metrics from screenshot
  const performanceStats = [
    {
      title: 'Orders',
      value: '124,532',
      change: '12.5%',
      barColor: 'green',
      bars: [25, 45, 65, 85, 100]
    },
    {
      title: 'GMV',
      value: '₦182.4M',
      change: '18.7%',
      barColor: 'orange',
      bars: [25, 45, 65, 85, 100]
    },
    {
      title: 'Revenue',
      value: '₦32.6M',
      change: '15.3%',
      barColor: 'green',
      bars: [25, 45, 65, 85, 100]
    },
    {
      title: 'Customers',
      value: '89,421',
      change: '20.1%',
      barColor: 'green',
      bars: [25, 45, 65, 85, 100]
    },
    {
      title: 'Restaurants',
      value: '6,342',
      change: '8.9%',
      barColor: 'orange',
      bars: [25, 45, 65, 85, 100]
    },
    {
      title: 'Partners',
      value: '2,841',
      change: '14.2%',
      barColor: 'green',
      bars: [25, 45, 65, 85, 100]
    }
  ];

  // Exact 5 health indicators matching screenshot
  const healthIndicators = [
    { label: 'Supply & Demand Balance', value: '98%', color: '#00e676' },
    { label: 'Delivery Performance', value: '91%', color: '#f97316' },
    { label: 'Customer Satisfaction', value: '94%', color: '#00e676' },
    { label: 'Restaurant Availability', value: '90%', color: '#00e676' },
    { label: 'System Health', value: '96%', color: '#00e676' }
  ];

  const maxTrend = Math.max(...hourlyTrends);

  return (
    <div className="mid-metrics-row">
      {/* 1. Today's Performance Card */}
      <div className="performance-panel">
        <div className="panel-header-simple">
          <h2>Today's Performance</h2>
          <div className="tiny-filter-btn">
            <span>Today</span>
          </div>
        </div>

        <div className="performance-stats-grid">
          {performanceStats.map((stat, idx) => (
            <div key={idx} className="perf-stat-col">
              <span className="perf-stat-title">{stat.title}</span>
              <span className="perf-stat-number">{stat.value}</span>
              <span className="perf-stat-change">
                ↑ {stat.change}
              </span>

              {/* Mini vertical indicator bars under each metric */}
              <div className="perf-mini-bar">
                {stat.bars.map((barVal, bIdx) => (
                  <div
                    key={bIdx}
                    className={`mini-bar-stick ${stat.barColor === 'green' ? 'active-green' : 'active-orange'}`}
                    style={{
                      height: `${(barVal / 100) * 16}px`,
                      opacity: 0.45 + (bIdx / stat.bars.length) * 0.55
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Order Trends Card */}
      <div className="trends-panel">
        <div className="panel-header-simple">
          <h2>Order Trends</h2>
            <div className="tiny-filter-btn">
              <span>{trendRange}</span>
            </div>
        </div>

        <div className="trends-number-row">
          <div className="trends-big-num">124,532</div>
          <div className="trends-change-text">
            <span>↑ 12.5%</span>
            <span style={{ color: '#4b586e', marginLeft: '4px', fontWeight: 400 }}>vs previous day</span>
          </div>
        </div>

        {/* 24-Hour Glowing Green Gradient Bars */}
        <div className="trends-bar-chart">
          {hourlyTrends.map((val, idx) => {
            const heightPct = (val / maxTrend) * 100;
            return (
              <div
                key={idx}
                className="trend-bar-col"
                style={{
                  height: `${heightPct}%`,
                  opacity: 0.35 + (heightPct / 100) * 0.65
                }}
                title={`Hour ${idx}:00 - ${val * 125} orders`}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Marketplace Health Score Card */}
      <div className="health-panel">
        <div className="panel-header-simple">
          <h2>Marketplace Health Score</h2>
          <button
            className="tiny-view-details-btn"
            onClick={onOpenDetails}
          >
            <span>View Details</span>
          </button>
        </div>

        <div className="health-body-row">
          {/* Glowing Semi-Circle Speedometer Gauge Matching Screenshot */}
          <div className="health-gauge-box">
            <svg width="86" height="60" viewBox="0 0 86 60" className="gauge-svg-semicircle">
              <defs>
                <linearGradient id="healthArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e676" />
                  <stop offset="85%" stopColor="#00e676" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Background Arc: Emerald / Forest Green Track (#10b981) from 180° to 0° */}
              <path
                d="M 13,48 A 30,30 0 0,1 73,48"
                fill="none"
                stroke="#10b981"
                strokeWidth="9"
                strokeLinecap="butt"
              />

              {/* Glowing Active Arc: Neon Lime (#00e676) covering 92% of the arch */}
              <path
                d="M 13,48 A 30,30 0 0,1 73,48"
                fill="none"
                stroke="url(#healthArcGradient)"
                strokeWidth="9"
                strokeDasharray={`${Math.PI * 30 * 0.92} ${Math.PI * 30}`}
                strokeLinecap="butt"
                filter="drop-shadow(0 0 5px rgba(0, 230, 118, 0.5))"
              />

              {/* Baseline Border Under Gauge Arch */}
              <line x1="8" y1="52" x2="78" y2="52" stroke="#1f3044" strokeWidth="1.5" />
              <line x1="13" y1="49" x2="13" y2="55" stroke="#253a52" strokeWidth="1.5" />
              <line x1="73" y1="49" x2="73" y2="55" stroke="#253a52" strokeWidth="1.5" />

              {/* Perfectly Centered 92% Score & Verdict in SVG Space */}
              <text
                x="43"
                y="33"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize="14.5"
                fontWeight="800"
                fontFamily="var(--font-sans)"
                letterSpacing="-0.5px"
              >
                92%
              </text>
              <text
                x="43"
                y="43.5"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#00e676"
                fontSize="7.5"
                fontWeight="700"
                fontFamily="var(--font-sans)"
                letterSpacing="0.2px"
              >
                Excellent
              </text>
            </svg>
          </div>

          {/* Indicators List with structured row borders */}
          <div className="health-indicators-list">
            {healthIndicators.map((ind, i) => (
              <div key={i} className="health-ind-row">
                <span className="ind-name">
                  <span className="ind-dot" style={{ background: ind.color }} />
                  {ind.label}
                </span>
                <span className="ind-value">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
