//middleware.ts

const protectedRoutes = ["/dashboard", "/editor"];
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { prisma } from "@/lib/prisma";

export async function middleware(request: NextRequest) {
  const cookies = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Handle auth routes
  // if (authRoutes.some((route) => pathname.startsWith(route))) {
  //   if (cookies) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  //   return NextResponse.next();
  // }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!cookies) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Check if user has completed onboarding
    const session = await prisma.session.findUnique({
      where: { token: cookies },
      include: { user: true },
    });

    if (session?.user && !session.user.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/onboarding",
  ],
};
