"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { kebabCase } from "@/lib/utils";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function getResumeOrThrow(id: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: { id },
    select: { userId: true, title: true, data: true },
  });

  if (!resume || resume.userId !== userId) {
    throw new Error("Resume not found or access denied");
  }

  return resume;
}

async function generateUniqueSlug(baseSlug: string, userId: string) {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingResume = await prisma.resume.findFirst({
      where: { userId, slug },
    });

    if (!existingResume) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function createResume(prevState: any, formData: FormData) {
  try {
    const user = await getAuthenticatedUser();
    const title = formData.get("title") as string;

    if (!title) {
      return { error: "Title is required" };
    }

    const slug = await generateUniqueSlug(kebabCase(title), user.id);

    const resume = await prisma.resume.create({
      data: { title, slug, userId: user.id, data: {} },
    });

    revalidatePath("/dashboard/resumes");
    return { success: true, message: "Resume created successfully", resumeId: resume.id };
  } catch (error) {
    return { error: `Failed to create resume: ${error instanceof Error ? error.message : "An unexpected error occurred"}` };
  }
}

export async function duplicateResume(id: string) {
  try {
    const user = await getAuthenticatedUser();
    const originalResume = await getResumeOrThrow(id, user.id);

    const newTitle = `${originalResume.title} (Copy)`;
    const slug = await generateUniqueSlug(kebabCase(newTitle), user.id);

    const newResume = await prisma.resume.create({
      data: {
        title: newTitle,
        slug,
        data: originalResume.data,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/resumes");
    return newResume;
  } catch (error) {
    throw new Error(`Failed to duplicate resume: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
  }
}

export async function deleteResume(id: string) {
  const user = await getAuthenticatedUser();
  await getResumeOrThrow(id, user.id);

  await prisma.resume.delete({ where: { id } });
  revalidatePath("/dashboard/resumes");
}

export async function renameResume(id: string, newTitle: string) {
  try {
    const user = await getAuthenticatedUser();
    await getResumeOrThrow(id, user.id);

    const slug = await generateUniqueSlug(kebabCase(newTitle), user.id);

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: { title: newTitle, slug },
    });

    revalidatePath("/dashboard/resumes");
    return updatedResume;
  } catch (error) {
    throw new Error(`Failed to rename resume: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
  }
}