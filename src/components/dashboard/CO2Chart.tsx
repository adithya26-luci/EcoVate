
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Co2Reading } from '@/types';

interface CO2ChartProps {
  data: Co2Reading[];
  title?: string;
  description?: string;
}

const CO2Chart: React.FC<CO2ChartProps> = ({ 
  data, 
  title = "CO2 Levels", 
  description = "PPM over time" 
}) => {
  // Format data for the chart
  const chartData = data.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date(reading.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    value: reading.value
  }));

  // Sample data at regular intervals to avoid overcrowding
  const sampledData = chartData.filter((_, i) => i % 6 === 0);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sampledData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tickFormatter={(time, i) => i % 4 === 0 ? `${sampledData[i].date} ${time}` : time}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                formatter={(value) => [`${value} PPM`, 'CO2']}
                labelFormatter={(label, items) => {
                  if (items && items.length > 0) {
                    const index = items[0].payload.index;
                    return `${sampledData[index]?.date || ''} ${label}`;
                  }
                  return label;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2E7D32"
                fillOpacity={1}
                fill="url(#colorCO2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CO2Chart;
