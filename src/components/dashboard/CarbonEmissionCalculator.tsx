
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, AlertTriangle } from 'lucide-react';
import { useUserData } from '@/contexts/UserDataContext';

interface EmissionActivity {
  type: string;
  amount: number;
  unit: string;
  emissionFactor: number; // kg CO2 per unit
}

const CarbonEmissionCalculator: React.FC = () => {
  const { userData, updateEmissions } = useUserData();
  const [activities, setActivities] = useState<EmissionActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [amount, setAmount] = useState('');
  const [totalEmissions, setTotalEmissions] = useState(userData.calculatedEmissions);

  useEffect(() => {
    setTotalEmissions(userData.calculatedEmissions);
  }, [userData.calculatedEmissions]);

  const activityTypes = {
    'car-travel': { name: 'Car Travel', unit: 'km', emissionFactor: 0.21 },
    'air-travel': { name: 'Air Travel', unit: 'km', emissionFactor: 0.25 },
    'electricity': { name: 'Electricity Usage', unit: 'kWh', emissionFactor: 0.5 },
    'natural-gas': { name: 'Natural Gas', unit: 'm³', emissionFactor: 2.0 },
    'meat-consumption': { name: 'Meat Consumption', unit: 'kg', emissionFactor: 27 },
    'waste': { name: 'Waste Generation', unit: 'kg', emissionFactor: 0.5 },
  };

  const addActivity = () => {
    if (!selectedActivity || !amount) return;

    const activityData = activityTypes[selectedActivity as keyof typeof activityTypes];
    const newActivity: EmissionActivity = {
      type: activityData.name,
      amount: parseFloat(amount),
      unit: activityData.unit,
      emissionFactor: activityData.emissionFactor,
    };

    const newActivities = [...activities, newActivity];
    setActivities(newActivities);
    
    // Calculate emissions
    const emissions = newActivity.amount * newActivity.emissionFactor;
    const newTotal = totalEmissions + emissions;
    setTotalEmissions(newTotal);
    updateEmissions(newTotal);
    
    setSelectedActivity('');
    setAmount('');
  };

  const clearCalculations = () => {
    setActivities([]);
    setTotalEmissions(0);
    updateEmissions(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-orange-500" />
          Carbon Emission Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="emission-activity">Activity Type</Label>
            <Select value={selectedActivity} onValueChange={setSelectedActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(activityTypes).map(([key, activity]) => (
                  <SelectItem key={key} value={key}>
                    {activity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="emission-amount">Amount</Label>
            <Input
              id="emission-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="flex items-end">
            <Button onClick={addActivity} className="w-full bg-orange-500 hover:bg-orange-600">
              Add Activity
            </Button>
          </div>
        </div>

        {activities.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Emission Activities</h4>
              <Button variant="outline" size="sm" onClick={clearCalculations}>
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm">
                    {activity.type}: {activity.amount} {activity.unit}
                  </span>
                  <span className="text-sm font-medium text-orange-600">
                    +{(activity.amount * activity.emissionFactor).toFixed(1)} kg CO₂
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-orange-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Total Carbon Emissions</span>
                </div>
                <span className="text-xl font-bold text-orange-600">
                  {totalEmissions.toFixed(1)} kg CO₂
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Equivalent to {(totalEmissions / 1000).toFixed(2)} tonnes of CO₂
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonEmissionCalculator;
