import { Sensor, Co2Reading, CarbonOffset, DashboardStats } from '@/types';

// CO2 Sensors - focused only on carbon dioxide monitoring
export const mockSensors: Sensor[] = [
  {
    id: 'co2-sensor-001',
    name: 'Forest CO₂ Monitor',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco Forest Conservation Area'
    },
    status: 'online',
    lastReading: {
      co2: 412,
      timestamp: new Date(Date.now() - 300000).toISOString()
    }
  },
  {
    id: 'co2-sensor-002',
    name: 'Urban CO₂ Tracker',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      name: 'Central Park Reforestation Zone'
    },
    status: 'online',
    lastReading: {
      co2: 432,
      timestamp: new Date(Date.now() - 120000).toISOString()
    }
  },
  {
    id: 'co2-sensor-003',
    name: 'Wind Farm CO₂ Monitor',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      name: 'Lake Michigan Wind Project'
    },
    status: 'maintenance',
    lastReading: {
      co2: 405,
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  },
  {
    id: 'co2-sensor-004',
    name: 'Carbon Capture CO₂ Sensor',
    location: {
      lat: 39.7392,
      lng: -104.9903,
      name: 'Rocky Mountain Carbon Facility'
    },
    status: 'offline',
    lastReading: {
      co2: 398,
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  },
  {
    id: 'co2-sensor-005',
    name: 'Coastal Restoration CO₂ Monitor',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: 'Santa Monica Marine Conservation'
    },
    status: 'online',
    lastReading: {
      co2: 421,
      timestamp: new Date(Date.now() - 180000).toISOString()
    }
  }
];

// Generate historical CO2 data for the last 7 days
export const generateHistoricalData = (sensorId: string = 'co2-sensor-001'): Co2Reading[] => {
  const data: Co2Reading[] = [];
  const now = Date.now();
  const baseValue = 400 + Math.floor(Math.random() * 30);
  
  for (let i = 0; i < 168; i++) { // 24 hours * 7 days = 168 hours
    const timestamp = new Date(now - (i * 3600000)).toISOString();
    const hourOfDay = new Date(timestamp).getHours();
    
    // Simulate daily cycle with lower CO2 during night and higher during day
    const hourlyVariation = hourOfDay >= 8 && hourOfDay <= 18 ? 15 : 5;
    const value = baseValue + Math.floor(Math.random() * hourlyVariation) - Math.floor(hourlyVariation / 2);
    
    data.push({
      sensorId,
      value,
      timestamp
    });
  }
  return data.reverse(); // Most recent first
};

export const mockOffsets: CarbonOffset[] = [
  {
    id: 'offset-001',
    date: '2023-01-15',
    amount: 25.4,
    project: 'Amazon Rainforest Conservation',
    status: 'verified'
  },
  {
    id: 'offset-002',
    date: '2023-02-28',
    amount: 18.2,
    project: 'Wind Farm Development',
    status: 'verified'
  },
  {
    id: 'offset-003',
    date: '2023-04-10',
    amount: 32.6,
    project: 'Mangrove Restoration',
    status: 'verified'
  },
  {
    id: 'offset-004',
    date: '2023-05-22',
    amount: 15.8,
    project: 'Solar Panel Installation',
    status: 'pending'
  },
  {
    id: 'offset-005',
    date: '2023-06-30',
    amount: 27.3,
    project: 'Ocean Cleanup Initiative',
    status: 'pending'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCo2Reduced: 119.3,
  activeSensors: 4,
  totalProjects: 5,
  carbonNeutralProgress: 68
};

// For backward compatibility
export const mockCarbonOffsets = mockOffsets;
export const mockProgressData = {
  current: mockDashboardStats.carbonNeutralProgress,
  target: 100,
  trend: 'up'
};