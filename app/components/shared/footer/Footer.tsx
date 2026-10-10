"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  COMPANY_INFO,
  COMPANY_NAV_ITEMS,
  PRODUCTS_NAV_ITEMS,
  SOCIAL_LINKS,
  SOLUTIONS_NAV_ITEMS,
  STORE_PRICING_HREF,
} from "@/lib/constants";
import { FooterBrandColumn } from "./FooterBrandColumn";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterBottomBar } from "./FooterBottomBar";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const products = [
    ...PRODUCTS_NAV_ITEMS.map((item) => ({
      label: tNav(`productsItems.${item.key}`),
      href: item.href,
    })),
    { label: tNav("storePricing"), href: STORE_PRICING_HREF },
  ];

  const solutions = SOLUTIONS_NAV_ITEMS.map((item) => ({
    label: tNav(`solutionsItems.${item.key}`),
    href: item.href,
  }));

  const company = COMPANY_NAV_ITEMS.map((item) => ({
    label: tNav(item.key),
    href: item.href,
    external: "external" in item ? item.external : undefined,
  }));

  const social = SOCIAL_LINKS;

  return (
    <footer className="bg-surface-dark text-content-dark border-t border-edge/20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <FooterBrandColumn
            tagline={t("tagline")}
            address={COMPANY_INFO.address[isRtl ? "ar" : "en"]}
          />

          <FooterNavColumn title={tNav("productsDropdown")} items={products} />
          <FooterNavColumn title={tNav("solutionsDropdown")} items={solutions} />
          <FooterNavColumn title={tNav("about")} items={company} />
          <FooterNavColumn title={t("followUs")} items={social} />
        </div>

        <FooterBottomBar
          rightsText={t("rights", {
            year: new Date().getFullYear(),
            brand: COMPANY_INFO.brandName[isRtl ? "ar" : "en"],
          })}
          commercialRegister={COMPANY_INFO.commercialRegister}
        />
      </div>
    </footer>
  );
}
