import React from "react";
import { TemplateProps } from "../types/resume";
import ElegantClassic from "./design/ElegantClassic";
import DoubleColumn from "./design/DoubleColumn";
import { IvyLeague } from "./design/IvyLeague";
import Polished from "./design/Polished";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAtom, useAtomValue } from "jotai";
import {
  pageMarginsAtom,
  sectionSpacingAtom,
  fontSizeAtom,
  fontFamilyAtom,
} from "@/state/resumeAtoms";

interface ResumeTemplateProps {
  template: string;
  data: TemplateProps;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ template, data }) => {
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

  return (
    <ThemeProvider>
      <div
        className="bg-[var(--bg-primary)] text-[var(--text-primary)] space-y-[var(--section-spacing)] text-[length:var(--font-size)]"
        style={{
          margin: "var(--page-margin)",
          ...(style as React.CSSProperties),
        }}
      >
        {template === "IvyLeague" && <IvyLeague {...data} />}
        {template === "DoubleColumn" && <DoubleColumn {...data} />}
        {template === "ElegantClassic" && <ElegantClassic {...data} />}
        {template === "Polished" && <Polished {...data} />}
        {template === "" && (
          <div className="flex justify-center items-center h-full text-destructive font-bold">
            Invalid template selected.
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ResumeTemplate;
