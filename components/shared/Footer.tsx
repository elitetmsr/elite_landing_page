import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { COMMUNITY_URLS, COMPANY_INFO, CONTACT_HREF, NAV_LINKS, type AppLocale } from "@/lib/constants";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const linkClasses =
  "inline-flex min-h-8 items-center text-[0.95rem] text-content transition-colors duration-200 hover:text-primary";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as AppLocale;
  const brand = COMPANY_INFO.brandName[locale];

  const communityLinks = [
    { label: t("ideas"), href: COMMUNITY_URLS.ideas },
    { label: t("jobs"), href: COMMUNITY_URLS.jobs },
    { label: t("aboutPlatform"), href: COMMUNITY_URLS.about },
  ];

  return (
    <footer className="relative border-t border-edge bg-surface-alt">
      <Container className="py-14 lg:py-16">
        {/* Newsletter band */}
        <div className="mb-14 flex flex-col gap-6 rounded-3xl border border-edge bg-surface p-6 shadow-card sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-bold text-primary">{t("newsletter.title")}</h2>
            <p className="mt-1.5 text-content">{t("newsletter.description")}</p>
          </div>
          <div className="w-full lg:max-w-lg">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs leading-loose text-content">{t("tagline")}</p>
            <p className="mt-4 text-sm text-content">
              {t("commercialRegister")}: <span dir="ltr">{COMPANY_INFO.commercialRegister}</span>
            </p>
          </div>

          <nav aria-label={t("explore")} className="lg:col-span-2">
            <h2 className="mb-4 font-bold text-primary">{t("explore")}</h2>
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className={linkClasses}>
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={CONTACT_HREF} className={linkClasses}>
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t("communityTitle")} className="lg:col-span-2">
            <h2 className="mb-4 font-bold text-primary">{t("communityTitle")}</h2>
            <ul className="space-y-1.5">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="mb-4 font-bold text-primary">{t("contactTitle")}</h2>
            <ul className="space-y-4 text-content">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-secondary" aria-hidden="true" />
                <address className="not-italic leading-loose">{COMPANY_INFO.address[locale]}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-secondary" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  {COMPANY_INFO.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} dir="ltr" className="w-fit transition-colors hover:text-primary">
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${COMPANY_INFO.email}`} dir="ltr" className="transition-colors hover:text-primary">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-edge">
        <Container className="py-6 text-sm text-content">
          <p>{t("rights", { year: new Date().getFullYear(), brand })}</p>
        </Container>
      </div>
    </footer>
  );
}
