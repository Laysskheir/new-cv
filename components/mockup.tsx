"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { resumeStateAtom, resumeTemplateAtom } from "../state/resumeAtoms";
import ResumeTemplate from "./ResumeTemplate";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export const Mockup: React.FC = () => {
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedTemplate] = useAtom(resumeTemplateAtom);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (resumeRef.current) {
      const resumeHeight = resumeRef.current.scrollHeight;
      const pageHeight = 1056; // Approximate height of an A4 page in pixels
      const calculatedPageCount = Math.ceil(resumeHeight / pageHeight);
      setPageCount(calculatedPageCount);
    }
  }, [resumeData, selectedTemplate]);

  return (
    <Card className="relative w-full rounded-none">
      <div className="overflow-hidden h-[326px] md:h-[620px] bg-background text-primary">
        {/* Resume Template */}
        <ScrollArea className="h-full">
          <div id="resume" ref={resumeRef}>
            <ResumeTemplate template={selectedTemplate} data={resumeData} />
          </div>
        </ScrollArea>
        {pageCount > 1 && (
          <Badge variant="secondary" className="absolute top-1 right-2 text-sm">
            1/{pageCount} pages
          </Badge>
        )}
      </div>
    </Card>
  );
};
