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
  phones: ["+20 103 436 0644", "+20 113 134 0647"],
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
  labelKey: "solutions" | "techPlatforms" | "projects" | "jobs" | "about" | "community";
  href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "solutions", labelKey: "solutions", href: "/solutions" },
  { id: "tech-platforms", labelKey: "techPlatforms", href: "/tech-platforms" },
  { id: "projects", labelKey: "projects", href: "/projects" },
  { id: "jobs", labelKey: "jobs", href: "/jobs" },
  { id: "about", labelKey: "about", href: "/about" },
  { id: "community", labelKey: "community", href: "/community" },
];

export const SOLUTIONS_NAV_ITEMS = [
  { key: "consulting", href: "/solutions/consulting" },
  { key: "web", href: "/solutions/web-apps" },
  { key: "mobile", href: "/solutions/mobile-apps" },
  { key: "erp", href: "/solutions/erp-systems" },
  { key: "ai", href: "/solutions/ai-automation" },
] as const;

export const PRODUCTS_NAV_ITEMS = [
  { key: "polyline", href: "/products/polyline" },
  { key: "bareeq", href: "/products/bareeq-x" },
  { key: "amanCar", href: "/products/aman-car" },
  { key: "maher", href: "/products/maher-ai" },
] as const;

export const STORE_PRICING_HREF = "/store-pricing";

export const COMPANY_NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "community", href: COMMUNITY_URLS.home, external: true },
  { key: "jobs", href: "/jobs" },
  { key: "contact", href: "/book-session" },
] as const;

export const LEGAL_NAV_ITEMS = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/elitemsr", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/company/elitemsr", external: true },
  { label: "Instagram", href: "https://instagram.com/elitemsr", external: true },
  { label: "TikTok", href: "https://tiktok.com/@elitemsr", external: true },
] as const;

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
