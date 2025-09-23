import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { CarbonOffset, DashboardStats } from '@/types';

interface UserData {
  dashboardStats: DashboardStats;
  carbonOffsets: CarbonOffset[];
  calculatedEmissions: number;
  creditsPurchased: number;
}

interface UserDataContextType {
  userData: UserData;
  updateDashboardStats: (stats: Partial<DashboardStats>) => void;
  addCarbonOffset: (offset: CarbonOffset) => void;
  updateEmissions: (emissions: number) => void;
  updateCredits: (credits: number) => void;
  resetUserData: () => void;
}

const defaultUserData: UserData = {
  dashboardStats: {
    totalCo2Reduced: 0,
    activeSensors: 3, // CO2 sensors are shared across all users
    totalProjects: 0,
    carbonNeutralProgress: 0
  },
  carbonOffsets: [],
  calculatedEmissions: 0,
  creditsPurchased: 0
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  // Load user-specific data when user changes
  useEffect(() => {
    if (user) {
      try {
        const savedUserData = localStorage.getItem(`userData_${user.id}`);
        if (savedUserData) {
          const parsedData = JSON.parse(savedUserData);
          setUserData(parsedData);
        } else {
          // New user - initialize with default data
          setUserData(defaultUserData);
          localStorage.setItem(`userData_${user.id}`, JSON.stringify(defaultUserData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserData(defaultUserData);
      }
    } else {
      // No user logged in - reset to defaults
      setUserData(defaultUserData);
    }
  }, [user]);

  // Save user data whenever it changes
  const saveUserData = (newData: UserData) => {
    if (user) {
      localStorage.setItem(`userData_${user.id}`, JSON.stringify(newData));
    }
    setUserData(newData);
  };

  const updateDashboardStats = (stats: Partial<DashboardStats>) => {
    const newUserData = {
      ...userData,
      dashboardStats: { ...userData.dashboardStats, ...stats }
    };
    saveUserData(newUserData);
  };

  const addCarbonOffset = (offset: CarbonOffset) => {
    const newOffsets = [...userData.carbonOffsets, offset];
    const totalReduced = newOffsets.reduce((sum, o) => sum + o.amount, 0);
    const newUserData = {
      ...userData,
      carbonOffsets: newOffsets,
      dashboardStats: {
        ...userData.dashboardStats,
        totalCo2Reduced: totalReduced,
        totalProjects: newOffsets.length,
        carbonNeutralProgress: Math.min(Math.round((totalReduced / 100) * 100), 100)
      }
    };
    saveUserData(newUserData);
  };

  const updateEmissions = (emissions: number) => {
    const newUserData = {
      ...userData,
      calculatedEmissions: emissions
    };
    saveUserData(newUserData);
  };

  const updateCredits = (credits: number) => {
    const newUserData = {
      ...userData,
      creditsPurchased: credits
    };
    saveUserData(newUserData);
  };

  const resetUserData = () => {
    const newData = { ...defaultUserData };
    saveUserData(newData);
  };

  const value = {
    userData,
    updateDashboardStats,
    addCarbonOffset,
    updateEmissions,
    updateCredits,
    resetUserData
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};