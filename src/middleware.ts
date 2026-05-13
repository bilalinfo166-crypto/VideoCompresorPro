import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales except English (which is default/unprefixed)
export const locales = [
  "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", 
  "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", 
  "el", "uk", "sv", "he", "da", "fi", "no", "cs", "hu"
];

function getLocale(request: NextRequest): string | undefined {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return undefined;
  
  // Simple check for supported languages
  // Skip auto-detection for 'hi' as requested (default to English for South Asia)
  const skipDetection = ['hi', 'ur'];
  
  for (const locale of locales) {
    if (skipDetection.includes(locale)) continue;
    if (acceptLanguage.toLowerCase().includes(locale)) {
      return locale;
    }
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, Next.js internals, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') || 
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Handle root redirection based on language
  if (pathname === '/') {
    const preferredLocale = getLocale(request);
    if (preferredLocale && preferredLocale !== 'en') {
      return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);

  // Check if the pathname starts with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (!pathnameIsMissingLocale) {
    // Extract the locale
    const pathParts = pathname.split('/');
    const locale = pathParts[1]; // e.g., 'es'
    requestHeaders.set('x-next-locale', locale);
  } else {
    // If no locale in URL, default is 'en'
    requestHeaders.set('x-next-locale', 'en');
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

