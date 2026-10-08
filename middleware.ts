import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/en") && !pathname.startsWith("/ar")) {
    const lastLocale = request.cookies.get("NEXT_LOCALE")?.value || "ar";

    const url = request.nextUrl.clone();
    url.pathname = `/${lastLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/ar" || pathname === "/en") {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/home`; // redirect to home
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
