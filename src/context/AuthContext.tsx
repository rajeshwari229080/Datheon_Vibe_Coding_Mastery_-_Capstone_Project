"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserSession = {
  id: "00000000-0000-0000-0000-000000000001",
  email: "founder@launchpilot.ai",
  name: "Rajeshwari (Founder)",
  role: "Lead Architect",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            const u = data.session.user;
            setUser({
              id: u.id,
              email: u.email || "",
              name: u.user_metadata?.full_name || u.email?.split("@")[0] || "User",
              avatar_url: u.user_metadata?.avatar_url,
            });
          } else {
            // Check fallback local session
            checkLocalSession();
          }
        } catch {
          checkLocalSession();
        }
      } else {
        checkLocalSession();
      }
      setIsLoading(false);
    }

    function checkLocalSession() {
      const stored = localStorage.getItem("launchpilot_user_session");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(DEMO_USER);
        }
      } else {
        // Initialize with default authenticated builder persona for seamless preview
        setUser(DEMO_USER);
        localStorage.setItem("launchpilot_user_session", JSON.stringify(DEMO_USER));
      }
    }

    initAuth();

    if (isSupabaseConfigured && supabase) {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = session.user;
          const sUser: UserSession = {
            id: u.id,
            email: u.email || "",
            name: u.user_metadata?.full_name || u.email?.split("@")[0] || "User",
            avatar_url: u.user_metadata?.avatar_url,
          };
          setUser(sUser);
          localStorage.setItem("launchpilot_user_session", JSON.stringify(sUser));
        } else {
          setUser(null);
          localStorage.removeItem("launchpilot_user_session");
        }
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          const sUser: UserSession = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || email.split("@")[0],
          };
          setUser(sUser);
          localStorage.setItem("launchpilot_user_session", JSON.stringify(sUser));
          return;
        }
      }

      // Local fallback session
      const fallbackUser: UserSession = {
        id: `user-${Date.now()}`,
        email,
        name: email.split("@")[0] || "User",
        role: "Member",
      };
      setUser(fallbackUser);
      localStorage.setItem("launchpilot_user_session", JSON.stringify(fallbackUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (data.user) {
          const sUser: UserSession = {
            id: data.user.id,
            email: data.user.email || email,
            name,
          };
          setUser(sUser);
          localStorage.setItem("launchpilot_user_session", JSON.stringify(sUser));
          return;
        }
      }

      // Local fallback sign up
      const fallbackUser: UserSession = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: "Founder",
      };
      setUser(fallbackUser);
      localStorage.setItem("launchpilot_user_session", JSON.stringify(fallbackUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
      localStorage.removeItem("launchpilot_user_session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
