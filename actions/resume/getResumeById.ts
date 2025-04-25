"use server";

import { prisma } from "@/lib/prisma";

export async function getResumeById(resumeId: string | string[]) {
  try {
    const id = Array.isArray(resumeId) ? resumeId[0] : resumeId;

    if (!id) {
      return { success: false, error: "Invalid resume ID" };
    }

    const resume = await prisma.resume.findUnique({
      where: { id },
      select: {
          id: true,
          data: true,
          title: true,
      },
    });

    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    return { success: true, resume };
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
}
