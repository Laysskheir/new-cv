"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AppMenu } from "../modals/app-menu";
import { TemplatesPopper } from "../modals/templates-popper";
import { FeedbackModal } from "../modals/feedback-modal";
import { Icons } from "../icons";
import { useAtom } from "@/state/store";
import { resumeStateAtom, resumeTemplateAtom } from "@/state/resumeAtoms";
import PreviewModal from "../modals/preview-modal";
import { ThemePopper } from "../modals/themes-popper";
import { DesignFonts } from "../modals/design-fonts";
import AtsAnalyze from "../modals/ats-analyze";
import { ShareButton } from "../ShareButton";
import ResetButton from "../ResetButton";
import DownloadButton from "../download-button";
import { HouseSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../logo";

export default function Navbar({ resumeTitle }: { resumeTitle: string }) {
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedTemplate] = useAtom(resumeTemplateAtom);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and Desktop Navigation */}
          <div className="flex items-center gap-4">
            <Logo showText={false} className="hidden md:block" />
            <nav className="hidden md:flex items-center gap-2">
              <TemplatesPopper>Template</TemplatesPopper>
              <ThemePopper>Theme</ThemePopper>
              <DesignFonts>Design & Font</DesignFonts>
              <ResetButton />
            </nav>
          </div>

          {/* Center section - Title and Navigation */}
          <div className="flex items-center justify-center gap-x-1 lg:mx-auto">
            <Button asChild size="icon" variant="ghost">
              <Link href="/dashboard/resumes">
                <HouseSimple />
              </Link>
            </Button>
            <span className="text-xs opacity-40">{"/"}</span>
            <h1 className="font-medium">{resumeTitle}</h1>
          </div>

          {/* Right section - Actions */}
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

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 py-4">
                  <Logo />
                  <nav className="flex flex-col gap-2">
                    <TemplatesPopper>Template</TemplatesPopper>
                    <ThemePopper>Theme</ThemePopper>
                    <DesignFonts>Design & Font</DesignFonts>
                    <AtsAnalyze>ATS Check</AtsAnalyze>
                    <ResetButton />
                    <div className="md:hidden">
                      <PreviewModal
                        template={selectedTemplate}
                        data={resumeData}
                      >
                        <Icons.zoom className="size-4 mr-1" />
                        Preview
                      </PreviewModal>
                    </div>
                    <ShareButton />
                    <DownloadButton />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Navigation - Bottom Bar */}
        {isScrolled && (
          <div className="md:hidden py-2 border-t">
            <nav className="flex items-center justify-between gap-2 overflow-x-auto">
              <TemplatesPopper>Template</TemplatesPopper>
              <ThemePopper>Theme</ThemePopper>
              <DesignFonts>Design & Font</DesignFonts>
              <AtsAnalyze>ATS Check</AtsAnalyze>
              <ResetButton />
              <PreviewModal template={selectedTemplate} data={resumeData}>
                <Icons.zoom className="size-4 mr-1" />
                Preview
              </PreviewModal>
              <ShareButton />
              <DownloadButton />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
