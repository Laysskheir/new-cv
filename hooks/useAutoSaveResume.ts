// hooks/useAutoSaveResume.ts
"use client";

import { useAtom } from "jotai";
import { useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { resumeStateAtom, isDataLoadedAtom } from "@/state/resumeAtoms";
import { updateResume } from "@/actions/resume/updateResume";
import { toast } from "@/components/ui/use-toast";

// Only save if the change is significant enough
const shouldSave = (prev: any, current: any) => {
  // Skip saving if the change is too small (e.g., just formatting)
  const prevStr = JSON.stringify(prev);
  const currentStr = JSON.stringify(current);
  return prevStr !== currentStr;
};

export function useAutoSaveResume(resumeId: string | string[]) {
  const [resumeState] = useAtom(resumeStateAtom);
  const [isDataLoaded] = useAtom(isDataLoadedAtom);
  const previousStateRef = useRef<any>(null);
  const isSavingRef = useRef(false);
  const saveAttemptsRef = useRef(0);
  const MAX_SAVE_ATTEMPTS = 3;
  const lastSaveTimeRef = useRef(Date.now());

  const saveResume = useCallback(
    async (data: typeof resumeState) => {
      if (!isDataLoaded || isSavingRef.current) return;

      // Don't save if less than 1 second has passed since last save
      const now = Date.now();
      if (now - lastSaveTimeRef.current < 1000) {
        return;
      }

      try {
        isSavingRef.current = true;
        const result = await updateResume(resumeId, data);

        if (!result.success) {
          saveAttemptsRef.current++;
          if (saveAttemptsRef.current < MAX_SAVE_ATTEMPTS) {
            // Exponential backoff for retries
            const delay = Math.min(1000 * Math.pow(2, saveAttemptsRef.current), 5000);
            setTimeout(() => saveResume(data), delay);
          } else {
            toast({
              title: "Failed to save changes",
              description: result.error,
              variant: "destructive",
            });
            console.error("Failed to auto-save resume:", result.error);
          }
        } else {
          saveAttemptsRef.current = 0;
          lastSaveTimeRef.current = now;
        }
      } catch (error) {
        console.error("Error saving resume:", error);
        toast({
          title: "Error saving changes",
          description: "Please try again.",
          variant: "destructive",
        });
      } finally {
        isSavingRef.current = false;
      }
    },
    [resumeId, isDataLoaded]
  );

  // Use a longer debounce time for production
  const debouncedSave = useCallback(
    debounce(saveResume, process.env.NODE_ENV === "production" ? 3000 : 2000),
    [saveResume]
  );

  useEffect(() => {
    if (!previousStateRef.current) {
      previousStateRef.current = resumeState;
      return;
    }

    if (shouldSave(previousStateRef.current, resumeState)) {
      previousStateRef.current = resumeState;
      debouncedSave(resumeState);
    }

    return () => {
      debouncedSave.cancel();
    };
  }, [resumeState, debouncedSave]);

  return null;
}
