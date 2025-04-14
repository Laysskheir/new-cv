"use client";
import { Plus, List } from "@phosphor-icons/react";
import { RefObject, useState, useEffect } from "react";
import { SectionIcon } from "./section-icon";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";


interface LeftSidebarProps {
  containterRef: RefObject<HTMLDivElement>;
}

export const LeftSidebar = ({ containterRef }: LeftSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("heading");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containterRef.current) return;

      const sections = [
        "heading",
        "summary",
        "workHistory",
        "education",
        "projects",
        "achievements",
        "skills",
        "languages",
        "custom",
      ];

      const containerRect = containterRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;

      for (const sectionId of sections) {
        const section = containterRef.current.querySelector(`#${sectionId}`);
        if (section) {
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top - containerTop;

          if (sectionTop <= 100) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    const scrollArea = containterRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
      return () => scrollArea.removeEventListener("scroll", handleScroll);
    }
  }, [containterRef]);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(selector.replace("#", ""));
    setIsMobileMenuOpen(false);
  };

  const sections = [
    { id: "heading", name: "Personal Details" },
    { id: "summary", name: "Summary" },
    { id: "workHistory", name: "Work History" },
    { id: "education", name: "Education" },
    { id: "projects", name: "Projects" },
    { id: "achievements", name: "Achievements" },
    { id: "skills", name: "Skills" },
    { id: "languages", name: "Languages" },
    {
      id: "custom",
      name: "Add a New Section",
      variant: "outline",
      icon: <Plus size={14} />,
    },
  ];

  const renderSectionIcons = () => (
    <div className="flex flex-col items-center justify-center gap-y-4">
      {sections.map((section) => (
        <SectionIcon
          key={section.id}
          id={section.id as any}
          name={section.name}
          icon={section.icon}
          variant={section.variant as any}
          className={cn(
            activeSection === section.id &&
              "bg-primary/10 text-primary ring-1 ring-primary/20"
          )}
          onClick={() => {
            scrollIntoView(`#${section.id}`);
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden sm:flex bg-secondary-accent/20 ml-2 rounded-r-lg shadow-sm"
      >
        <div className="flex flex-col items-center justify-between bg-secondary-accent/30 py-4 basis-12">
          <div className="flex flex-col items-center justify-center mt-1 gap-y-6">
            {renderSectionIcons()}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <div className="sm:hidden fixed bottom-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <List size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Resume Sections</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={
                      activeSection === section.id ? "secondary" : "ghost"
                    }
                    className={cn(
                      "justify-start gap-2",
                      activeSection === section.id &&
                        "bg-primary/10 text-primary"
                    )}
                    onClick={() => {
                      scrollIntoView(`#${section.id}`);
                    }}
                  >
                    {section.icon || (
                      <SectionIcon id={section.id as any} size="sm" />
                    )}
                    <span>{section.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
