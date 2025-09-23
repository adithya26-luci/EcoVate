
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User, X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  onClose: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onClose }) => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(location.pathname),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function getWelcomeMessage(pathname: string): string {
    switch (pathname) {
      case '/':
        return 'Hello! I\'m your EcoTracker assistant. I can help you understand your dashboard metrics, CO₂ readings, and carbon offset progress. What would you like to know?';
      case '/sensors':
        return 'Hi! I\'m here to help with sensor management. I can assist with sensor status, troubleshooting offline sensors, and understanding sensor data. How can I help?';
      case '/map':
        return 'Welcome! I can help you navigate the sensor map, understand location data, and interpret geographical CO₂ patterns. What would you like to explore?';
      case '/analytics':
        return 'Hello! I\'m here to help you understand your analytics data, trends, and reports. I can explain charts, metrics, and help you make sense of your environmental data.';
      case '/settings':
        return 'Hi! I can help you with account settings, configuration, notifications, and profile management. What settings would you like to adjust?';
      default:
        return 'Hello! I\'m your EcoTracker assistant. How can I help you today?';
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText, location.pathname),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string, pathname: string): string => {
    const input = userInput.toLowerCase();
    
    // Analytics and tracking responses
    if (input.includes('analytics') || input.includes('data') || input.includes('trends')) {
      return "Our platform provides detailed analytics to help you understand your carbon footprint and track your progress over time.";
    } else if (input.includes('reports') || input.includes('reporting')) {
      return "Generate comprehensive reports on your carbon reduction activities and environmental impact for stakeholders.";
    } else if (input.includes('tracking') || input.includes('monitoring')) {
      return "Monitor your carbon footprint trends and see how your actions contribute to environmental sustainability.";
    } else if (input.includes('insights') || input.includes('analysis')) {
      return "Get detailed analysis of your environmental data to identify patterns and opportunities for improvement.";
    }
    
    // Page-specific responses
    if (pathname === '/sensors') {
      if (input.includes('offline') || input.includes('not working')) {
        return 'To troubleshoot sensor issues: 1) Check network connectivity, 2) Verify power supply, 3) Review sensor status, 4) Contact support if needed.';
      } else if (input.includes('add') || input.includes('new sensor')) {
        return 'To add a new sensor, click "Add Sensor" and follow the setup guide for optimal placement and configuration.';
      }
    } else if (pathname === '/analytics') {
      if (input.includes('chart') || input.includes('graph')) {
        return 'Analytics charts show your environmental data trends with clear visualizations. Hover over data points for detailed information about specific time periods.';
      } else if (input.includes('export') || input.includes('download')) {
        return 'Export your data in multiple formats: CSV for spreadsheets, PDF for reports, and JSON for technical integration.';
      }
    } else if (pathname === '/map') {
      if (input.includes('location') || input.includes('sensor location')) {
        return 'The map shows all your sensor locations with real-time status indicators. Click on any sensor marker to view detailed information.';
      }
    } else if (pathname === '/settings') {
      if (input.includes('api')) {
        return 'Configure API access to integrate your carbon tracking data with other applications and services.';
      } else if (input.includes('notification')) {
        return 'Set up notifications for important events like sensor alerts, goal achievements, and regular reports.';
      }
    }
    
    // General responses
    if (input.includes('co2') || input.includes('carbon')) {
      return 'Track your CO₂ levels and carbon footprint with real-time monitoring and historical data analysis to help you make informed environmental decisions.';
    } else if (input.includes('sensor')) {
      return 'Monitor sensor health and status through the dashboard. Get alerts for maintenance needs and optimize your monitoring network.';
    } else if (input.includes('dashboard')) {
      return 'The dashboard provides an overview of your environmental metrics including CO₂ levels, carbon credits, and progress toward your sustainability goals.';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I\'m here to help! I can assist with understanding your data, navigating the platform, and answering questions about carbon tracking. What would you like to know?';
    } else {
      return 'I can help you with carbon tracking, sensor management, data analysis, and environmental monitoring. Feel free to ask about any feature or need assistance with your sustainability goals!';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Bot className="h-4 w-4 mr-2 text-green-600" />
            EcoTracker Help
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-3 w-3 mt-0.5 text-green-600" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-3 w-3 mt-0.5 text-white" />
                    )}
                    <span>{message.text}</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl text-sm">
                  <Bot className="h-3 w-3 animate-pulse text-green-600" />
                  <span className="ml-2">Typing...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotWidget;
