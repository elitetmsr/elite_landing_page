import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import {
  buttonClasses,
  renderButtonContent,
  type ButtonContentOptions,
  type ButtonStyleOptions,
} from "./Button";

export interface LinkButtonProps extends ButtonStyleOptions, Omit<ButtonContentOptions, "children" | "isLoading"> {
  href: string;
  children: ReactNode;
  /** Opens in a new tab with safe rel attributes (used for the live community site). */
  external?: boolean;
  onClick?: () => void;
}

/** Looks exactly like <Button> but navigates. Internal links go through i18n navigation. */
export function LinkButton({
  href,
  external = false,
  onClick,
  variant,
  size,
  fullWidth,
  className,
  children,
  icon,
  iconPosition,
}: LinkButtonProps) {
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const content = renderButtonContent({ children, icon, iconPosition });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
