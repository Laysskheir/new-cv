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

// Import all templates
import ElegantClassic from "./design/ElegantClassic";
import DoubleColumn from "./design/DoubleColumn";
import { IvyLeague } from "./design/IvyLeague";
import Polished from "./design/Polished";
import Stylish from "./design/Stylish";
import Modern from "./design/Modern";
import Professional from "./design/Professional";

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
} as const;

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
    templateComponents[template as keyof typeof templateComponents];

  if (!TemplateComponent) {
    return (
      <div className="flex justify-center items-center h-full text-destructive font-bold">
        Invalid template selected: {template}
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div
        className={cn(
          "bg-[var(--bg-primary)] text-[var(--text-primary)] space-y-[var(--section-spacing)] text-[length:var(--font-size)]",
          className
        )}
        style={style as React.CSSProperties}
      >
        <TemplateComponent {...data} />
      </div>
    </ThemeProvider>
  );
};

export default ResumeTemplate;
