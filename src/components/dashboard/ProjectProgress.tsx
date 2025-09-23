import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUserData } from '@/contexts/UserDataContext';
import { useUser } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { Plus, Pencil } from 'lucide-react';

interface ProgressUpdate {
  id: string;
  date: string; // Store as ISO string for serialization
  progress: number;
  notes: string;
  updatedBy: string;
}

interface StoredProgress {
  current: number;
  history: ProgressUpdate[];
}

const ProjectProgress: React.FC = () => {
  const { user } = useUser();
  const { userData, updateDashboardStats } = useUserData();
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [progressNotes, setProgressNotes] = useState<string>('');
  const [progressHistory, setProgressHistory] = useState<ProgressUpdate[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('projectProgress');
      if (savedProgress) {
        const parsed: StoredProgress = JSON.parse(savedProgress);
        if (typeof parsed.current === 'number' && Array.isArray(parsed.history)) {
          setCurrentProgress(parsed.current);
          // Ensure each history item has the correct structure
          const validatedHistory = parsed.history.filter(
            (item): item is ProgressUpdate => 
              typeof item.id === 'string' &&
              item.date &&
              typeof item.progress === 'number' &&
              typeof item.notes === 'string' &&
              typeof item.updatedBy === 'string'
          );
          setProgressHistory(validatedHistory);
        }
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
      setCurrentProgress(0);
      setProgressHistory([]);
    }
  }, []);

  const handleProgressUpdate = () => {
    if (progressNotes.trim() === '') return;

    const newUpdate: ProgressUpdate = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      progress: currentProgress,
      notes: progressNotes,
      updatedBy: user?.name || 'User',
    };

    const updatedHistory = [newUpdate, ...progressHistory];
    
    // Save to localStorage
    try {
      localStorage.setItem('projectProgress', JSON.stringify({
        current: currentProgress,
        history: updatedHistory,
      }));
      
      // Update dashboard stats if progress reaches 100%
      if (currentProgress === 100) {
        updateDashboardStats({
          carbonNeutralProgress: 100,
          totalProjects: progressHistory.length + 1
        });
      }
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }

    setProgressHistory(updatedHistory);
    setProgressNotes('');
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base sm:text-lg font-semibold">Project Progress</CardTitle>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-500 hover:text-primary-700 text-sm px-3 py-1.5"
            >
              <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only sm:not-sr-only">Update</span>
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="text-xs sm:text-sm">Project Completion</span>
              <span className="font-medium text-gray-700">{currentProgress}%</span>
            </div>
            <div className="relative w-full">
              <div className="w-full bg-primary-100 rounded-full h-3 sm:h-2.5">
                <div 
                  className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 sm:h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${currentProgress}%` }}
                  aria-valuenow={currentProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className="sr-only" role="progressbar" aria-valuenow={currentProgress} aria-valuemin={0} aria-valuemax={100}>
                {currentProgress}% complete
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Progress: {currentProgress}%
                </label>
                <div className="px-1">
                  <input
                    type="range"
                    id="progress"
                    min="0"
                    max="100"
                    step="1"
                    value={currentProgress}
                    onChange={(e) => setCurrentProgress(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-sm"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Progress Notes
                </label>
                <Textarea
                  id="notes"
                  placeholder="Add details about the progress..."
                  value={progressNotes}
                  onChange={(e) => setProgressNotes(e.target.value)}
                  rows={3}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setProgressNotes('');
                  }}
                  className="w-full sm:w-auto flex-1 sm:flex-none justify-center border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-500 hover:text-primary-700 py-2 text-sm sm:text-base"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleProgressUpdate}
                  disabled={progressNotes.trim() === ''}
                  className="w-full sm:w-auto flex-1 sm:flex-none justify-center bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md transition-all py-2 text-sm sm:text-base"
                >
                  Save Update
                </Button>
              </div>
            </div>
          )}

          {progressHistory.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Recent Updates</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 -mr-2 sm:mr-0 sm:pr-2">
                {progressHistory.map((update) => (
                  <div key={update.id} className="border-l-4 border-primary-300 pl-3 sm:pl-4 py-2 bg-primary-50/50 rounded-r-md transition-all hover:shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <span className="font-medium text-sm text-primary-700">{update.updatedBy}</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(update.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1.5">{update.notes}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">
                        Progress: {update.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {!isEditing && progressHistory.length === 0 && (
        <CardFooter className="justify-center border-t p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full sm:w-auto justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-sm sm:text-base py-1.5"
            onClick={() => setIsEditing(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Project Update
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProjectProgress;
