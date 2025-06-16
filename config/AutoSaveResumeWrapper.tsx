// config/AutoSaveResumeWrapper.tsx
"use client";

import { useAutoSaveResume } from "@/hooks/useAutoSaveResume";
import { useAtom } from "jotai";
import { resumeStateAtom, isDataLoadedAtom } from "@/state/resumeAtoms";
import { useEffect, useRef, useState } from "react";
import { getResumeById } from "@/actions/resume/getResumeById";
import { TemplateProps } from "@/types/resume";
import { Loader } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadRef = useRef(false);
  const resumeIdRef = useRef(resumeId);

  // Load data from DB on mount
  useEffect(() => {
    const loadResumeData = async () => {
      if (initialLoadRef.current) return;
      initialLoadRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const result = await getResumeById(resumeIdRef.current);
        if (result.success && result.resume) {
          const resumeData = result.resume.data as unknown as TemplateProps;
          setResumeState(resumeData);
          setIsDataLoaded(true);
        } else {
          setError(result.error || "Failed to load resume data");
        }
      } catch (error) {
        setError("An unexpected error occurred while loading the resume");
        console.error("Failed to load resume data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumeData();
  }, [setResumeState, setIsDataLoaded]);

  // Use the auto-save hook
  useAutoSaveResume(resumeIdRef.current);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return <>{children}</>;
}
