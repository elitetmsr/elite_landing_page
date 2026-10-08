import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { COMPANY_INFO, type AppLocale } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** "dark" = placed on a navy/photo background, "light" = placed on a light background. */
  tone?: "light" | "dark";
  className?: string;
}

export function Logo({ tone = "light", className }: LogoProps) {
  const locale = useLocale() as AppLocale;
  const logoSrc = tone === "dark" ? "/images/logo-light.png" : "/images/logo.png";
  const brandName = COMPANY_INFO.brandName[locale];

  return (
    <Link href="/home" className={cn("group inline-flex items-center gap-2 rounded-xl transition-transform hover:opacity-95", className)}>
      <Image
        src={logoSrc}
        alt={brandName}
        width={180}
        height={105}
        priority
        className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
}
