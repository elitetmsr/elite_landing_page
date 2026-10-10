import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "center" | "start";
  /** "dark" renders on navy backgrounds (white text). */
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

/** The only way to render section titles (elite-rules.txt §7). */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl sm:mb-14",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold",
            isDark ? "bg-white/10 text-secondary" : "bg-secondary/10 text-secondary-dark"
          )}
        >
          <span className="size-1.5 rounded-full bg-secondary" aria-hidden="true" />
          {eyebrow}
        </p>
      )}

      <Heading
        className={cn(
          "text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
          isDark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Heading>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-loose sm:text-lg",
            isDark ? "text-white/75" : "text-content"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
