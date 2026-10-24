"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function LeadCaptureSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            return;
          }
        }
      } catch {
        // Fallback for static hosts (GitHub Pages) where /api/leads is not a live server
      }

      // Client-side resilient fallback to DatabaseService (Supabase or LocalStorage)
      const { DatabaseService } = await import("@/lib/supabase/service");
      await DatabaseService.createLead({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim() || undefined,
      });

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-capture" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 p-8 sm:p-12 shadow-xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center mb-10">
          <Badge variant="purple" size="md" className="mb-4">
            Priority Access
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to Accelerate Your Projects?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Join forward-thinking students, freelancers, and indie founders shipping faster with LaunchPilot AI. Request priority access or leave feedback below.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              You're on the Priority List!
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Thank you for your interest. We've recorded your details and our team will notify you with exclusive early access instructions.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() => setIsSuccess(false)}
            >
              Submit Another Response
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto" noValidate>
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Ada Lovelace"
                value={formData.name}
                error={errors.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="ada@example.com"
                value={formData.email}
                error={errors.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <Textarea
              label="Primary Project or Feedback (Optional)"
              placeholder="Tell us what project you're building (e.g. final-year capstone, client SaaS MVP)..."
              value={formData.message}
              rows={3}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              id="lead-submit-btn"
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full mt-2"
            >
              Request Early Access
            </Button>

            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
              We respect your privacy. No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
