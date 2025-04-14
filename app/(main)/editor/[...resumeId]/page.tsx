// app/[resumeId]/edit/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { AchievementsForm } from "@/components/forms/Achievements";
import { CustomSectionForm } from "@/components/forms/CustomSection";
import { EducationForm } from "@/components/forms/Education";
import { HeadingForm } from "@/components/forms/Heading";
import { LanguagesForm } from "@/components/forms/Languages";
import { ProjectsForm } from "@/components/forms/Projects";
import { SkillsForm } from "@/components/forms/Skills";
import { SummaryForm } from "@/components/forms/Summary";
import { WorkHistoryForm } from "@/components/forms/WorkHistory";
import { Mockup } from "@/components/mockup";
import PreviewButton from "@/components/preview-button";
import { ThemeWrapper } from "@/components/themes/theme-wrapper";
import { LeftSidebar } from "../_components/left-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutoSaveResumeWrapper } from "@/config/AutoSaveResumeWrapper";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { useAtom } from "@/state/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateProps } from "@/types/resume";

interface FormVisibility {
  skills: boolean;
  education: boolean;
  workHistory: boolean;
  projects: boolean;
  summary: boolean;
  personalDetails: boolean;
  languages: boolean;
  customSections: boolean;
}

interface TypesProps {
  resumeState: TemplateProps;
  setResumeState: (newState: TemplateProps) => void;
  formVisibility: FormVisibility;
  setFormVisibility: (visibility: FormVisibility) => void;
}

export default function Editor({ params }: { params: { resumeId: string } }) {
  const containterRef = useRef<HTMLDivElement | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if not in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Toggle preview with Ctrl/Cmd + P
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setIsPreviewVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const togglePreview = () => {
    setIsPreviewVisible((prev) => !prev);
  };

  const toggleMobilePreview = () => {
    setIsMobilePreviewOpen((prev) => !prev);
  };

  return (
    <AutoSaveResumeWrapper resumeId={params.resumeId}>
      <main className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] bg-accent/10">
        {/* Left Sidebar */}
        <LeftSidebar containterRef={containterRef} />

        {/* Forms Section */}
        <section
          className={cn(
            "h-screen flex flex-col items-center justify-start pt-6 px-4 sm:px-6 md:px-8 transition-all duration-300",
            isPreviewVisible && !isMobile ? "lg:pr-4" : "lg:pr-8"
          )}
        >
          <div className="w-full max-w-3xl mx-auto flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Edit Resume</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex items-center gap-1"
                onClick={togglePreview}
              >
                {isPreviewVisible ? (
                  <>
                    <EyeOff size={16} />
                    <span>Hide Preview</span>
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    <span>Show Preview</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <ScrollArea
            ref={containterRef}
            className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 pb-20"
          >
            <div className="pt-0 max-w-3xl mx-auto w-full">
              <HeadingForm />
              <SummaryForm />
              <WorkHistoryForm />
              <EducationForm />
              <ProjectsForm />
              <AchievementsForm />
              <SkillsForm />
              <LanguagesForm />
              <CustomSectionForm />
            </div>
          </ScrollArea>
        </section>

        {/* Mockup Section */}
        {isPreviewVisible && (
          <section className="hidden lg:flex items-center justify-center lg:pr-8 sticky top-0 h-screen">
            <ThemeWrapper>
              <Mockup />
            </ThemeWrapper>
          </section>
        )}

        {/* Mobile preview button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <PreviewButton />
        </div>

        {/* Mobile preview drawer */}
        {isMobilePreviewOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-[80vh] bg-background rounded-t-xl shadow-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Resume Preview</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobilePreview}
                >
                  <ArrowLeft size={20} />
                </Button>
              </div>
              <div className="h-[calc(80vh-4rem)] overflow-auto p-4">
                <ThemeWrapper>
                  <Mockup />
                </ThemeWrapper>
              </div>
            </div>
          </div>
        )}
      </main>
    </AutoSaveResumeWrapper>
  );
}
