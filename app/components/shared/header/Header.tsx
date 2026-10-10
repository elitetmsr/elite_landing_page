"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PRODUCTS_NAV_ITEMS, SOLUTIONS_NAV_ITEMS } from "@/lib/constants";
import { HeaderTopBar } from "./HeaderTopBar";
import { HeaderNavbar } from "./HeaderNavbar";
import { HeaderMobileDrawer } from "./HeaderMobileDrawer";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: nextLocale });
  };

  const isRtl = locale === "ar";

  const solutions = SOLUTIONS_NAV_ITEMS.map((item) => ({
    title: t(`solutionsItems.${item.key}`),
    href: item.href,
  }));

  const products = PRODUCTS_NAV_ITEMS.map((item) => ({
    title: t(`productsItems.${item.key}`),
    href: item.href,
  }));

  return (
    <header className={cn("fixed top-0 inset-x-0 z-[100] w-full transition-all duration-300", isScrolled ? "shadow-lg" : "shadow-sm")}>
      <HeaderTopBar onToggleLanguage={toggleLanguage} />

      <HeaderNavbar
        isRtl={isRtl}
        isScrolled={isScrolled}
        solutions={solutions}
        products={products}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <HeaderMobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isRtl={isRtl}
        solutions={solutions}
        products={products}
        onToggleLanguage={toggleLanguage}
      />
    </header>
  );
}
