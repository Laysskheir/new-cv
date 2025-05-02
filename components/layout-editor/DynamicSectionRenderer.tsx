"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Component imports
import { HeadingForm } from "@/components/forms/Heading";
import { SummaryForm } from "@/components/forms/Summary";
import { WorkHistoryForm } from "@/components/forms/WorkHistory";
import { EducationForm } from "@/components/forms/Education";
import { ProjectsForm } from "@/components/forms/Projects";
import { AchievementsForm } from "@/components/forms/Achievements";
import { SkillsForm } from "@/components/forms/Skills";
import { LanguagesForm } from "@/components/forms/Languages";
import { CustomSectionForm } from "@/components/forms/CustomSection";

interface DynamicSectionRendererProps {
    containerRef: React.RefObject<HTMLDivElement>;
}

export const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({
    containerRef
}) => {
    return (
        <div
            ref={containerRef}
            className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 pb-20 overflow-y-auto"
        >
            <div className="pt-0 max-w-3xl mx-auto w-full">
                {/* Render form sections in fixed order */}
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
        </div>
    );
};