
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string, name?: string, profilePicture?: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, profilePicture?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, profilePicture?: string) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading saved user:', error);
      localStorage.removeItem('user');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        return false;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        u.email?.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        const userWithoutPassword = { 
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          profilePicture: foundUser.profilePicture
        };
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, profilePicture?: string): Promise<boolean> => {
    try {
      if (!email || !password || !name) {
        return false;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        return false; // User already exists
      }

      const newUser = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        password,
        name,
        profilePicture
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profilePicture: newUser.profilePicture
      };
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (name: string, profilePicture?: string) => {
    if (user) {
      const updatedUser = { ...user, name, profilePicture };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in users array
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], name, profilePicture };
          localStorage.setItem('users', JSON.stringify(users));
        }
      } catch (error) {
        console.error('Error updating user in users array:', error);
      }
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
