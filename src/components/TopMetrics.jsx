import React from 'react';
import {
  ShoppingCart,
  Coins,
  DollarSign,
  Users,
  Store,
  TrendingUp
} from 'lucide-react';

const iconMap = {
  ShoppingCart: ShoppingCart,
  Coins: Coins,
  DollarSign: DollarSign,
  Users: Users,
  Store: Store
};

function MiniBarSparkline({ bars = [], color = '#00e676' }) {
  const maxVal = Math.max(...bars, 100);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '22px' }}>
      {bars.map((val, idx) => {
        const heightPct = (val / maxVal) * 100;
        return (
          <div
            key={idx}
            style={{
              width: '3.5px',
              height: `${heightPct}%`,
              background: color,
              borderRadius: '1px',
              opacity: 0.4 + (idx / bars.length) * 0.6
            }}
          />
        );
      })}
    </div>
  );
}

export default function TopMetrics({ kpis }) {
  return (
    <div className="top-metrics-grid-5">
      {kpis.map((kpi) => {
        const IconComponent = iconMap[kpi.icon] || TrendingUp;
        const isGreen = kpi.color === 'green';
        const colorHex = isGreen ? '#00e676' : '#f97316';

        return (
          <div key={kpi.id} className="kpi-card">
            <div className="kpi-card-header">
              <div className={`kpi-icon-circle ${kpi.color}`}>
                <IconComponent size={14} />
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div className="kpi-label" title={kpi.label}>{kpi.label}</div>
              </div>
            </div>

            <div className="kpi-value-row">
              <div>
                <div className="kpi-value">{kpi.value}</div>
                <div className={`kpi-trend ${kpi.color}`}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp size={11} style={{ marginRight: '2px' }} />
                    {kpi.change}
                  </span>
                  <span className="kpi-trend-sub">{kpi.period}</span>
                </div>
              </div>

              <div style={{ paddingBottom: '2px' }}>
                <MiniBarSparkline bars={kpi.bars} color={colorHex} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
