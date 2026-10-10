"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEGAL_NAV_ITEMS } from "@/lib/constants";

export interface FooterBottomBarProps {
  rightsText: string;
  commercialRegister: string;
}

export function FooterBottomBar({
  rightsText,
  commercialRegister,
}: FooterBottomBarProps) {
  const t = useTranslations("footer");

  return (
    <div className="mt-12 pt-6 border-t border-edge/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-content-dark/80">
      <div className="flex flex-wrap items-center gap-4">
        <span>{rightsText}</span>
        {LEGAL_NAV_ITEMS.map((item) => (
          <span key={item.key} className="inline-flex items-center gap-4">
            <span className="hidden sm:inline">·</span>
            <Link href={item.href} className="hover:text-surface transition-colors">
              {t(item.key)}
            </Link>
          </span>
        ))}
      </div>

      <div>
        {t("commercialRegister")}: {commercialRegister}
      </div>
    </div>
  );
}
