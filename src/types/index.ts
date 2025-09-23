
export interface Sensor {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  status: 'online' | 'offline' | 'maintenance';
  lastReading: {
    co2: number;
    timestamp: string;
  };
}

export interface Co2Reading {
  sensorId: string;
  value: number;
  timestamp: string;
}

export interface CarbonOffset {
  id: string;
  date: string;
  amount: number;
  project: string;
  status: 'verified' | 'pending' | 'rejected';
}

export interface DashboardStats {
  totalCo2Reduced: number;
  activeSensors: number;
  totalProjects: number;
  carbonNeutralProgress: number;
}
