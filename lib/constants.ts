/**
 * Single source of truth for company data, navigation and external links.
 * Values marked TBD still need owner confirmation (see elite-rules.txt §11).
 */

export type AppLocale = "ar" | "en";

export interface LocalizedText {
  ar: string;
  en: string;
}

export const COMPANY_INFO = {
  /** Official Arabic spelling is TBD (إيليت تك vs إليت تك). Change it here only. */
  brandName: { ar: "إيليت تك", en: "Elite Tech" } satisfies LocalizedText,
  legalName: { ar: "إيليت تك لتقنية المعلومات", en: "Elite Tech IT" } satisfies LocalizedText,
  address: {
    ar: "9/H/5 قسم اللاسلكي، شارع أحمد عبد العظيم، بجوار شارع النصر الرئيسي، المعادي، القاهرة",
    en: "9/H/5 El-Laselky Division, Ahmed Abdel Azim St., Off Main El-Nasr St., Maadi, Cairo",
  } satisfies LocalizedText,
  commercialRegister: "290259",
  phones: ["+201131340647", "+201034360644"],
  whatsappPhone: "201131340647",
  email: "info@elitemsr.com",
} as const;

/** Live community platform. Used until the (community) route group is built. */
export const COMMUNITY_URLS = {
  home: "https://community.elitemsr.com",
  register: "https://community.elitemsr.com/register",
  login: "https://community.elitemsr.com/login",
  ideas: "https://community.elitemsr.com/ideas",
  jobs: "https://community.elitemsr.com/jobs",
  about: "https://community.elitemsr.com/about",
} as const;

export const MEDIA = {
  heroVideo: "/videos/hero.mp4",
  heroPoster: "/images/hero-office.png",
  enterprise: "/images/enterprise-meeting.png",
  community: "/images/community-meetup.png",
  product: "/images/mobile-web-product.png",
  mentoring: "/images/mentoring-session.png",
} as const;

export const API_ENDPOINTS = {
  /** TBD: backend endpoint for newsletter sign-ups. */
  newsletter: "/newsletter/subscribe",
} as const;

export interface NavLinkItem {
  id: string;
  /** Key inside the "nav" messages namespace. */
  labelKey: "solutions" | "techPlatforms" | "projects" | "careers" | "about" | "community";
  href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "solutions", labelKey: "solutions", href: "/solutions" },
  { id: "tech-platforms", labelKey: "techPlatforms", href: "/tech-platforms" },
  { id: "projects", labelKey: "projects", href: "/projects" },
  { id: "careers", labelKey: "careers", href: "/careers" },
  { id: "about", labelKey: "about", href: "/about" },
  { id: "community", labelKey: "community", href: "/community" },
];

export const CONTACT_HREF = "/contact";

/** Technologies named on elitemsr.com/our-services and in community idea stacks. */
export const TECH_STACK: string[] = [
  "Laravel",
  "React",
  "Next.js",
  "Flutter",
  "Odoo",
  "ERPNext",
  "Python",
  "Django",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "OpenAI API",
  "Figma",
];
