import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Define section types
export type SectionType =
  | "personalDetails" // HeadingForm
  | "summary" // SummaryForm
  | "workHistory" // WorkHistoryForm
  | "education" // EducationForm
  | "projects" // ProjectsForm
  | "achievements" // AchievementsForm
  | "skills" // SkillsForm
  | "languages" // LanguagesForm
  | "customSections"; // CustomSectionForm

// Layout configuration
export interface LayoutConfig {
  mainSections: SectionType[];
  sidebarSections: SectionType[];
}

// Default layout configuration
const defaultLayout: LayoutConfig = {
  mainSections: [
    "summary",
    "workHistory",
    "education",
    "projects",
    "customSections",
  ],
  sidebarSections: ["skills", "languages", "achievements"],
};

// Map of template-specific layout configurations
export interface TemplateLayoutConfigs {
  [templateId: string]: LayoutConfig;
}

// Initialize with default configurations for all templates
const initialTemplateLayouts: TemplateLayoutConfigs = {
  Dynamic: defaultLayout,
  ElegantClassic: defaultLayout,
  IvyLeague: defaultLayout,
  Modern: defaultLayout,
  Minimal: defaultLayout,
  Premium: defaultLayout,
  Professional: defaultLayout,
  Polished: defaultLayout,
  DoubleColumn: defaultLayout,
  Stylish: defaultLayout,
};

// Create an atom with storage to persist template-specific layout changes
// The string 'template-layout-configs' is the local storage key
export const templateLayoutConfigsAtom = atomWithStorage<TemplateLayoutConfigs>(
  "template-layout-configs",
  initialTemplateLayouts
);

// Keep the old atom for backward compatibility
export const layoutConfigAtom = atomWithStorage<LayoutConfig>(
  "layout-config",
  defaultLayout
);

// Create a derived atom that gets the layout for the current template
import { resumeTemplateAtom } from "./resumeAtoms";
export const currentTemplateLayoutAtom = atom(
  (get) => {
    const templateId = get(resumeTemplateAtom);
    const allTemplateLayouts = get(templateLayoutConfigsAtom);

    // Return the template-specific layout if it exists, otherwise use default
    return allTemplateLayouts[templateId] || defaultLayout;
  },
  (get, set, newLayout: LayoutConfig) => {
    const templateId = get(resumeTemplateAtom);
    const allTemplateLayouts = get(templateLayoutConfigsAtom);

    // Update only the layout for the current template
    set(templateLayoutConfigsAtom, {
      ...allTemplateLayouts,
      [templateId]: newLayout,
    });

    // Also update the old atom for backward compatibility
    set(layoutConfigAtom, newLayout);
  }
);

// Helper function to get components based on section type
export const getSectionComponent = (sectionType: SectionType): string => {
  switch (sectionType) {
    case "personalDetails":
      return "HeadingForm";
    case "summary":
      return "SummaryForm";
    case "workHistory":
      return "WorkHistoryForm";
    case "education":
      return "EducationForm";
    case "projects":
      return "ProjectsForm";
    case "achievements":
      return "AchievementsForm";
    case "skills":
      return "SkillsForm";
    case "languages":
      return "LanguagesForm";
    case "customSections":
      return "CustomSectionForm";
    default:
      return "";
  }
};
