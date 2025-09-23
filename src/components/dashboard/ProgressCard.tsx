
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  title: string;
  currentValue: number;
  maxValue: number;
  unit: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  currentValue, 
  maxValue, 
  unit 
}) => {
  const percentage = Math.min(Math.round((currentValue / maxValue) * 100), 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-2">
          <span className="text-2xl font-bold">{percentage}%</span>
          <span className="text-sm text-slate-500">
            {currentValue}/{maxValue} {unit}
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
