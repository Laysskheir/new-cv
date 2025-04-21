// hooks/useAutoSaveResume.ts
"use client";

import { useAtom } from "@/state/store";
import { useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { resumeStateAtom, isDataLoadedAtom } from "@/state/resumeAtoms";
import { updateResume } from "@/actions/resume/updateResume";

export function useAutoSaveResume(resumeId: string | string[]) {
  const [resumeState] = useAtom(resumeStateAtom);
  const [isDataLoaded] = useAtom(isDataLoadedAtom);
  const previousStateRef = useRef<string | null>(null);
  const isSavingRef = useRef(false);

  const saveResume = useCallback(
    async (data: typeof resumeState) => {
      if (!isDataLoaded || isSavingRef.current) return;

      try {
        isSavingRef.current = true;
        const result = await updateResume(resumeId, data);
        if (!result.success) {
          console.error("Failed to auto-save resume:", result.error);
        }
      } catch (error) {
        console.error("Error saving resume:", error);
      } finally {
        isSavingRef.current = false;
      }
    },
    [resumeId, isDataLoaded]
  );

  const debouncedSave = useCallback(debounce(saveResume, 1000), [saveResume]);

  useEffect(() => {
    const currentState = JSON.stringify(resumeState);

    if (previousStateRef.current !== currentState) {
      previousStateRef.current = currentState;
      debouncedSave(resumeState);
    }

    return () => {
      debouncedSave.cancel();
    };
  }, [resumeState, debouncedSave]);

  return null;
}
