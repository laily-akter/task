// src/data/mockData.js

export const initialKpis = [
  {
    id: 'orders',
    label: 'Total Orders',
    value: '124,532',
    change: '+12.5%',
    period: 'vs. yesterday',
    trendType: 'positive',
    color: 'green',
    icon: 'ShoppingCart',
    bars: [30, 42, 38, 55, 60, 72, 85, 95]
  },
  {
    id: 'gmv',
    label: 'GMV (Gross Merchandise Value)',
    value: '₦182.4M',
    change: '+18.7%',
    period: 'vs. yesterday',
    trendType: 'positive',
    color: 'orange',
    icon: 'Coins',
    bars: [25, 35, 45, 40, 65, 75, 80, 92]
  },
  {
    id: 'revenue',
    label: 'Revenue (Commission + Fees)',
    value: '₦32.6M',
    change: '+15.3%',
    period: 'vs. yesterday',
    trendType: 'positive',
    color: 'green',
    icon: 'DollarSign',
    bars: [28, 38, 48, 52, 60, 68, 79, 88]
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '89,421',
    change: '+20.1%',
    period: 'vs. yesterday',
    trendType: 'positive',
    color: 'green',
    icon: 'Users',
    bars: [35, 40, 45, 58, 62, 70, 84, 98]
  },
  {
    id: 'restaurants',
    label: 'Active Restaurants',
    value: '6,342',
    change: '+8.9%',
    period: 'vs. yesterday',
    trendType: 'positive',
    color: 'orange',
    icon: 'Store',
    bars: [30, 32, 40, 45, 50, 58, 64, 70]
  }
];

export const viewsList = [
  {
    id: 'ceo',
    name: 'CEO View',
    subtitle: 'Revenue · GMV · Growth · Expansion',
    color: '#00e676',
    bars: [40, 55, 70, 85, 95]
  },
  {
    id: 'ops',
    name: 'Operations View',
    subtitle: 'Delays · Supply · Delivery Performance',
    color: '#f97316',
    bars: [30, 60, 45, 75, 80]
  },
  {
    id: 'support',
    name: 'Support View',
    subtitle: 'Tickets · Complaints · Resolution',
    color: '#3b82f6',
    bars: [25, 40, 55, 65, 70]
  }
];

export const mapRegions = [
  {
    id: 'na',
    name: 'North America',
    orders: '2,412 orders',
    x: '25%',
    y: '32%'
  },
  {
    id: 'sa',
    name: 'South America',
    orders: '3,421 orders',
    x: '34%',
    y: '72%'
  },
  {
    id: 'eu',
    name: 'Europe',
    orders: '4,632 orders',
    x: '49%',
    y: '28%'
  },
  {
    id: 'asia',
    name: 'Asia',
    orders: '12,341 orders',
    x: '74%',
    y: '35%'
  },
  {
    id: 'oceania',
    name: 'Oceania',
    orders: '1,882 orders',
    x: '84%',
    y: '78%'
  }
];

export const initialActivities = [
  {
    id: 1,
    type: 'order_placed',
    category: 'Orders',
    title: 'Now order placed',
    detail: "#213-3449 · Mama's Kitchen (Lagos)",
    time: '2 min ago',
    icon: 'ShoppingCart',
    color: 'green'
  },
  {
    id: 2,
    type: 'order_accepted',
    category: 'Orders',
    title: 'Order accepted',
    detail: '#213-3448 · Driver: Ahmed B. (Abuja)',
    time: '4 min ago',
    icon: 'Store',
    color: 'orange'
  },
  {
    id: 3,
    type: 'out_for_delivery',
    category: 'Partners',
    title: 'Out for delivery',
    detail: '#213-3447 · Customer: Tunde B.',
    time: '7 min ago',
    icon: 'Bike',
    color: 'green'
  },
  {
    id: 4,
    type: 'order_delivered',
    category: 'Orders',
    title: 'Order delivered',
    detail: '#213-3446 · Customer: Yemi A.',
    time: '9 min ago',
    icon: 'Check',
    color: 'green'
  },
  {
    id: 5,
    type: 'delay',
    category: 'System',
    title: 'Ikeja Delivery Delay',
    detail: 'High number of orders causing delivery delays in...',
    time: '12 min ago',
    icon: 'AlertTriangle',
    color: 'red'
  },
  {
    id: 6,
    type: 'restaurant_offline',
    category: 'Restaurants',
    title: 'Restaurant went offline',
    detail: 'Spice House (Abuja)',
    time: '15 min ago',
    icon: 'StoreOff',
    color: 'red'
  }
];

export const topCities = [
  { rank: 1, name: 'Lagos', orders: '48,421', gmv: '₦72.3M', growth: '22.4%', barWidth: '95%' },
  { rank: 2, name: 'Abuja', orders: '32,341', gmv: '₦48.1M', growth: '18.7%', barWidth: '78%' },
  { rank: 3, name: 'Port Harcourt', orders: '11,402', gmv: '₦17.2M', growth: '19.3%', barWidth: '55%' },
  { rank: 4, name: 'Kano', orders: '5,842', gmv: '₦9.8M', growth: '14.5%', barWidth: '38%' },
  { rank: 5, name: 'Ibadan', orders: '5,621', gmv: '₦7.6M', growth: '13.6%', barWidth: '34%' }
];

export const topRestaurants = [
  { rank: 1, name: 'Mama\'s Kitchen', avatar: 'M', avatarBg: '#f97316', orders: '1,842', gmv: '₦4.2M', growth: '26%' },
  { rank: 2, name: 'The Grill House', avatar: 'T', avatarBg: '#3b82f6', orders: '1,421', gmv: '₦3.8M', growth: '22%' },
  { rank: 3, name: 'Chicken Republic', avatar: 'C', avatarBg: '#eab308', orders: '1,122', gmv: '₦2.9M', growth: '18%' },
  { rank: 4, name: 'Spice House', avatar: 'S', avatarBg: '#ef4444', orders: '1,021', gmv: '₦2.6M', growth: '15%' },
  { rank: 5, name: 'Pizza Planet', avatar: 'P', avatarBg: '#f97316', orders: '982', gmv: '₦2.4M', growth: '15%' }
];

export const topPartners = [
  { rank: 1, name: 'Daniel K.', avatar: 'D', deliveries: 48, rating: '4.9', earnings: '₦62,400' },
  { rank: 2, name: 'Ahmed B.', avatar: 'A', deliveries: 45, rating: '4.8', earnings: '₦58,600' },
  { rank: 3, name: 'Chinedu P.', avatar: 'C', deliveries: 43, rating: '4.8', earnings: '₦49,200' },
  { rank: 4, name: 'Yusuf A.', avatar: 'Y', deliveries: 41, rating: '4.7', earnings: '₦44,800' },
  { rank: 5, name: 'James T.', avatar: 'J', deliveries: 39, rating: '4.7', earnings: '₦42,300' }
];

export const hourlyTrends = [
  18, 22, 19, 15, 12, 14, 25, 38, 48, 62, 75, 88, 92, 85, 78, 80, 89, 95, 100, 94, 82, 70, 55, 42
];
