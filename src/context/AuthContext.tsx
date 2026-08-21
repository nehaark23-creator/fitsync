import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Activity, Allergy, Goal, Equipment } from '@/data/mockData';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  activities: Activity[];
  allergies: Allergy[];
  goals: Goal[];
  equipment: Equipment[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  register: (profile: UserProfile, password: string) => void;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'fitsync_auth';
const USERS_KEY = 'fitsync_users';

interface StoredUser extends UserProfile {
  password: string;
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as UserProfile;
        setUser(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const register = useCallback((profile: UserProfile, password: string) => {
    const users = loadUsers();
    const existing = users.find((u) => u.email === profile.email);
    if (existing) {
      // overwrite password if re-registering
      const updated = users.map((u) => (u.email === profile.email ? { ...profile, password } : u));
      saveUsers(updated);
    } else {
      saveUsers([...users, { ...profile, password }]);
    }
    const { password: _pw, ...publicProfile } = { ...profile, password };
    void _pw;
    setUser(publicProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicProfile));
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return { success: false, error: 'No account found with that email.' };
    if (found.password !== password) return { success: false, error: 'Incorrect password.' };
    const { password: _pw, ...publicProfile } = found;
    void _pw;
    setUser(publicProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicProfile));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...profile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const users = loadUsers();
      const stored = users.find((u) => u.email === updated.email);
      if (stored) {
        saveUsers(users.map((u) => (u.email === updated.email ? { ...updated, password: u.password } : u)));
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
