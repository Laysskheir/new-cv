import { atomWithStorage } from "jotai/utils";

export const formVisibilityAtom = atomWithStorage("formVisibility", {
  skills: false,
  education: false,
  workHistory: false,
  projects: false,
  summary: false,
  personalDetails: false,
  languages: false,
  customSections: false,
});