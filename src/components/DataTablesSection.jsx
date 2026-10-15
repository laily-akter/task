import React from 'react';
import { Star } from 'lucide-react';

const citiesData = [
  { rank: 1, name: 'Lagos', orders: '48,421', gmv: '₦72.3M', growth: '22.4%', barWidth: '32px' },
  { rank: 2, name: 'Abuja', orders: '12,341', gmv: '₦18.1M', growth: '18.7%', barWidth: '24px' },
  { rank: 3, name: 'Port Harcourt', orders: '8,402', gmv: '₦12.2M', growth: '19.3%', barWidth: '18px' },
  { rank: 4, name: 'Kano', orders: '5,842', gmv: '₦9.8M', growth: '14.5%', barWidth: '14px' },
  { rank: 5, name: 'Ibadan', orders: '5,621', gmv: '₦7.6M', growth: '13.6%', barWidth: '12px' }
];

const restaurantsData = [
  { rank: 1, name: "Mama's Kitchen", letter: 'M', bg: '#f97316', orders: '1,842', gmv: '₦4.2M', growth: '26%' },
  { rank: 2, name: 'The Grill House', letter: 'T', bg: '#0284c7', orders: '1,421', gmv: '₦3.8M', growth: '22%' },
  { rank: 3, name: 'Chicken Republic', letter: 'C', bg: '#eab308', orders: '1,122', gmv: '₦2.9M', growth: '18%' },
  { rank: 4, name: 'Spice House', letter: 'S', bg: '#ef4444', orders: '1,021', gmv: '₦2.6M', growth: '15%' },
  { rank: 5, name: 'Pizza Planet', letter: 'P', bg: '#ea580c', orders: '982', gmv: '₦2.4M', growth: '15%' }
];

const partnersData = [
  { rank: 1, name: 'Daniel K.', letter: 'D', bg: '#ea580c', deliveries: 48, barWidth: '20px', rating: '4.9', earnings: '₦62,400' },
  { rank: 2, name: 'Ahmed B.', letter: 'A', bg: '#0284c7', deliveries: 45, barWidth: '18px', rating: '4.8', earnings: '₦58,600' },
  { rank: 3, name: 'Chinedu P.', letter: 'C', bg: '#eab308', deliveries: 43, barWidth: '16px', rating: '4.8', earnings: '₦49,200' },
  { rank: 4, name: 'Yusuf A.', letter: 'Y', bg: '#0d9488', deliveries: 41, barWidth: '15px', rating: '4.7', earnings: '₦44,800' },
  { rank: 5, name: 'James T.', letter: 'J', bg: '#ea580c', deliveries: 39, barWidth: '13px', rating: '4.7', earnings: '₦42,300' }
];

export default function DataTablesSection() {
  return (
    <div className="data-tables-row">
      {/* 1. Top Performing Cities */}
      <div className="table-card">
        <div className="table-header-row">
          <h2>Top Performing Cities</h2>
          <button className="table-view-all-pill">View All</button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '20px' }}>#</th>
                <th>City</th>
                <th className="text-right">Orders</th>
                <th className="text-right">GMV</th>
                <th className="text-right">Growth</th>
              </tr>
            </thead>
            <tbody>
              {citiesData.map((c) => (
                <tr key={c.rank}>
                  <td className="table-rank-num">{c.rank}</td>
                  <td>
                    <div className="table-entity-cell">
                      <span>{c.name}</span>
                      <span className="city-indicator-bar" style={{ width: c.barWidth }} />
                    </div>
                  </td>
                  <td className="text-right number-font">{c.orders}</td>
                  <td className="text-right number-font">{c.gmv}</td>
                  <td className="text-right">
                    <span className="growth-pill">{c.growth} ↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Top Performing Restaurants */}
      <div className="table-card">
        <div className="table-header-row">
          <h2>Top Performing Restaurants</h2>
          <button className="table-view-all-pill">View All</button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '20px' }}>#</th>
                <th>Restaurant</th>
                <th className="text-right">Orders</th>
                <th className="text-right">GMV</th>
                <th className="text-right">Growth</th>
              </tr>
            </thead>
            <tbody>
              {restaurantsData.map((r) => (
                <tr key={r.rank}>
                  <td className="table-rank-num">{r.rank}</td>
                  <td>
                    <div className="table-entity-cell">
                      <span
                        className="restaurant-avatar"
                        style={{ background: r.bg, color: '#ffffff' }}
                      >
                        {r.letter}
                      </span>
                      <span className="truncate-text">{r.name}</span>
                    </div>
                  </td>
                  <td className="text-right number-font">{r.orders}</td>
                  <td className="text-right number-font">{r.gmv}</td>
                  <td className="text-right">
                    <span className="growth-pill">{r.growth} ↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Top Delivery Partners */}
      <div className="table-card">
        <div className="table-header-row">
          <h2>Top Delivery Partners</h2>
          <button className="table-view-all-pill">View All</button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '20px' }}>#</th>
                <th>Partner</th>
                <th className="text-right">Deliveries</th>
                <th className="text-right">Rating</th>
                <th className="text-right">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {partnersData.map((p) => (
                <tr key={p.rank}>
                  <td className="table-rank-num">{p.rank}</td>
                  <td>
                    <div className="table-entity-cell">
                      <span
                        className="partner-avatar"
                        style={{ background: p.bg, color: '#ffffff' }}
                      >
                        {p.letter}
                      </span>
                      <span>{p.name}</span>
                      <span className="city-indicator-bar" style={{ width: p.barWidth }} />
                    </div>
                  </td>
                  <td className="text-right number-font">{p.deliveries}</td>
                  <td className="text-right">
                    <div className="rating-star-group">
                      <span>{p.rating}</span>
                      <Star size={9} fill="#f59e0b" color="#f59e0b" />
                    </div>
                  </td>
                  <td className="text-right">
                    <span className="earnings-green-text">{p.earnings}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
