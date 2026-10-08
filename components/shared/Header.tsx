"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowRight, Menu, Users, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { COMMUNITY_URLS, CONTACT_HREF, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LinkButton } from "./LinkButton";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

export interface HeaderProps {
  /** Transparent with white text while at the top of a page that starts with a dark hero. */
  transparentOnTop?: boolean;
}

const SCROLL_THRESHOLD = 24;

export function Header({ transparentOnTop = false }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = !transparentOnTop || isScrolled;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          isSolid
            ? "border-b border-edge/80 bg-surface/90 shadow-[0_8px_30px_-20px_rgb(var(--primary)/0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-container items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo tone={isSolid ? "light" : "dark"} />

          <nav aria-label={t("mainNav")} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex min-h-10 items-center rounded-lg px-3.5 text-[0.95rem] font-semibold transition-colors duration-200",
                        isSolid
                          ? active
                            ? "text-primary"
                            : "text-content hover:text-primary"
                          : active
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                      )}
                    >
                      {t(link.labelKey)}
                      <span
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-secondary transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher tone={isSolid ? "light" : "dark"} />
            <LinkButton href={CONTACT_HREF} variant="secondary" size="sm" className="hidden sm:inline-flex">
              {t("contact")}
            </LinkButton>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={isMenuOpen}
              className={cn(
                "grid size-10 place-items-center rounded-xl border transition-colors xl:hidden",
                isSolid
                  ? "border-edge bg-surface text-primary hover:bg-surface-info"
                  : "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Dialog open={isMenuOpen} onClose={setIsMenuOpen} className="relative z-[60] xl:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-primary-deep/50 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-y-0 end-0 flex w-full max-w-sm">
          <DialogPanel
            transition
            className="flex h-full w-full flex-col bg-surface shadow-lift transition-transform duration-300 ease-out ltr:data-[closed]:translate-x-full rtl:data-[closed]:-translate-x-full"
          >
            <div className="flex h-[var(--header-height)] items-center justify-between border-b border-edge px-5">
              <DialogTitle className="sr-only">{t("mainNav")}</DialogTitle>
              <Logo />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("closeMenu")}
                className="grid size-10 place-items-center rounded-xl border border-edge text-primary hover:bg-surface-info"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={t("mainNav")} className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-xl px-4 font-semibold transition-colors",
                          active ? "bg-surface-info text-primary" : "text-body hover:bg-surface-alt"
                        )}
                      >
                        {t(link.labelKey)}
                        <ArrowRight className="size-4 text-content/60 rtl:-scale-x-100" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-2 border-t border-edge p-5">
              <LinkButton href={CONTACT_HREF} variant="secondary" fullWidth onClick={() => setIsMenuOpen(false)}>
                {t("contact")}
              </LinkButton>
              <LinkButton
                href={COMMUNITY_URLS.register}
                external
                variant="outline"
                fullWidth
                icon={<Users className="size-4" />}
                iconPosition="start"
              >
                {t("joinCommunity")}
              </LinkButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
