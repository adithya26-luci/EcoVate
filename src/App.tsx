
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import MapPage from "./pages/MapPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import ProjectProgressPage from "./pages/ProjectProgressPage";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageTransition from "./components/ui/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
        <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <Index />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <Index />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <ProjectsPage />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <MapPage />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <AnalyticsPage />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <SettingsPage />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoute>
                  <ProjectProgressPage />
                </AnimatedRoute>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="*" 
          element={
            <AnimatedRoute>
              <NotFound />
            </AnimatedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
