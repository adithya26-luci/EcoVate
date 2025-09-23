
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CO2Chart from '@/components/dashboard/CO2Chart';
import { generateHistoricalData, mockSensors } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const AnalyticsPage: React.FC = () => {
  // Generate some sample data
  const sensorData = generateHistoricalData(mockSensors[0].id);
  const weeklyData = sensorData.slice(0, 24 * 7); // Last week of data
  const dailyData = sensorData.slice(0, 24);      // Last day of data
  const hourlyData = sensorData.slice(0, 6);      // Last few hours
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Explore and analyze your carbon data
        </p>
      </div>
      
      <Tabs defaultValue="co2" className="space-y-4">
        <TabsList>
          <TabsTrigger value="co2">CO₂ Levels</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="co2" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <MetricCard 
              title="Current Average"
              value={`${calculateAverage(hourlyData)} PPM`}
              change={{ value: -2.1, timeframe: "from yesterday" }}
            />
            <MetricCard 
              title="24-Hour Average"
              value={`${calculateAverage(dailyData)} PPM`}
              change={{ value: 1.2, timeframe: "from last week" }}
            />
            <MetricCard 
              title="7-Day Average"
              value={`${calculateAverage(weeklyData)} PPM`}
              change={{ value: -0.8, timeframe: "from last month" }}
            />
          </div>
          
          <div className="grid gap-4 grid-cols-1">
            <CO2Chart 
              data={weeklyData} 
              title="CO₂ Levels (7-Day Trend)" 
              description="Hourly measurements in parts per million"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emission Reduction Trends</CardTitle>
              <CardDescription>Analysis of your carbon reduction over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-slate-500">Trend analysis charts would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reports</CardTitle>
              <CardDescription>Download and share your carbon data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <div className="font-medium">Monthly Carbon Summary</div>
                    <div className="text-sm text-slate-500">April 2023</div>
                  </div>
                  <button className="text-sm text-secondary hover:underline">
                    Download PDF
                  </button>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <div className="font-medium">Quarterly Environmental Impact</div>
                    <div className="text-sm text-slate-500">Q1 2023</div>
                  </div>
                  <button className="text-sm text-secondary hover:underline">
                    Download PDF
                  </button>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <div className="font-medium">Annual CO₂ Offset Report</div>
                    <div className="text-sm text-slate-500">2022</div>
                  </div>
                  <button className="text-sm text-secondary hover:underline">
                    Download PDF
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper components and functions
interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    timeframe: string;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change }) => {
  const isPositive = change ? change.value >= 0 : false;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="flex items-center mt-1 text-sm">
            <span
              className={cn(
                "font-medium",
                isPositive ? "text-red-600" : "text-green-600"
              )}
            >
              {isPositive ? "+" : ""}{change.value} PPM
            </span>
            <span className="text-slate-500 ml-1">
              {change.timeframe}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Calculate average CO2 level
const calculateAverage = (data: any[]): number => {
  const sum = data.reduce((acc, reading) => acc + reading.value, 0);
  return Math.round(sum / data.length);
};

export default AnalyticsPage;
