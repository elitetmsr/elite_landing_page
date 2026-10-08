import { notFound } from "next/navigation";

/**
 * Catches every unmatched path under a locale (e.g. /en/careers) and throws notFound(),
 * so the localized app/[locale]/not-found.tsx renders inside the locale layout
 * instead of Next's root fallback.
 */
export default function CatchAllPage() {
  notFound();
}
