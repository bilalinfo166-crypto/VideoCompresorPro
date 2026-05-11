import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales except English (which is default/unprefixed)
export const locales = [
  "ur", "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", 
  "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", 
  "el", "uk", "sv"
];

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

  // Check if the pathname starts with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (!pathnameIsMissingLocale) {
    // Extract the locale and the actual path
    const pathParts = pathname.split('/');
    const locale = pathParts[1]; // e.g., 'es'
    const actualPath = pathname.replace(`/${locale}`, '') || '/'; // e.g., '/video-cutter' or '/'

    // Clone the URL and set the new pathname to the actual (unprefixed) path
    const url = request.nextUrl.clone();
    url.pathname = actualPath;

    // Rewrite the request to the actual path but pass the locale in headers
    const response = NextResponse.rewrite(url);
    response.headers.set('x-next-locale', locale);
    
    return response;
  }

  // If no locale in URL, default is 'en'
  const response = NextResponse.next();
  response.headers.set('x-next-locale', 'en');
  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
