
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sensor } from '@/types';

interface SensorStatusProps {
  sensors: Sensor[];
}

const SensorStatus: React.FC<SensorStatusProps> = ({ sensors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Status</CardTitle>
        <CardDescription>Live monitoring of all sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensors.map(sensor => (
            <div key={sensor.id} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div>
                <div className="font-medium">{sensor.name}</div>
                <div className="text-sm text-slate-500">{sensor.location.name}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${getStatusColor(sensor.status)}`} />
                  <span className="text-sm font-medium">{sensor.status}</span>
                </div>
                <div className="text-sm text-slate-500">
                  {sensor.status === 'online' ? `${sensor.lastReading.co2} PPM` : 'No data'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500 animate-pulse-gentle';
    case 'offline':
      return 'bg-red-500';
    case 'maintenance':
      return 'bg-amber-500';
    default:
      return 'bg-slate-500';
  }
};

export default SensorStatus;
