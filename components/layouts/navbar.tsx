"use client";

import React from "react";
import { DownloadCloud, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AppMenu } from "../modals/app-menu";
import { TemplatesPopper } from "../modals/templates-popper";
import Logo from "../logo";
import { FeedbackModal } from "../modals/feedback-modal";
import { Icons } from "../icons";
import { useAtom } from "jotai";
import { resumeStateAtom, resumeTemplateAtom } from "@/state/resumeAtoms";
import PreviewModal from "../modals/preview-modal";
import { ThemePopper } from "../modals/themes-popper";
import { DesignFonts } from "../modals/design-fonts";
import AtsAnalyze from "../modals/ats-analyze";
import { ShareButton } from "../ShareButton";
import ResetButton from "../ResetButton";
import { FormatDownloadPopper } from "../modals/format-download-popper";
import DownloadButton from "../download-button";

export default function Navbar() {
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedTemplate] = useAtom(resumeTemplateAtom);

  return (
    <div>
      <header className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 container">
        <div className="flex items-center justify-between h-[65px]">
          <Logo className="text-primary" />
          <nav className="hidden md:flex gap-2">
            <TemplatesPopper>Template</TemplatesPopper>
            <ThemePopper>Theme</ThemePopper>
            <DesignFonts>Design & Font</DesignFonts>
            <AtsAnalyze>ATS Check</AtsAnalyze>
            <ResetButton />
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <PreviewModal template={selectedTemplate} data={resumeData}>
                <Icons.zoom className="size-4 mr-1" />
                Preview
              </PreviewModal>
              <ShareButton />
            </div>
            <FeedbackModal>
              <Icons.chat className="size-6" />
            </FeedbackModal>
            <AppMenu>
              <Icons.grid className="size-6" />
            </AppMenu>
            <DownloadButton />
            <FormatDownloadPopper>
              <Settings2 className="w-4 h-4" />
            </FormatDownloadPopper>
          </div>
        </div>
        <div className="md:hidden flex flex-wrap items-center justify-between py-2 gap-2">
          <nav className="flex flex-wrap gap-2">
            <TemplatesPopper>Template</TemplatesPopper>
            <ThemePopper>Theme</ThemePopper>
            <DesignFonts>Design & Font</DesignFonts>
            <AtsAnalyze>ATS Check</AtsAnalyze>
            <ResetButton />
            <div className="hidden sm:block">
              <PreviewModal template={selectedTemplate} data={resumeData}>
                <Icons.zoom className="size-4 mr-1" />
                Preview
              </PreviewModal>
            </div>
            <ShareButton />
          </nav>
        </div>
      </header>
    </div>
  );
}
