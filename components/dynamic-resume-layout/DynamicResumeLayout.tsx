"use client";

import { useAtomValue } from "jotai";
import { currentTemplateLayoutAtom, SectionType } from "@/state/layout-store";
import { resumeStateAtom } from "@/state/resumeAtoms";

interface DynamicResumeLayoutProps {
    children: React.ReactNode;
    renderSection: (sectionType: SectionType) => React.ReactNode;
}

const DynamicResumeLayout: React.FC<DynamicResumeLayoutProps> = ({
    children,
    renderSection
}) => {
    const layoutConfig = useAtomValue(currentTemplateLayoutAtom);
    const resumeData = useAtomValue(resumeStateAtom);

    return (
        <div className="flex flex-col gap-4 p-6">
            {/* Render the header (personal details) first if present */}
            {layoutConfig.mainSections.includes("personalDetails") &&
                renderSection("personalDetails")}

            {/* Main content layout with conditional sidebar */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Main column */}
                <div className="flex-1">
                    {layoutConfig.mainSections
                        .filter(section => section !== "personalDetails") // Skip header as it's rendered above
                        .map(sectionType => (
                            <div key={sectionType} className="mb-6">
                                {renderSection(sectionType)}
                            </div>
                        ))}
                </div>

                {/* Sidebar (if any sections are configured for it) */}
                {layoutConfig.sidebarSections.length > 0 && (
                    <div className="md:w-1/3 flex flex-col gap-6">
                        {layoutConfig.sidebarSections.map(sectionType => (
                            <div key={sectionType} className="mb-4">
                                {renderSection(sectionType)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicResumeLayout; 