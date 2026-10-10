"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
  FiGlobe,
  FiHeadphones,
  FiLogIn,
  FiX,
} from "react-icons/fi";
import { Link, usePathname } from "@/i18n/navigation";
import { COMMUNITY_URLS, CONTACT_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "../Logo";
import { type HeaderNavDropdownItem } from "./HeaderNavDropdown";

export interface HeaderMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl: boolean;
  solutions: HeaderNavDropdownItem[];
  products: HeaderNavDropdownItem[];
  onToggleLanguage: () => void;
}

export function HeaderMobileDrawer({
  isOpen,
  onClose,
  isRtl,
  solutions,
  products,
  onToggleLanguage,
}: HeaderMobileDrawerProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    const basePath = href.split("#")[0].split("?")[0];
    if (basePath === "/home" || basePath === "/") {
      return pathname === "/home" || pathname === "/";
    }
    if (!basePath) return false;
    return pathname === basePath || pathname.startsWith(basePath + "/");
  };

  const isSolutionsActive = solutions.some((item) => isActive(item.href));
  const isProductsActive = products.some((item) => isActive(item.href));

  useEffect(() => {
    if (isSolutionsActive) setIsSolutionsOpen(true);
    if (isProductsActive) setIsProductsOpen(true);
  }, [pathname, isSolutionsActive, isProductsActive]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[120] lg:hidden">
      <DialogBackdrop transition className="fixed inset-0 bg-primary-deep/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-y-0 end-0 flex w-full max-w-xs">
        <DialogPanel transition className="flex h-full w-full flex-col bg-surface shadow-2xl p-5 transition-transform duration-300 ease-out ltr:data-[closed]:translate-x-full rtl:data-[closed]:-translate-x-full">
          <div className="flex items-center justify-between border-b pb-4 border-edge">
            <Logo tone="light" />
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-content hover:text-primary rounded-xl hover:bg-surface-alt transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 cursor-pointer"
            >
              <FiX className="size-5" />
            </button>
          </div>

          <nav
            aria-label={t("mainNav")}
            className="flex-1 overflow-y-auto py-4 space-y-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* CTA */}
            <Link
              href="/book-session"
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-info text-secondary font-bold text-sm mb-3 shadow-sm hover:scale-[1.01] transition-transform outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
            >
              <span>{t("bookDiagnosticCta")}</span>
              {isRtl ? <FiArrowLeft className="size-4" /> : <FiArrowRight className="size-4" />}
            </Link>

            {/* Home */}
            <Link
              href="/home"
              onClick={onClose}
              className={cn(
                "block p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                isActive("/home")
                  ? "bg-secondary/10 text-secondary font-bold"
                  : "font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1"
              )}
            >
              {t("home")}
            </Link>

            {/* Solutions Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className={cn(
                  "flex w-full items-center justify-between p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 cursor-pointer select-none",
                  isSolutionsActive
                    ? "bg-secondary/10 text-secondary font-bold"
                    : "font-medium text-body hover:bg-surface-alt"
                )}
              >
                <span>{t("solutionsDropdown")}</span>
                <FiChevronDown
                  className={cn(
                    "size-4 transition-transform duration-300",
                    isSolutionsOpen && "rotate-180",
                    isSolutionsActive ? "text-secondary" : "text-content/60"
                  )}
                />
              </button>

              {isSolutionsOpen && (
                <div className="ps-4 pe-2 py-1 space-y-1 border-s-2 border-edge/60 ms-3 mt-1">
                  {solutions.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block py-2 px-3 text-xs sm:text-sm rounded-lg transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                          active
                            ? "bg-secondary/10 text-secondary font-bold"
                            : "text-content hover:text-secondary hover:bg-surface-alt"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Products Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={cn(
                  "flex w-full items-center justify-between p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 cursor-pointer select-none",
                  isProductsActive
                    ? "bg-secondary/10 text-secondary font-bold"
                    : "font-medium text-body hover:bg-surface-alt"
                )}
              >
                <span>{t("productsDropdown")}</span>
                <FiChevronDown
                  className={cn(
                    "size-4 transition-transform duration-300",
                    isProductsOpen && "rotate-180",
                    isProductsActive ? "text-secondary" : "text-content/60"
                  )}
                />
              </button>

              {isProductsOpen && (
                <div className="ps-4 pe-2 py-1 space-y-1 border-s-2 border-edge/60 ms-3 mt-1">
                  {products.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block py-2 px-3 text-xs sm:text-sm rounded-lg transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                          active
                            ? "bg-secondary/10 text-secondary font-bold"
                            : "text-content hover:text-secondary hover:bg-surface-alt"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Single Links */}
            <Link
              href="/products/polyline"
              onClick={onClose}
              className={cn(
                "block p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                isActive("/products/polyline")
                  ? "bg-secondary/10 text-secondary font-bold"
                  : "font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1"
              )}
            >
              {t("polyline")}
            </Link>

            <Link
              href="/store-pricing"
              onClick={onClose}
              className={cn(
                "block p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                isActive("/store-pricing")
                  ? "bg-secondary/10 text-secondary font-bold"
                  : "font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1"
              )}
            >
              {t("storePricing")}
            </Link>

            <a
              href={COMMUNITY_URLS.jobs}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block p-3 rounded-xl font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1 transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
            >
              {t("careers")}
            </a>

            <Link
              href="/about"
              onClick={onClose}
              className={cn(
                "block p-3 rounded-xl transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                isActive("/about")
                  ? "bg-secondary/10 text-secondary font-bold"
                  : "font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1"
              )}
            >
              {t("about")}
            </Link>

            <a
              href={COMMUNITY_URLS.home}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block p-3 rounded-xl font-medium text-body hover:bg-surface-alt hover:translate-x-1 rtl:hover:-translate-x-1 transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
            >
              {t("community")}
            </a>
          </nav>

          <div className="border-t border-edge pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <a
                href={COMMUNITY_URLS.login}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-edge text-xs font-semibold text-body hover:bg-surface-alt transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
              >
                <FiLogIn className="size-3.5 text-secondary" />
                <span>{t("login")}</span>
              </a>
              <Link
                href={CONTACT_HREF}
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-edge text-xs font-semibold text-body hover:bg-surface-alt transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
              >
                <FiHeadphones className="size-3.5 text-secondary" />
                <span>{t("support")}</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-edge text-sm font-medium text-body hover:bg-surface-alt transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 cursor-pointer"
            >
              <FiGlobe className="size-4 text-secondary" />
              <span>{t("languageName")}</span>
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
