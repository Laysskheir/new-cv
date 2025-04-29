"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkResumeLimit } from "@/lib/subscription-utils";

export async function createResume(
  prevState: any,
  formData: { title: string; slug: string }
) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user?.id) {
    return { error: "You must be logged in to create a resume" };
  }

  const { title, slug } = formData;

  if (!title || !slug) {
    return { error: "Title and slug are required" };
  }

  try {
    // Check if the user has reached their resume limit
    const { canCreate, needsUpgrade, currentCount, limit } =
      await checkResumeLimit(session.user.id);

    if (!canCreate) {
      return {
        error: `You've reached your limit of ${limit} resumes on the free plan.`,
        needsUpgrade: true,
        currentCount,
        limit,
      };
    }

    const resume = await prisma.resume.create({
      data: {
        title,
        slug,
        userId: session.user.id,
        data: {},
      },
    });

    revalidatePath("/dashboard/resumes");

    return {
      success: true,
      message: "Resume created successfully",
      resumeId: resume.id,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { error: `Failed to create resume: ${errorMessage}` };
  }
}
