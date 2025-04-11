// app/[resumeId]/edit/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Achievements from "@/components/forms/Achievements";
import CustomSection from "@/components/forms/CustomSection";
import Education from "@/components/forms/Education";
import Heading from "@/components/forms/Heading";
import Languages from "@/components/forms/Languages";
import Projects from "@/components/forms/Projects";
import Skills from "@/components/forms/Skills";
import Summary from "@/components/forms/Summary";
import WorkHistory from "@/components/forms/WorkHistory";
import { Mockup } from "@/components/mockup";
import PreviewButton from "@/components/preview-button";
import { ThemeWrapper } from "@/components/themes/theme-wrapper";
import { LeftSidebar } from "../_components/left-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutoSaveResumeWrapper } from "@/config/AutoSaveResumeWrapper";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";
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
                    <EyeSlash size={16} />
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
            {/* Pass resumeState and setResumeState as props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-0 max-w-3xl mx-auto w-full"
            >
              <Heading
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Summary
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <WorkHistory
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Education
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Projects
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Achievements
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Skills
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <Languages
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
              <CustomSection
                resumeState={resumeState}
                setResumeState={setResumeState}
                formVisibility={formVisibility}
                setFormVisibility={setFormVisibility}
              />
            </motion.div>
          </ScrollArea>
        </section>

        {/* Mockup Section */}
        <AnimatePresence>
          {isPreviewVisible && (
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:flex items-center justify-center lg:pr-8 sticky top-0 h-screen"
            >
              <ThemeWrapper>
                <Mockup />
              </ThemeWrapper>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Mobile preview button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <PreviewButton />
        </div>

        {/* Mobile preview drawer */}
        <AnimatePresence>
          {isMobilePreviewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={toggleMobilePreview}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AutoSaveResumeWrapper>
  );
}
