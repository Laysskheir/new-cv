// app/actions/updateResume.ts
'use server'

import { prisma } from '@/lib/prisma'
import { TemplateProps } from '@/types/resume'

export async function updateResume(resumeId: string | string[], data: TemplateProps) {
  try {
    // Ensure resumeId is a string
    const id = Array.isArray(resumeId) ? resumeId[0] : resumeId

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: {
        data: data as any, // Cast to any as Prisma expects a JSON object
      },
    })
    return { success: true, resume: updatedResume }
  } catch (error) {
    console.error('Error updating resume:', error)
    return { success: false, error: 'Failed to update resume' }
  }
}