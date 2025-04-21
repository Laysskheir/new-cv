import { useEffect } from "react";
import { useAtom } from "jotai";
import { resumeStateAtom, isDataLoadedAtom } from "./resumeAtoms";
import { api } from "@/lib/api";

export function useResumeSync() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [isDataLoaded, setIsDataLoaded] = useAtom(isDataLoadedAtom);

  // Load data from DB on mount
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const response = await api.get("/api/resume");
        if (response.data) {
          setResumeState(response.data);
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load resume data:", error);
      }
    };

    if (!isDataLoaded) {
      loadResumeData();
    }
  }, [isDataLoaded, setResumeState, setIsDataLoaded]);

  // Save data to DB when it changes
  useEffect(() => {
    const saveResumeData = async () => {
      if (!isDataLoaded) return;

      try {
        await api.post("/api/resume", resumeState);
      } catch (error) {
        console.error("Failed to save resume data:", error);
      }
    };

    const debounceTimer = setTimeout(saveResumeData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [resumeState, isDataLoaded]);

  return { resumeState, setResumeState };
}
