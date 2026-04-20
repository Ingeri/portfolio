'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedAuth = localStorage.getItem('adminAuth');
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedAuth === 'true' && savedEmail) {
      setIsAuthenticated(true);
      setAdminEmail(savedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setAdminEmail(data.email);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', data.email);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminEmail, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
