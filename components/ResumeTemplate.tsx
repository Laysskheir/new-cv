import React from "react";
import { TemplateProps } from "../types/resume";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAtom } from "jotai";
import {
  pageMarginsAtom,
  sectionSpacingAtom,
  fontSizeAtom,
  fontFamilyAtom,
} from "@/state/resumeAtoms";
import { cn } from "@/lib/utils";
import { ThemeWrapper } from "./themes/theme-wrapper";

// Import all templates
import ElegantClassic from "./design/ElegantClassic";
import DoubleColumn from "./design/DoubleColumn";
import Polished from "./design/Polished";
import Stylish from "./design/Stylish";
import Modern from "./design/Modern";
import Professional from "./design/Professional";
import Minimal from "./design/Minimal";
import Premium from "./design/Premium";
import IvyLeague from "./design/IvyLeague";

interface ResumeTemplateProps {
  template: string;
  data: TemplateProps;
  className?: string;
}

// Template mapping for dynamic loading
const templateComponents = {
  IvyLeague,
  DoubleColumn,
  ElegantClassic,
  Polished,
  Stylish,
  Modern,
  Professional,
  Minimal,
  Premium,
} as const;

// TODO: Create a template converter utility that wraps all templates with DynamicResumeLayout
// This would ensure consistent layout rearrangement support across all templates
// For now, each template needs to be manually updated to use the DynamicResumeLayout component

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
  template,
  data,
  className,
}) => {
  const [pageMargins] = useAtom(pageMarginsAtom);
  const [sectionSpacing] = useAtom(sectionSpacingAtom);
  const [fontSize] = useAtom(fontSizeAtom);
  const [fontFamily] = useAtom(fontFamilyAtom);

  const style = React.useMemo(
    () => ({
      margin: `${pageMargins * 4}px`,
      fontSize: `${fontSize}px`,
      "--section-spacing": `${sectionSpacing * 0.25}rem`,
      fontFamily: fontFamily || "Rubik",
    }),
    [pageMargins, sectionSpacing, fontSize, fontFamily]
  );

  const TemplateComponent =
    templateComponents[template as keyof typeof templateComponents] ||
    templateComponents.IvyLeague; // Fallback to IvyLeague if template not found

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <div
          className={cn(
            "bg-theme-bg-primary text-theme-text-primary space-y-[var(--section-spacing)]",
            className
          )}
          style={style as React.CSSProperties}
          id="resume-content"
        >
          <TemplateComponent {...data} />
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default ResumeTemplate;
