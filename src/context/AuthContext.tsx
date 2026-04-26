"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  type DemoUser,
  type UserRole,
  getDemoUser,
  setDemoUser,
  clearDemoUser,
} from "@/lib/demoStore";

type AuthState = {
  user: DemoUser | null;
  role: UserRole | null;
  loading: boolean;
  loginAsDemo: (phone: string, role: UserRole) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate from localStorage on mount
    const stored = getDemoUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const loginAsDemo = useCallback((phone: string, role: UserRole) => {
    const uid = `demo_${phone.replace(/\D/g, "")}_${role}`;
    const u: DemoUser = { uid, phone, role };
    setDemoUser(u);
    setUser(u);
  }, []);

  const signOut = useCallback(() => {
    clearDemoUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      role: user?.role ?? null,
      loading,
      loginAsDemo,
      signOut,
    }),
    [user, loading, loginAsDemo, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
