import React from 'react';
import { Card } from '@/components/ui/card';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectProgressPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  // Check if user is admin based on email
  const isAdmin = user?.email?.includes('admin') || false;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Project Progress</h1>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Track Project Milestones</h2>
          <p className="text-gray-600">
            {isAdmin 
              ? "Update and track the progress of your environmental projects."
              : "View the latest updates and progress on our environmental projects."}
          </p>
        </div>

        <ProjectProgress />
      </Card>
    </div>
  );
};

export default ProjectProgressPage;
