import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateAdminProfile: (updated: Partial<AdminUser>) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'surbhi_admin_session';

const DEFAULT_ADMIN: AdminUser = {
  id: 'adm-01',
  name: 'Dr. Rahul Sharma',
  email: 'admin@surbhicoaching.edu',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const isAuthenticated = adminUser !== null;

  const login = async (
    email: string,
    pass: string,
    remember: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay for realistic UX
    await new Promise((res) => setTimeout(res, 400));

    const normalizedEmail = email.trim().toLowerCase();

    // Default credentials or accepted administrator patterns
    if (
      (normalizedEmail === 'admin@surbhicoaching.edu' && pass === 'admin123') ||
      (normalizedEmail === 'director@surbhi.edu' && pass === 'director123') ||
      (normalizedEmail === 'admin' && pass === 'admin')
    ) {
      const user: AdminUser = {
        ...DEFAULT_ADMIN,
        email: normalizedEmail === 'admin' ? 'admin@surbhicoaching.edu' : normalizedEmail
      };

      setAdminUser(user);
      if (remember) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid email or password. Use demo credentials: admin@surbhicoaching.edu / admin123'
    };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateAdminProfile = (updated: Partial<AdminUser>) => {
    if (!adminUser) return;
    const newProfile = { ...adminUser, ...updated };
    setAdminUser(newProfile);
    if (localStorage.getItem(AUTH_STORAGE_KEY)) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated,
        login,
        logout,
        updateAdminProfile
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
