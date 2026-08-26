import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateAdminProfile: (updated: Partial<AdminUser>) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Maps a Supabase auth session to the shape the rest of the admin UI expects.
// Display name / role can be set as Supabase user_metadata (see README note),
// and fall back to sensible defaults when not present.
const mapSessionToAdminUser = (session: Session | null): AdminUser | null => {
  if (!session?.user) return null;
  const meta = session.user.user_metadata ?? {};
  return {
    id: session.user.id,
    name: meta.name ?? session.user.email ?? 'Admin',
    email: session.user.email ?? '',
    role: meta.role ?? 'Super Admin'
  };
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load whatever session Supabase already has persisted (localStorage),
    // then keep adminUser in sync with any future auth state changes
    // (login, logout, token refresh, expiry) wherever they happen.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminUser(mapSessionToAdminUser(session));
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(mapSessionToAdminUser(session));
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = adminUser !== null;

  const login = async (
    email: string,
    pass: string,
    _remember: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: pass
    });

    if (error || !data.session) {
      return {
        success: false,
        error: error?.message ?? 'Invalid email or password.'
      };
    }

    setAdminUser(mapSessionToAdminUser(data.session));
    return { success: true };
  };

  const logout = () => {
    supabase.auth.signOut();
    setAdminUser(null);
  };

  const updateAdminProfile = async (updated: Partial<AdminUser>) => {
    if (!adminUser) return;
    const newProfile = { ...adminUser, ...updated };
    setAdminUser(newProfile);
    // Persist display name / role as Supabase user metadata so it survives reloads.
    await supabase.auth.updateUser({
      data: { name: newProfile.name, role: newProfile.role }
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated,
        isLoading,
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