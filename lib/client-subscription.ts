"use client";

import { client } from "@/lib/auth-client";

/**
 * Client-side function to determine subscription limits for the current user.
 * This is safe to use in client components.
 */
export async function getSubscriptionLimits(): Promise<{
  isPro: boolean;
  limit: number;
  canCreateMore: boolean;
  resumeCount: number;
}> {
  try {
    // Get subscription data from client API
    const { data: subscriptions } = await client.subscription.list();

    // Get the current user's resume count via the DOM (client-side approach)
    const resumeElements = document.querySelectorAll(
      '[data-resume-card="true"]'
    );
    const resumeCount = resumeElements.length;

    // Check if user has a pro subscription
    const isPro =
      subscriptions?.some(
        (sub) =>
          sub.plan === "pro" &&
          (sub.status === "active" || sub.status === "trialing")
      ) || false;

    // Free users have a limit of 3 resumes, Pro users get 99 (effectively unlimited)
    const limit = isPro ? 99 : 3;

    return {
      isPro,
      limit,
      canCreateMore: isPro || resumeCount < limit,
      resumeCount,
    };
  } catch (error) {
    console.error("Error checking subscription limits:", error);
    // Default to free plan limits on error
    return {
      isPro: false,
      limit: 3,
      canCreateMore: true, // Default to allowing creation to prevent blocking legitimate users
      resumeCount: 0,
    };
  }
}
