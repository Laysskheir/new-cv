// hooks/useAutoSaveResume.ts
"use client";

import { useAtom } from "@/state/store";
import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { resumeStateAtom } from "@/state/resumeAtoms";
import { updateResume } from "@/actions/resume/updateResume";

export function useAutoSaveResume(resumeId: string | string[]) {
  const [resumeState] = useAtom(resumeStateAtom);

  const debouncedSave = useCallback(
    debounce(async (data: typeof resumeState) => {
      const result = await updateResume(resumeId, data);
      if (!result.success) {
        console.error("Failed to auto-save resume:", result.error);
      }
    }, 1000),
    [resumeId]
  );

  useEffect(() => {
    debouncedSave(resumeState);
  }, [resumeState, debouncedSave]);
}
