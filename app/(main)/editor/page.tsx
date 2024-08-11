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
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Editor | Builder",
  description: "Create and edit your professional resume",
};

export default function Editor() {
  return (
    <main className="relative grid h-screen md:container grid-cols-1 lg:grid-cols-2 lg:px-0 bg-accent/20">
      {/* Forms Section */}
      <section className="flex h-screen flex-col items-center justify-center pt-6 lg:px-4">
        <ScrollArea className=" h-screen flex w-full flex-col gap-5 ">
          <div className="p-2.5 pt-0">
            <Heading />

            <Summary />
            <WorkHistory />
            <Education />
            <Projects />
            <Achievements />
            <Skills />
            <Languages />
            <CustomSection />
          </div>
        </ScrollArea>
      </section>

      {/* Mockup Section */}
      <section className="flex items-center justify-center lg:pr-8">
        <ThemeWrapper>
          <Mockup />
        </ThemeWrapper>
      </section>

      {/* Mobile preview button */}
      <div className="lg:hidden absolute bottom-4 right-4">
        <PreviewButton />
      </div>
    </main>
  );
}