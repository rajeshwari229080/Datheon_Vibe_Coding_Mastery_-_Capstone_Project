import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={generatedId}
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-rose-500 animate-in fade-in duration-150">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 3, ...props }, ref) => {
    const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <textarea
          id={generatedId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-y",
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-rose-500 animate-in fade-in duration-150">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
