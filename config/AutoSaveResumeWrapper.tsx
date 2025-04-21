// config/AutoSaveResumeWrapper.tsx
"use client";

import { useAutoSaveResume } from "@/hooks/useAutoSaveResume";
import { useAtom } from "@/state/store";
import { resumeStateAtom, isDataLoadedAtom } from "@/state/resumeAtoms";
import { useEffect, useRef } from "react";
import { getResume } from "@/actions/resume/getResume";
import { TemplateProps } from "@/types/resume";

interface AutoSaveResumeWrapperProps {
  children: React.ReactNode;
  resumeId: string | string[];
}

export function AutoSaveResumeWrapper({
  children,
  resumeId,
}: AutoSaveResumeWrapperProps) {
  const [, setResumeState] = useAtom(resumeStateAtom);
  const [, setIsDataLoaded] = useAtom(isDataLoadedAtom);
  const initialLoadRef = useRef(false);
  const resumeIdRef = useRef(resumeId);

  // Load data from DB on mount
  useEffect(() => {
    const loadResumeData = async () => {
      if (initialLoadRef.current) return;
      initialLoadRef.current = true;

      try {
        const result = await getResume(resumeIdRef.current);
        if (result.success && result.resume) {
          const resumeData = result.resume.data as unknown as TemplateProps;
          setResumeState(resumeData);
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load resume data:", error);
      }
    };

    loadResumeData();
  }, [setResumeState, setIsDataLoaded]);

  // Use the auto-save hook
  useAutoSaveResume(resumeIdRef.current);

  return <>{children}</>;
}
