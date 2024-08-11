// fileStateAtom.ts
import { atom } from "jotai";

// Define the atom for managing the file state
export const fileStateAtom = atom({
  name: "",
  size: 0,
  fileUrl: "",
});

// Define the atom for managing the settings state
export const settingsAtom = atom({
  formToShow: {
    workExperiences: false,
    educations: false,
    projects: false,
    skills: false,
    custom: false,
  },
});
