import React from "react";
import { useAtomValue } from "jotai";
import { currentTemplateLayoutAtom, SectionType } from "@/state/layout-store";
import { TemplateProps } from "@/types/resume";
import { cn } from "@/lib/utils";

// Define default layout inline to avoid import issues
export const DEFAULT_MAIN_SECTIONS: SectionType[] = [
  "personalDetails",
  "summary",
  "workHistory",
  "projects",
  "education",
];

export const DEFAULT_SIDEBAR_SECTIONS: SectionType[] = [
  "skills",
  "languages",
  "achievements",
];

// Re-export themed components from ThemeComponents
export { SectionHeader, MetaInfo, SectionItem, SectionTitle } from "./ThemeComponents";

// This is a wrapper component that provides layout customization 
// capabilities for all resume templates
export const LayoutRenderer: React.FC<{
  children: (props: {
    mainSections: SectionType[];
    sidebarSections: SectionType[];
    data: TemplateProps;
  }) => React.ReactNode;
  data: TemplateProps;
}> = ({ children, data }) => {
  // Get layout configuration from state for the current template
  const layoutConfig = useAtomValue(currentTemplateLayoutAtom);

  // Explicitly create a fresh copy of the sections to ensure no reference issues
  // Handle the case when layoutConfig is null by using the default values
  const layoutData = React.useMemo(() => {
    // Always provide fallback values for safety
    const mainSections = layoutConfig?.mainSections && layoutConfig.mainSections.length > 0
      ? [...layoutConfig.mainSections]
      : DEFAULT_MAIN_SECTIONS;

    const sidebarSections = layoutConfig?.sidebarSections && layoutConfig.sidebarSections.length > 0
      ? [...layoutConfig.sidebarSections]
      : DEFAULT_SIDEBAR_SECTIONS;

    return { mainSections, sidebarSections };
  }, [layoutConfig]);

  // Pass layout configuration and data to the child template
  return (
    <>
      {children({
        mainSections: layoutData.mainSections,
        sidebarSections: layoutData.sidebarSections,
        data
      })}
    </>
  );
};