"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Checks if the user has reached their resume limit based on their subscription plan
 * This version is used on the server side only.
 */
export async function checkResumeLimit(userId: string): Promise<{
  canCreate: boolean;
  currentCount: number;
  limit: number;
  needsUpgrade: boolean;
}> {
  try {
    // Get the user's subscription from auth
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    // Count the user's existing resumes
    const resumeCount = await prisma.resume.count({
      where: { userId },
    });

    // Get the user's active subscription (default to free plan if none found)
    const userSubscription = await prisma.subscription.findFirst({
      where: {
        referenceId: userId,
        status: { in: ["active", "trialing"] },
      },
    });

    // Default free plan has a limit of 3 resumes
    const defaultLimit = 3;

    // If the user has a pro subscription, they have unlimited resumes
    const isPro = userSubscription?.plan === "pro";
    const limit = isPro ? 99 : defaultLimit;

    // Check if they need to upgrade (hit the limit on free plan)
    const needsUpgrade = resumeCount >= limit && !isPro;

    return {
      canCreate: resumeCount < limit || isPro,
      currentCount: resumeCount,
      limit,
      needsUpgrade,
    };
  } catch (error) {
    console.error("Error checking resume limits:", error);
    // Default to allowing creation in case of errors
    return {
      canCreate: true,
      currentCount: 0,
      limit: 3,
      needsUpgrade: false,
    };
  }
}
