"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  /** Already-translated error message. */
  error?: string;
  hint?: string;
  icon?: ReactNode;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  className?: string;
}

/** Shared text input: visible label, error and disabled states (elite-rules.txt §5.7). */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { label, error, hint, icon, hideLabel = false, className, id, disabled, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={inputId}
        className={cn("mb-1.5 block text-sm font-semibold text-body", hideLabel && "sr-only")}
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-content"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-11 w-full rounded-xl border-[1.5px] bg-surface-alt px-4 text-[0.95rem] text-body",
            "placeholder:text-content/60 transition-[border-color,box-shadow,background-color] duration-150",
            "focus:border-primary focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10",
            "disabled:cursor-not-allowed disabled:opacity-60",
            icon && "ps-11",
            error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-edge"
          )}
          {...props}
        />
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-content">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
