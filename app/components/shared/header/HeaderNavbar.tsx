"use client";

import { useTranslations } from "next-intl";
import { FiArrowLeft, FiArrowRight, FiMenu } from "react-icons/fi";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../Logo";
import { HeaderNavDropdown, type HeaderNavDropdownItem } from "./HeaderNavDropdown";

export interface HeaderNavbarProps {
  isRtl: boolean;
  isScrolled?: boolean;
  solutions: HeaderNavDropdownItem[];
  products: HeaderNavDropdownItem[];
  onOpenMobileMenu: () => void;
}

export function HeaderNavbar({ isRtl, isScrolled = false, solutions, products, onOpenMobileMenu }: HeaderNavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    const basePath = href.split("#")[0].split("?")[0];
    if (basePath === "/home" || basePath === "/") {
      return pathname === "/home" || pathname === "/";
    }
    if (!basePath) return false;
    return pathname === basePath || pathname.startsWith(basePath + "/");
  };

  return (
    <div
      className={cn(
        "w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-surface/95 backdrop-blur-md border-edge/80 shadow-md"
          : "bg-surface border-edge/60 shadow-sm"
      )}
    >
      <div className="max-w-container mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Logo tone="light" />

        {/* Desktop Nav Items */}
        <nav aria-label={t("mainNav")} className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home Link */}
          <Link
            href="/home"
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              isActive("/home")
                ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
                : "text-body hover:text-secondary hover:scale-105"
            )}
          >
            {t("home")}
          </Link>

          {/* Solutions Dropdown */}
          <HeaderNavDropdown label={t("solutionsDropdown")} items={solutions} />

          {/* Products Dropdown */}
          <HeaderNavDropdown label={t("productsDropdown")} items={products} />

          {/* Single Nav Links */}
          <Link
            href="/products/polyline"
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              isActive("/products/polyline")
                ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
                : "text-body hover:text-secondary hover:scale-105"
            )}
          >
            {t("polyline")}
          </Link>

          <Link
            href="/store-pricing"
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              isActive("/store-pricing")
                ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
                : "text-body hover:text-secondary hover:scale-105"
            )}
          >
            {t("storePricing")}
          </Link>

          <Link
            href="/jobs"
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              isActive("/jobs")
                ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
                : "text-body hover:text-secondary hover:scale-105"
            )}
          >
            {t("jobs")}
          </Link>

          <Link
            href="/about"
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-xl outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              isActive("/about")
                ? "text-secondary font-bold after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-secondary after:rounded-full"
                : "text-body hover:text-secondary hover:scale-105"
            )}
          >
            {t("about")}
          </Link>
        </nav>

        {/* Action CTA & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/book-session"
            className="group inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-surface text-[11px] sm:text-xs lg:text-sm font-bold px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-md shadow-secondary/20 hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap shrink-0 max-w-[170px] sm:max-w-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
          >
            <span className="truncate">{t("bookDiagnosticCta")}</span>
            {isRtl ? (
              <FiArrowLeft className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:-translate-x-1 shrink-0" />
            ) : (
              <FiArrowRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
            )}
          </Link>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label={t("openMenu")}
            className="p-2 sm:p-2.5 rounded-xl border border-edge text-body hover:bg-surface-alt active:scale-95 transition-all duration-200 lg:hidden cursor-pointer shrink-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
          >
            <FiMenu className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
