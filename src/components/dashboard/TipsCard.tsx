import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Leaf, Recycle, Zap } from 'lucide-react';

const TipsCard: React.FC = () => {
  const tips = [
    {
      icon: <Lightbulb className="h-4 w-4" />,
      title: "Switch to LED bulbs",
      description: "Can reduce energy consumption by up to 80%",
      impact: "~15kg CO₂/year"
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      title: "Walk or bike short trips",
      description: "Replace car trips under 2km with walking or cycling",
      impact: "~50kg CO₂/year"
    },
    {
      icon: <Recycle className="h-4 w-4" />,
      title: "Recycle properly",
      description: "Sort materials correctly to maximize recycling efficiency",
      impact: "~25kg CO₂/year"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Unplug devices",
      description: "Electronics consume power even when turned off",
      impact: "~10kg CO₂/year"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Leaf className="h-5 w-5" />
          Eco Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm">{tip.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                <span className="text-xs font-medium text-green-600 mt-1 inline-block">
                  Save {tip.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsCard;