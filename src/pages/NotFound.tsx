
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-slate-600">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or return to the dashboard.
        </p>
        <Button asChild>
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
