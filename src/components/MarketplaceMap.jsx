import React, { useState, useMemo } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';

// Reusable SVG Starburst Lens Flare Component matching exact screenshot flares
function StarburstFlare({ cx, cy, scale = 1 }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      {/* Outer ambient golden atmospheric glow */}
      <circle cx="0" cy="0" r="55" fill="url(#starburstAmbient)" opacity="0.8" />
      <circle cx="0" cy="0" r="28" fill="url(#starburstAmbient)" opacity="0.95" />

      {/* Horizontal brilliant lens flare ray */}
      <ellipse cx="0" cy="0" rx="95" ry="1.6" fill="#ffffff" opacity="0.95" filter="url(#flareBlur)" />
      <ellipse cx="0" cy="0" rx="150" ry="3.2" fill="#facc15" opacity="0.6" filter="url(#flareBlur)" />

      {/* Vertical brilliant lens flare ray */}
      <ellipse cx="0" cy="0" rx="1.6" ry="48" fill="#ffffff" opacity="0.9" filter="url(#flareBlur)" />
      <ellipse cx="0" cy="0" rx="3.2" ry="75" fill="#facc15" opacity="0.5" filter="url(#flareBlur)" />

      {/* Diagonal rays (45 deg) */}
      <g transform="rotate(45)">
        <ellipse cx="0" cy="0" rx="75" ry="1.4" fill="#fef08a" opacity="0.75" />
      </g>
      <g transform="rotate(-45)">
        <ellipse cx="0" cy="0" rx="75" ry="1.4" fill="#fef08a" opacity="0.75" />
      </g>

      {/* Secondary diagonal micro rays */}
      <g transform="rotate(22.5)">
        <ellipse cx="0" cy="0" rx="50" ry="1.1" fill="#facc15" opacity="0.5" />
      </g>
      <g transform="rotate(-22.5)">
        <ellipse cx="0" cy="0" rx="50" ry="1.1" fill="#facc15" opacity="0.5" />
      </g>
      <g transform="rotate(67.5)">
        <ellipse cx="0" cy="0" rx="45" ry="1.1" fill="#facc15" opacity="0.5" />
      </g>
      <g transform="rotate(-67.5)">
        <ellipse cx="0" cy="0" rx="45" ry="1.1" fill="#facc15" opacity="0.5" />
      </g>

      {/* Starburst spoke lines */}
      {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((deg, idx) => (
        <line
          key={idx}
          x1={-Math.cos((deg * Math.PI) / 180) * (25 + (idx % 3) * 12)}
          y1={-Math.sin((deg * Math.PI) / 180) * (25 + (idx % 3) * 12)}
          x2={Math.cos((deg * Math.PI) / 180) * (25 + (idx % 3) * 12)}
          y2={Math.sin((deg * Math.PI) / 180) * (25 + (idx % 3) * 12)}
          stroke="#fde047"
          strokeWidth={idx % 2 === 0 ? '1.2' : '0.7'}
          opacity="0.7"
        />
      ))}

      {/* Central bright golden/white core */}
      <circle cx="0" cy="0" r="8" fill="#fef08a" opacity="0.95" />
      <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
    </g>
  );
}

export default function MarketplaceMap({ activeTab, onTabChange }) {
  const [layersMenuOpen, setLayersMenuOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayers, setActiveLayers] = useState({
    liveDelivery: true,
    demandPrediction: true,
    supplyRisk: true,
    geofence: true,
    restaurants: true,
    deliveryPartners: true,
  });

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['Global', 'Country', 'State', 'City', 'Zone'];

  const layerOptions = [
    { key: 'liveDelivery', label: 'Live Delivery' },
    { key: 'demandPrediction', label: 'Demand Prediction' },
    { key: 'supplyRisk', label: 'Supply Risk' },
    { key: 'geofence', label: 'Geofence' },
    { key: 'restaurants', label: 'Restaurants' },
    { key: 'deliveryPartners', label: 'Delivery Partners' },
  ];

  // Pre-calculate real world continent outlines using Equirectangular projection
  const countryPaths = useMemo(() => {
    const projection = geoEquirectangular()
      .scale(150)
      .translate([460, 205]);

    const pathGenerator = geoPath().projection(projection);
    const countriesGeo = feature(worldData, worldData.objects.countries);

    return countriesGeo.features.map((feat) => ({
      id: feat.id,
      d: pathGenerator(feat),
    }));
  }, []);

  // Golden Plexus Network Edges matching exact screenshot mesh
  const plexusEdges = [
    // North America network
    [150, 145, 180, 185],
    [180, 185, 240, 145],
    [180, 185, 215, 220],
    [150, 145, 205, 110],
    [205, 110, 240, 145],
    [240, 145, 275, 120],
    [275, 120, 265, 175],
    [240, 145, 265, 175],
    [215, 220, 265, 175],

    // South America network
    [215, 220, 265, 310],
    [265, 310, 320, 275],
    [320, 275, 335, 345],
    [265, 310, 305, 385],
    [305, 385, 335, 345],

    // Europe & West Eurasia network
    [410, 95, 455, 125],
    [455, 125, 510, 90],
    [510, 90, 545, 120],
    [455, 125, 545, 120],
    [545, 120, 625, 145],
    [510, 90, 595, 95],
    [595, 95, 625, 145],

    // Central & East Asia
    [625, 145, 665, 205],
    [625, 145, 715, 135],
    [715, 135, 765, 140],
    [715, 135, 665, 205],
    [665, 205, 765, 140],
    [765, 140, 815, 150],
    [665, 205, 735, 250],
    [735, 250, 780, 325],

    // Africa interior network
    [440, 170, 485, 210],
    [485, 210, 545, 250],
    [485, 210, 490, 290],
    [490, 290, 535, 360],
    [545, 250, 535, 360],

    // Oceania network
    [735, 250, 780, 325],
    [780, 325, 835, 320],
    [780, 325, 810, 370],
    [835, 320, 810, 370],
  ];

  // Neon-green scatter dots across the oceans (matching screenshot)
  const greenScatterDots = [
    // North Atlantic route
    [165, 145], [185, 158], [215, 168], [235, 182], [265, 194], [285, 208], [315, 218], [335, 232], [365, 248],
    // South Atlantic
    [265, 285], [295, 315], [325, 335], [355, 355],
    // Indian ocean
    [595, 275], [625, 295], [655, 312], [685, 328],
    // Pacific West & East
    [75, 215], [90, 245], [115, 275], [135, 305],
    [855, 175], [875, 205], [845, 235],
  ];

  return (
    <div className="map-panel">
      {/* Header */}
      <div className="map-header">
        <div className="map-title-group">
          <h2>Global Marketplace Map</h2>
          <p>Live orders, supply, demand and operations across all markets.</p>
        </div>

        <div className="map-filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`map-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <div className="map-canvas-container" style={{ background: '#02070e' }}>
        {/* Left Map Overlay: Map Layers Card + High-Visibility Zoom Controls */}
        <div className="map-left-overlay">
          {/* Map Layers Card */}
          <div className="map-layers-card">
            <button
              type="button"
              className="map-layers-header-btn"
              onClick={() => setLayersMenuOpen(!layersMenuOpen)}
            >
              <span>Map Layers</span>
              <ChevronDown
                size={11}
                style={{
                  color: '#94a3b8',
                  transform: layersMenuOpen ? 'none' : 'rotate(-90deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {layersMenuOpen && (
              <div className="map-layers-items-list">
                {layerOptions.map((opt) => (
                  <div
                    key={opt.key}
                    className="layer-item-row"
                    onClick={() => toggleLayer(opt.key)}
                  >
                    <div className={`layer-checkbox-custom ${activeLayers[opt.key] ? 'checked' : 'unchecked'}`} />
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* High Visibility Zoom Controls (Clear +, -, and center dot buttons) */}
          <div className="map-zoom-controls">
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.8))}
              title="Zoom In"
              aria-label="Zoom In"
            >
              <Plus size={13} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.8))}
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <Minus size={13} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel(1)}
              title="Reset View"
              aria-label="Reset View"
            >
              <div className="zoom-dot-center" />
            </button>
          </div>
        </div>

        {/* Scaled Interactive SVG Map Area */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 920 440"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              {/* Starburst Ambient Soft Glow */}
              <radialGradient id="starburstAmbient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Glowing Orb Filter */}
              <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Flare Blur Filter */}
              <filter id="flareBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Real World Continent Landmass */}
            <g className="world-countries-group">
              {countryPaths.map((country, idx) => (
                <path
                  key={country.id || idx}
                  d={country.d}
                  fill="#040b12"
                  stroke="#b48328"
                  strokeWidth="0.75"
                  strokeOpacity="0.5"
                />
              ))}
            </g>

            {/* 2. Golden Triangulated Plexus Lines Across Continents */}
            <g stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.55">
              {plexusEdges.map(([x1, y1, x2, y2], idx) => (
                <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
            </g>

            {/* Plexus Golden Node Dots */}
            <g fill="#fde047" opacity="0.85">
              {plexusEdges.map(([x1, y1], idx) => (
                <circle key={idx} cx={x1} cy={y1} r="1.5" />
              ))}
            </g>

            {/* 3. Golden Dashed Flight Trajectory Arcs */}
            <g fill="none" stroke="#f59e0b" strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.7">
              {/* North America to Europe */}
              <path d="M 240,145 Q 350,65 455,125" />
              {/* North America to South America */}
              <path d="M 180,185 Q 215,245 265,310" />
              {/* Europe to Central Eurasia */}
              <path d="M 455,125 Q 540,85 625,145" />
              {/* Central Eurasia to Oceania */}
              <path d="M 665,205 Q 735,260 780,325" />
            </g>

            {/* 4. Scattered Neon Green Data Dots Across Oceans */}
            <g fill="#00e676" filter="url(#orbGlow)">
              {greenScatterDots.map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="2" opacity="0.85" />
              ))}
            </g>

            {/* 5. BRILLIANT GOLDEN STARBURST LENS FLARES (Matching exact screenshot) */}
            {/* North America Flare */}
            <StarburstFlare cx={240} cy={145} scale={1.0} />

            {/* Europe / West Eurasia Flare */}
            <StarburstFlare cx={545} cy={120} scale={1.1} />

            {/* Central Eurasia Massive Flare */}
            <StarburstFlare cx={625} cy={145} scale={1.3} />

            {/* South America Flare */}
            <StarburstFlare cx={320} cy={275} scale={0.9} />

            {/* 6. COLORED GLOWING ORBS WITH DIRECT LOCKED LABELS */}
            {/* North America: Neon Green Orb & Label */}
            <g transform="translate(180, 185)">
              <circle cx="0" cy="0" r="14" fill="#00e676" opacity="0.35" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="5.5" fill="#00e676" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
              <text x="16" y="-2" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">North America</text>
              <text x="16" y="11" fill="#cbd5e1" fontSize="9.5" fontWeight="500" fontFamily="var(--font-sans)">2,421 orders</text>
            </g>

            {/* Europe: Orange Orb & Label */}
            <g transform="translate(455, 125)">
              <circle cx="0" cy="0" r="14" fill="#f97316" opacity="0.35" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="5.5" fill="#f97316" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
              <text x="16" y="-2" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Europe</text>
              <text x="16" y="11" fill="#cbd5e1" fontSize="9.5" fontWeight="500" fontFamily="var(--font-sans)">4,832 orders</text>
            </g>

            {/* South America: Orange Orb & Label */}
            <g transform="translate(265, 310)">
              <circle cx="0" cy="0" r="14" fill="#f97316" opacity="0.35" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="5.5" fill="#f97316" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
              <text x="16" y="-2" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">South America</text>
              <text x="16" y="11" fill="#cbd5e1" fontSize="9.5" fontWeight="500" fontFamily="var(--font-sans)">3,421 orders</text>
            </g>

            {/* Asia: Bright Cyan/Blue Orb & Label */}
            <g transform="translate(665, 205)">
              <circle cx="0" cy="0" r="14" fill="#0284c7" opacity="0.4" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="5.5" fill="#0284c7" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
              <text x="16" y="-2" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Asia</text>
              <text x="16" y="11" fill="#cbd5e1" fontSize="9.5" fontWeight="500" fontFamily="var(--font-sans)">12,341 orders</text>
            </g>

            {/* Oceania: Bright Cyan/Blue Orb & Label */}
            <g transform="translate(780, 325)">
              <circle cx="0" cy="0" r="14" fill="#0284c7" opacity="0.4" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="5.5" fill="#0284c7" filter="url(#orbGlow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
              <text x="16" y="-2" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Oceania</text>
              <text x="16" y="11" fill="#cbd5e1" fontSize="9.5" fontWeight="500" fontFamily="var(--font-sans)">1,882 orders</text>
            </g>
          </svg>

          {/* 7. AFRICA HIGHLIGHT CARD (Exact match to screenshot) */}
          <div className="map-africa-card">
            <div className="africa-card-header">
              <span className="africa-diamond" />
              <span className="africa-title">Africa</span>
            </div>

            <div className="africa-orders-count">
              89,532 orders
            </div>

            <div className="africa-country-row">
              <div className="africa-country-name">
                <span className="africa-dot" />
                <span>Nigeria</span>
              </div>
              <span className="africa-country-orders">78,451</span>
            </div>

            <div className="africa-country-row">
              <div className="africa-country-name">
                <span className="africa-dot" />
                <span>Ghana</span>
              </div>
              <span className="africa-country-orders">11,101</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend matching exact screenshot */}
      <div className="map-footer-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#00e676' }} />
          <span>Live Orders</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#f97316' }} />
          <span>High Demand</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#0284c7' }} />
          <span>Active Restaurants</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#00e676' }} />
          <span>Online Partners</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#ef4444' }} />
          <span>Delay / Issue</span>
        </div>
      </div>
    </div>
  );
}
