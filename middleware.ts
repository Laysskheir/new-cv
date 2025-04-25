import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "./lib/auth-types";
import { getSessionCookie } from "better-auth/cookies";

// Constants for paths
const AUTH_PATHS = ['/sign-in', '/sign-up', '/forgot-password'];
const PROTECTED_PATHS = ['/dashboard', '/dashboard/resumes', '/dashboard/settings', '/onboarding'];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const currentPath = request.nextUrl.pathname;

  // Set security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Allow access to auth pages without session check
  if (AUTH_PATHS.some(path => currentPath.startsWith(path))) {
    if (!sessionCookie) {
      return response;
    }
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { data: session, error } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        cache: 'no-store',
      }
    );

    if (error) {
      console.error('Session validation error:', error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const isAuthRequired = PROTECTED_PATHS.some(path => currentPath.startsWith(path));
    const isAuthPage = AUTH_PATHS.some(path => currentPath.startsWith(path));

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (session?.user && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard/resumes", request.url));
    }

    // If path requires auth but user is not authenticated, redirect to sign-in
    if (isAuthRequired && !session?.user) {
      const returnUrl = encodeURIComponent(currentPath);
      return NextResponse.redirect(new URL(`/sign-in?returnUrl=${returnUrl}`, request.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        path: currentPath
      });
    }
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/forgot-password/:path*",
  ],
};
