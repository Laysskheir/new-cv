// src/actions/resume/save-resume.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { kebabCase } from "@/lib/utils";

const prisma = new PrismaClient();

export async function saveResume(userId: string, resumeData: any) {
  try {
    const slug = kebabCase(resumeData.heading || "Untitled Resume");

    const resume = await prisma.resume.upsert({
      where: {
        userId_id: {
          userId,
          id: resumeData.id || "new",
        },
      },
      update: {
        data: resumeData,
        updatedAt: new Date(),
        title: resumeData.heading || "Untitled Resume",
      },
      create: {
        userId,
        data: resumeData,
        title: resumeData.heading || "Untitled Resume",
        slug: slug,
      },
    });

    revalidatePath("/dashboard/resumes");
    return { success: true, resume };
  } catch (error) {
    console.error("Failed to save resume:", error);
    return { success: false, error: "Failed to save resume" };
  }
}

export async function getResume(userId: string, resumeId: string) {
  try {
    const resume = await prisma.resume.findUnique({
      where: {
        userId_id: {
          userId,
          id: resumeId,
        },
      },
    });

    return { success: true, resume };
  } catch (error) {
    console.error("Failed to get resume:", error);
    return { success: false, error: "Failed to get resume" };
  }
}
