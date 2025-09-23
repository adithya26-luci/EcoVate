
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, LogIn, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/contexts/UserContext';
import AuthDialog from '@/components/auth/AuthDialog';
import UserMenu from '@/components/auth/UserMenu';
import ChatbotWidget from '@/components/ChatbotWidget';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {(sidebarOpen || !isMobile) && (
        <div 
          className={`${isMobile ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : ''}`}
          onClick={isMobile ? toggleSidebar : undefined}
        >
          <div 
            className={`${isMobile ? 'w-64 absolute h-full' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'} mb-4`}>
          {isMobile && (
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10 self-start"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}
          <div className={`${isMobile ? 'self-end' : 'ml-auto'}`}>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button 
                onClick={() => setAuthDialogOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
        {children}
      </main>
      
      {/* Global Chatbot Button */}
      {!chatbotOpen && (
        <Button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
          <span className="sr-only">Open Chat Assistant</span>
        </Button>
      )}
      
      {chatbotOpen && <ChatbotWidget onClose={() => setChatbotOpen(false)} />}
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </div>
  );
};

export default AppLayout;
