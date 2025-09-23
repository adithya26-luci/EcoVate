import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon, RefreshCwIcon, TreePineIcon, LeafIcon, DollarSignIcon, TargetIcon, CalendarIcon, MapPinIcon, UsersIcon, CheckCircleIcon } from 'lucide-react';
import InvestmentDialog from '@/components/InvestmentDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { mockSensors } from '@/lib/mockData';

interface Project {
  id: string;
  name: string;
  description: string;
  type: 'reforestation' | 'renewable-energy' | 'carbon-capture' | 'conservation';
  location: string;
  status: 'active' | 'completed' | 'planning' | 'funding';
  progress: number;
  co2Reduced: number;
  target: number;
  startDate: string;
  endDate: string;
  investment: number;
  investors: number;
  sensorId?: string;
  impact: {
    treesPlanted?: number;
    energyGenerated?: number;
    areaProtected?: number;
    co2Captured?: number;
  };
}

const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Amazon Rainforest Conservation',
    description: 'Large-scale conservation project protecting 10,000 hectares of pristine Amazon rainforest with continuous CO₂ monitoring.',
    type: 'conservation',
    location: 'Amazon Basin, Brazil',
    status: 'active',
    progress: 78,
    co2Reduced: 2450,
    target: 3200,
    startDate: '2023-01-15',
    endDate: '2025-12-31',
    investment: 850000,
    investors: 124,
    sensorId: 'sensor-001',
    impact: {
      areaProtected: 10000,
      co2Captured: 2450
    }
  },
  {
    id: 'proj-002',
    name: 'Urban Reforestation Initiative',
    description: 'City-wide tree planting program with smart CO₂ monitoring to track urban air quality improvements.',
    type: 'reforestation',
    location: 'Central Park, New York',
    status: 'active',
    progress: 65,
    co2Reduced: 1820,
    target: 2800,
    startDate: '2023-03-01',
    endDate: '2024-11-30',
    investment: 420000,
    investors: 89,
    sensorId: 'sensor-002',
    impact: {
      treesPlanted: 5200,
      co2Captured: 1820
    }
  },
  {
    id: 'proj-003',
    name: 'Coastal Wind Farm',
    description: 'Offshore wind energy project generating clean electricity with real-time emission offset tracking.',
    type: 'renewable-energy',
    location: 'Lake Michigan Shore',
    status: 'planning',
    progress: 25,
    co2Reduced: 650,
    target: 4500,
    startDate: '2024-01-01',
    endDate: '2026-06-30',
    investment: 1200000,
    investors: 67,
    sensorId: 'sensor-003',
    impact: {
      energyGenerated: 1200,
      co2Captured: 650
    }
  },
  {
    id: 'proj-004',
    name: 'Mountain Carbon Capture',
    description: 'Advanced carbon capture and storage facility in mountainous region with precision CO₂ monitoring.',
    type: 'carbon-capture',
    location: 'Rocky Mountains, Colorado',
    status: 'funding',
    progress: 12,
    co2Reduced: 280,
    target: 5000,
    startDate: '2024-06-01',
    endDate: '2027-12-31',
    investment: 2100000,
    investors: 45,
    sensorId: 'sensor-004',
    impact: {
      co2Captured: 280
    }
  },
  {
    id: 'proj-005',
    name: 'Coastal Restoration Project',
    description: 'Mangrove restoration and marine conservation with integrated environmental monitoring systems.',
    type: 'conservation',
    location: 'Santa Monica, California',
    status: 'completed',
    progress: 100,
    co2Reduced: 3200,
    target: 3200,
    startDate: '2022-01-01',
    endDate: '2023-12-31',
    investment: 680000,
    investors: 156,
    sensorId: 'sensor-005',
    impact: {
      areaProtected: 850,
      co2Captured: 3200
    }
  }
];

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const isMobile = useIsMobile();
  
  const handleInvestClick = (projectId: string, projectName: string) => {
    setSelectedProject({ id: projectId, name: projectName });
    setDialogOpen(true);
  };

  const getProjectTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'reforestation':
        return <TreePineIcon className="h-4 w-4" />;
      case 'renewable-energy':
        return <LeafIcon className="h-4 w-4" />;
      case 'carbon-capture':
        return <TargetIcon className="h-4 w-4" />;
      case 'conservation':
        return <LeafIcon className="h-4 w-4" />;
      default:
        return <TreePineIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-blue-500 text-white';
      case 'planning':
        return 'bg-yellow-500 text-white';
      case 'funding':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredProjects = selectedTab === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.status === selectedTab);

  const getSensorInfo = (sensorId?: string) => {
    if (!sensorId) return null;
    return mockSensors.find(s => s.id === sensorId);
  };

  return (
    <div className="space-y-6">
      <div className={`${isMobile ? 'flex-col space-y-3' : 'flex justify-between items-center'}`}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Carbon Offset Projects</h1>
          <p className="text-muted-foreground">Monitor and invest in environmental projects with real-time CO₂ tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            {!isMobile && "Refresh"}
          </Button>
          <Button size={isMobile ? "sm" : "sm"} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusIcon className="h-4 w-4 mr-2" />
            {!isMobile && "New Project"}
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{mockProjects.length}</p>
              </div>
              <TreePineIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CO₂ Reduced</p>
                <p className="text-2xl font-bold">{mockProjects.reduce((sum, p) => sum + p.co2Reduced, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">tons</p>
              </div>
              <LeafIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold">${(mockProjects.reduce((sum, p) => sum + p.investment, 0) / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CO₂ Sensors</p>
                <p className="text-2xl font-bold">{mockSensors.filter(s => s.status === 'online').length}</p>
                <p className="text-xs text-muted-foreground">active monitoring</p>
              </div>
              <TargetIcon className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {filteredProjects.map((project) => {
              const sensor = getSensorInfo(project.sensorId);
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getProjectTypeIcon(project.type)}
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* CO2 Impact */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 font-medium">CO₂ Reduced</p>
                        <p className="text-xl font-bold text-green-600">{project.co2Reduced}</p>
                        <p className="text-green-600 text-xs">of {project.target} tons target</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800 font-medium">Investment</p>
                        <p className="text-xl font-bold text-blue-600">${(project.investment / 1000).toFixed(0)}K</p>
                        <p className="text-blue-600 text-xs">{project.investors} investors</p>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-gray-500" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <span>{project.investors} investors contributing</span>
                      </div>
                    </div>

                    {/* CO2 Sensor Info */}
                    {sensor && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">CO₂ Monitoring</p>
                            <p className="text-xs text-gray-600">{sensor.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">{sensor.lastReading.co2} PPM</p>
                            <Badge 
                              variant={sensor.status === 'online' ? 'default' : 'secondary'}
                              className={sensor.status === 'online' ? 'bg-primary text-primary-foreground text-xs' : 'text-xs'}
                            >
                              {sensor.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Impact Metrics */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Environmental Impact</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {project.impact.treesPlanted && (
                          <div className="flex items-center gap-1">
                            <TreePineIcon className="h-3 w-3 text-green-600" />
                            <span>{project.impact.treesPlanted.toLocaleString()} trees planted</span>
                          </div>
                        )}
                        {project.impact.energyGenerated && (
                          <div className="flex items-center gap-1">
                            <LeafIcon className="h-3 w-3 text-blue-600" />
                            <span>{project.impact.energyGenerated} MW generated</span>
                          </div>
                        )}
                        {project.impact.areaProtected && (
                          <div className="flex items-center gap-1">
                            <CheckCircleIcon className="h-3 w-3 text-green-600" />
                            <span>{project.impact.areaProtected.toLocaleString()} hectares protected</span>
                          </div>
                        )}
                        {project.impact.co2Captured && (
                          <div className="flex items-center gap-1">
                            <TargetIcon className="h-3 w-3 text-purple-600" />
                            <span>{project.impact.co2Captured} tons CO₂ captured</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        onClick={() => handleInvestClick(project.id, project.name)}
                      >
                        <DollarSignIcon className="h-4 w-4 mr-1" />
                        Invest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedProject && (
        <InvestmentDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          sensorName={`Project: ${selectedProject.name}`}
          projectName={selectedProject.name}
        />
      )}
    </div>
  );
};

export default ProjectsPage;