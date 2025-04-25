// app/actions/updateResume.ts
"use server";

import { prisma } from "@/lib/prisma";
import { TemplateProps } from "@/types/resume";

export async function updateResume(
  resumeId: string | string[],
  data: TemplateProps
) {
  try {
    // Ensure resumeId is a string
    const id = Array.isArray(resumeId) ? resumeId[0] : resumeId;

    // First, get the current resume to check for conflicts
    const currentResume = await prisma.resume.findUnique({
      where: { id },
      select: { updatedAt: true },
    });

    if (!currentResume) {
      return { success: false, error: "Resume not found" };
    }

    // Update the resume with optimistic locking
    const updatedResume = await prisma.resume.update({
      where: {
        id,
        updatedAt: currentResume.updatedAt // This ensures we're updating the latest version
      },
      data: {
        data: data as any,
        updatedAt: new Date(),
      },
    });

    return { success: true, resume: updatedResume };
  } catch (error) {
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return { success: false, error: "Resume not found" };
    }

    if (error instanceof Error && error.message.includes("updatedAt")) {
      return {
        success: false,
        error: "This resume was modified by another user. Please refresh the page to get the latest version."
      };
    }

    console.error("Error updating resume:", error);
    return {
      success: false,
      error: "Failed to update resume. Please try again."
    };
  }
}
