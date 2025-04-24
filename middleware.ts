import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "./lib/auth-types";

export async function middleware(request: NextRequest) {
  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    // Check if path requires authentication
    const isAuthRequired = request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/onboarding");

    // Check if path is an auth page
    const isAuthPage = request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up") ||
      request.nextUrl.pathname.startsWith("/forgot-password");

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (session?.user && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard/resumes", request.url));
    }

    // If path requires auth but user is not authenticated, redirect to sign-in
    if (isAuthRequired && !session?.user) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/sign-in?returnUrl=${returnUrl}`, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to error page or login
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
