"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface LocaleSwitcherProps {
  /** "dark" = over the hero video (white text). */
  tone?: "light" | "dark";
  className?: string;
}

export function LocaleSwitcher({ tone = "light", className }: LocaleSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    setCookie("NEXT_LOCALE", nextLocale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", nextLocale);
    }
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-sm font-bold transition-colors duration-200 disabled:opacity-60",
        tone === "dark"
          ? "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          : "border-edge bg-surface text-primary hover:border-primary/30 hover:bg-surface-info",
        className
      )}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={locale === "ar" ? "en" : "ar"}>{t("languageName")}</span>
    </button>
  );
}
