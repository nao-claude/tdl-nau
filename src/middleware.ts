import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ENGLISH_PATH_PREFIX = "/en";

function isEnglishPreferred(request: NextRequest): boolean {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  // Check if the first preferred language is English
  return /\ben(-[a-z]{2})?\b/i.test(acceptLanguage.split(",")[0]);
}

function getLocaleFromPath(pathname: string): "en" | "ja" {
  return pathname.startsWith(ENGLISH_PATH_PREFIX) ? "en" : "ja";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Determine current locale from path
  const currentLocale = getLocaleFromPath(pathname);

  // Forward locale info to server components via request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", currentLocale);

  // Skip if already on /en path - just pass locale header
  if (pathname.startsWith(ENGLISH_PATH_PREFIX)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Only redirect root and non-API, non-static paths
  const shouldConsiderRedirect =
    pathname === "/" ||
    (pathname.startsWith("/") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/privacy"));

  if (!shouldConsiderRedirect) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Check if user has previously chosen a locale via cookie
  const localeCookie = request.cookies.get("preferred-locale")?.value;
  if (localeCookie === "ja") {
    // User explicitly chose Japanese, don't redirect
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }
  if (localeCookie === "en") {
    // User explicitly chose English, redirect to /en
    const url = request.nextUrl.clone();
    url.pathname = ENGLISH_PATH_PREFIX + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }

  // No cookie: check Accept-Language
  if (isEnglishPreferred(request)) {
    const url = request.nextUrl.clone();
    url.pathname = ENGLISH_PATH_PREFIX + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.ico$).*)",
  ],
};
