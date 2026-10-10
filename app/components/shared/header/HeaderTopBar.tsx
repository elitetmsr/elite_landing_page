"use client";

import { useTranslations } from "next-intl";
import { FiGlobe, FiHeadphones, FiLogIn } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { COMMUNITY_URLS, CONTACT_HREF } from "@/lib/constants";

export interface HeaderTopBarProps {
  onToggleLanguage: () => void;
}

export function HeaderTopBar({ onToggleLanguage }: HeaderTopBarProps) {
  const t = useTranslations("nav");

  return (
    <div className="hidden lg:block bg-surface-dark border-b border-edge/20 text-content-dark text-xs py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container mx-auto flex items-center justify-between gap-4">
        {/* Top Utility Links */}
        <div className="flex items-center gap-4 sm:gap-6 font-medium">
          <a
            href={COMMUNITY_URLS.home}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-all duration-200 hover:scale-105 inline-block"
          >
            {t("community")}
          </a>
          <span className="text-edge/30">|</span>
          <a
            href={COMMUNITY_URLS.jobs}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-all duration-200 hover:scale-105 inline-block"
          >
            {t("careers")}
          </a>
          <span className="text-edge/30">|</span>
          <Link href="/book-session" className="hover:text-secondary transition-all duration-200 hover:scale-105 inline-block">
            {t("contact")}
          </Link>
        </div>

        {/* Top Auth, Support, Lang */}
        <div className="flex items-center gap-3 sm:gap-5 font-medium">
          <a
            href={COMMUNITY_URLS.login}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-surface transition-all duration-200 hover:scale-105 group"
          >
            <FiLogIn className="size-3.5 text-secondary transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            <span>{t("login")}</span>
          </a>

          <span className="text-edge/30">|</span>

          <Link
            href={CONTACT_HREF}
            className="inline-flex items-center gap-1.5 hover:text-surface transition-all duration-200 hover:scale-105 group"
          >
            <FiHeadphones className="size-3.5 text-secondary transition-transform duration-200 group-hover:rotate-12" />
            <span>{t("support")}</span>
          </Link>

          <span className="text-edge/30">|</span>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="inline-flex items-center gap-1.5 hover:text-secondary transition-all duration-200 hover:scale-105 cursor-pointer group"
          >
            <FiGlobe className="size-3.5 text-secondary transition-transform duration-300 group-hover:rotate-180" />
            <span>{t("languageName")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
