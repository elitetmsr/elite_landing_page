import type { Metadata } from "next";
import "../globals.css";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { getMessages } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import Providers from "./providers/providers";
import { Toaster } from "react-hot-toast";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

// Favicon is TBD until the owner provides logo files (elite-rules.txt §11).
export const metadata: Metadata = {
  title: "Elite Tech",
  description: "",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale = routing.defaultLocale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages: AbstractIntlMessages = await getMessages({ locale });

  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={ibmArabic.variable}
    >
      <body className="font-ibm">
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
