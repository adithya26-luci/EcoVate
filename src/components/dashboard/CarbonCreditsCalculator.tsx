
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Leaf } from 'lucide-react';
import { useUserData } from '@/contexts/UserDataContext';

interface Activity {
  type: string;
  amount: number;
  unit: string;
  carbonFactor: number; // kg CO2 per unit
}

const CarbonCreditsCalculator: React.FC = () => {
  const { userData, updateCredits } = useUserData();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [amount, setAmount] = useState('');
  const [totalCredits, setTotalCredits] = useState(userData.creditsPurchased);

  useEffect(() => {
    setTotalCredits(userData.creditsPurchased);
  }, [userData.creditsPurchased]);

  const activityTypes = {
    'solar-energy': { name: 'Solar Energy', unit: 'kWh', carbonFactor: -0.5 },
    'tree-planting': { name: 'Tree Planting', unit: 'trees', carbonFactor: -22 },
    'recycling': { name: 'Recycling', unit: 'kg', carbonFactor: -0.7 },
    'public-transport': { name: 'Public Transport', unit: 'km', carbonFactor: -0.15 },
    'energy-efficiency': { name: 'Energy Efficiency', unit: 'kWh saved', carbonFactor: -0.4 },
    'composting': { name: 'Composting', unit: 'kg', carbonFactor: -0.3 },
  };

  const addActivity = () => {
    if (!selectedActivity || !amount) return;

    const activityData = activityTypes[selectedActivity as keyof typeof activityTypes];
    const newActivity: Activity = {
      type: activityData.name,
      amount: parseFloat(amount),
      unit: activityData.unit,
      carbonFactor: activityData.carbonFactor,
    };

    const newActivities = [...activities, newActivity];
    setActivities(newActivities);
    
    // Calculate total credits (negative values are credits)
    const credits = Math.abs(newActivity.amount * newActivity.carbonFactor);
    const newTotal = totalCredits + credits;
    setTotalCredits(newTotal);
    updateCredits(newTotal);
    
    setSelectedActivity('');
    setAmount('');
  };

  const clearCalculations = () => {
    setActivities([]);
    setTotalCredits(0);
    updateCredits(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Carbon Credits Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="activity">Activity Type</Label>
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
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="flex items-end">
            <Button onClick={addActivity} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Add Activity
            </Button>
          </div>
        </div>

        {activities.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Activities</h4>
              <Button variant="outline" size="sm" onClick={clearCalculations}>
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">
                    {activity.type}: {activity.amount} {activity.unit}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    +{Math.abs(activity.amount * activity.carbonFactor).toFixed(1)} kg CO₂
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-medium">Total Carbon Credits</span>
                </div>
                <span className="text-xl font-bold text-primary">
                  {totalCredits.toFixed(1)} kg CO₂
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Equivalent to {(totalCredits / 1000).toFixed(2)} carbon credit tokens
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonCreditsCalculator;
