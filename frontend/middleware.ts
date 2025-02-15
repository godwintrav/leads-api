import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { paths } from "./constants/paths";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Skip middleware for login and signup pages to avoid redirect loop
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.next();
  }

  // If no token cookie is present, redirect to login page
  if (!token) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(
      new URL(`${paths.auth.login}?from=${encodeURIComponent(from)}`, loginUrl)
    );
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
