"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "signin",
}: AuthModalProps) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!email.trim()) {
        throw new Error("Please enter your email address");
      }
      if (!password.trim() || password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (mode === "signup") {
        if (!name.trim()) throw new Error("Please provide your name");
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }

      onClose();
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "signin" ? "Sign In to LaunchPilot" : "Create Your Free Account"}
      description={
        mode === "signin"
          ? "Access your projects, tasks, and AI workspace"
          : "Start organizing your initiatives in under 60 seconds"
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <Input
            label="Full Name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <Input
          type="email"
          label="Email Address"
          placeholder="ada@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="At least 6 characters"
          required
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          id="auth-submit-btn"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full mt-2"
        >
          {mode === "signin" ? "Sign In" : "Get Started Free"}
        </Button>

        <div className="text-center pt-2">
          {mode === "signin" ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode("signup");
              }}
              className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Don't have an account? <span className="font-semibold text-indigo-600 dark:text-indigo-400">Sign Up</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode("signin");
              }}
              className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Already have an account? <span className="font-semibold text-indigo-600 dark:text-indigo-400">Sign In</span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
