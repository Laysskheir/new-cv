"use server";

import { prisma } from "@/lib/prisma";

export async function getAllResumes(userId: string) {
  try {
    if (!userId) {
      return { success: false, error: "Invalid user ID" };
    }

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, resumes };
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return { success: false, error: "Failed to fetch resumes" };
  }
}
