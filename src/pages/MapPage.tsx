
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSensors } from '@/lib/mockData';

const MapPage: React.FC = () => {
  // In a real app, this would use a mapping library like Leaflet or Google Maps
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sensor Map</h1>
        <p className="text-muted-foreground">Geographical view of your sensor network</p>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Sensor Locations</CardTitle>
          <CardDescription>
            Interactive map showing all sensor placements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] bg-slate-100 relative flex items-center justify-center">
            <div className="text-center text-slate-500">
              <p>Interactive map would be implemented here with Leaflet or Google Maps</p>
              <p className="text-sm mt-2">Showing {mockSensors.length} sensor locations</p>
            </div>
            
            {/* This is a placeholder for the map */}
            {mockSensors.map((sensor) => {
              // Calculate relative positions inside the container for the placeholder
              const left = (((sensor.location.lng + 180) / 360) * 100).toFixed(2);
              const top = (((90 - sensor.location.lat) / 180) * 100).toFixed(2);
              
              return (
                <div 
                  key={sensor.id}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  className={`absolute w-4 h-4 rounded-full -ml-2 -mt-2 border-2 border-white ${
                    sensor.status === 'online' ? 'bg-primary animate-pulse-gentle' :
                    sensor.status === 'offline' ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                  title={`${sensor.name} - ${sensor.status}`}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sensor Distribution</CardTitle>
            <CardDescription>By geographical region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>West Coast</span>
                <span className="font-medium">2 sensors</span>
              </div>
              <div className="flex justify-between items-center">
                <span>East Coast</span>
                <span className="font-medium">1 sensor</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Midwest</span>
                <span className="font-medium">1 sensor</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mountain Region</span>
                <span className="font-medium">1 sensor</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Regional CO₂ Levels</CardTitle>
            <CardDescription>Average readings by area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>West Coast</span>
                <span className="font-medium">416 PPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>East Coast</span>
                <span className="font-medium">432 PPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Midwest</span>
                <span className="font-medium">405 PPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mountain Region</span>
                <span className="font-medium">398 PPM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;
