
import React, { useState } from 'react';
import { GaugeIcon, LeafIcon, TreePineIcon, BarChartIcon } from 'lucide-react';
import CO2Chart from '@/components/dashboard/CO2Chart';
import SensorStatus from '@/components/dashboard/SensorStatus';
import CarbonOffsetTable from '@/components/dashboard/CarbonOffsetTable';
import CarbonCreditsCalculator from '@/components/dashboard/CarbonCreditsCalculator';
import CarbonEmissionCalculator from '@/components/dashboard/CarbonEmissionCalculator';
import TipsCard from '@/components/dashboard/TipsCard';
import { mockSensors, generateHistoricalData } from '@/lib/mockData';
import { useUserData } from '@/contexts/UserDataContext';

const Dashboard: React.FC = () => {
  const { userData } = useUserData();
  // For demo, we'll show data from the first sensor
  const [selectedSensorId] = useState(mockSensors[0].id);
  const sensorData = generateHistoricalData(selectedSensorId);
  
  // Get counts by status
  const onlineSensors = mockSensors.filter(sensor => sensor.status === 'online').length;
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Carbon Impact</h1>
        <p className="text-gray-600 text-lg">
          Track your environmental footprint and make a positive difference 🌱
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <LeafIcon className="h-5 w-5 text-green-600" />
            </div>
            {userData.dashboardStats.totalCo2Reduced > 0 && (
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                +12.5%
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">CO₂ Reduced</h3>
          <p className="text-2xl font-bold text-gray-900">{userData.dashboardStats.totalCo2Reduced} tons</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <GaugeIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Sensors</h3>
          <p className="text-2xl font-bold text-gray-900">{onlineSensors}</p>
          <p className="text-xs text-gray-500 mt-1">{mockSensors.length} total devices</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <TreePineIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{userData.dashboardStats.totalProjects}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <BarChartIcon className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              -2.3%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Current CO₂</h3>
          <p className="text-2xl font-bold text-gray-900">{mockSensors[0].lastReading.co2} PPM</p>
          <p className="text-xs text-gray-500 mt-1">Global avg: 415 PPM</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CO2Chart 
            data={sensorData.slice(0, 48)} 
            title="CO₂ Levels Over Time"
            description="Real-time monitoring from your sensors"
          />
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <CarbonCreditsCalculator />
            <CarbonEmissionCalculator />
          </div>
        </div>
        
        <div className="space-y-6">
          <SensorStatus sensors={mockSensors} />
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Carbon Neutral Goal</span>
                  <span className="text-sm font-bold text-gray-800">{userData.dashboardStats.carbonNeutralProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${userData.dashboardStats.carbonNeutralProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <TipsCard />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <CarbonOffsetTable offsets={userData.carbonOffsets} />
      </div>
    </div>
  );
};

export default Dashboard;
