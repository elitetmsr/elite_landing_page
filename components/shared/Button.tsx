import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-card hover:bg-primary-dark",
  secondary:
    "bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-glow hover:brightness-110",
  accent: "bg-accent text-white shadow-glow-accent hover:bg-accent/90",
  outline:
    "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-content hover:bg-surface-muted hover:text-primary",
  glass:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/20",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-10 gap-1.5 px-4 text-sm",
  md: "min-h-11 gap-2 px-5 text-sm",
  lg: "min-h-[3.25rem] gap-2.5 px-7 text-base",
};

/** Shared class builder so <Button> and <LinkButton> always look identical. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "group/btn inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl font-bold",
    "transition-[transform,background-color,border-color,color,box-shadow,filter] duration-200 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className
  );
}

export interface ButtonContentOptions {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  isLoading?: boolean;
}

/** Renders label + optional icon. Directional icons must carry `rtl:-scale-x-100` themselves. */
export function renderButtonContent({
  children,
  icon,
  iconPosition = "end",
  isLoading = false,
}: ButtonContentOptions): ReactNode {
  const iconNode = isLoading ? (
    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
  ) : icon ? (
    <span
      className="inline-flex shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  return (
    <>
      {iconPosition === "start" && iconNode}
      <span>{children}</span>
      {iconPosition === "end" && iconNode}
    </>
  );
}

export interface ButtonProps
  extends ButtonStyleOptions,
    Omit<ButtonContentOptions, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    className,
    children,
    icon,
    iconPosition,
    isLoading,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {renderButtonContent({ children, icon, iconPosition, isLoading })}
    </button>
  );
});
