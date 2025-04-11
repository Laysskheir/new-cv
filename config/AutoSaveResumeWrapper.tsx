// config/AutoSaveResumeWrapper.tsx
'use client'

import { useAutoSaveResume } from '@/hooks/useAutoSaveResume'

type AutoSaveResumeWrapperProps = {
  resumeId: string | string[]
  children: React.ReactNode
}

export function AutoSaveResumeWrapper({ resumeId, children }: AutoSaveResumeWrapperProps) {
  useAutoSaveResume(resumeId)

  return <>{children}</>
}