import React, { useState } from 'react';
import {
  ShoppingCart,
  Store,
  Bike,
  Check,
  AlertTriangle
} from 'lucide-react';
import { initialActivities } from '../data/mockData';

const iconMap = {
  ShoppingCart: ShoppingCart,
  Store: Store,
  Bike: Bike,
  Check: Check,
  AlertTriangle: AlertTriangle,
  StoreOff: Store
};

export default function LiveActivityFeed() {
  const [filter, setFilter] = useState('All');
  const [activities] = useState(initialActivities);

  const filterTabs = ['All', 'Orders', 'Restaurants', 'Partners', 'System'];

  const filteredActivities = filter === 'All'
    ? activities
    : activities.filter((act) => act.category === filter);

  return (
    <div className="activity-feed-panel">
      {/* Header */}
      <div className="activity-header">
        <h2>
          <span className="live-green-pulse" />
          Live Activity Feed
        </h2>
        <button
          className="activity-view-all-pill"
          onClick={() => setFilter('All')}
        >
          View All
        </button>
      </div>

      {/* Filter Tabs Chips */}
      <div className="activity-filter-chips">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            className={`filter-chip ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="activity-list">
        {filteredActivities.map((act) => {
          const IconComp = iconMap[act.icon] || ShoppingCart;
          const isAlert = act.color === 'red';

          return (
            <div
              key={act.id}
              className={`activity-item ${isAlert ? 'activity-item-alert' : ''}`}
            >
              {/* Solid Vibrant Circular Badge */}
              <div className={`activity-solid-badge ${act.color}`}>
                <IconComp size={12} strokeWidth={2.8} />
              </div>

              {/* Activity Info */}
              <div className="activity-details">
                <div className="activity-title-row">
                  <span className="activity-action-name">{act.title}</span>
                  <span className="activity-time-ago">{act.time}</span>
                </div>
                <div className="activity-sub-desc" title={act.detail}>
                  {act.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
