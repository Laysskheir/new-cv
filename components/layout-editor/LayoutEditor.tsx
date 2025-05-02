"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import { currentTemplateLayoutAtom, SectionType, getSectionComponent } from "@/state/layout-store";
import { Button } from "@/components/ui/button";
import {
    GripVertical,
    Columns,
    BookOpen,
    Award,
    Briefcase,
    Code,
    GraduationCap,
    Languages,
    FileText,
    UserCheck,
    LayoutGrid,
    X,
    FileOutput
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useAtomValue } from "jotai";
import { resumeTemplateAtom } from "@/state/resumeAtoms";

// Section icon mapping
const sectionIcons: Record<SectionType, React.ReactNode> = {
    personalDetails: <UserCheck size={18} />,
    summary: <FileText size={18} />,
    workHistory: <Briefcase size={18} />,
    education: <GraduationCap size={18} />,
    projects: <Code size={18} />,
    achievements: <Award size={18} />,
    skills: <BookOpen size={18} />,
    languages: <Languages size={18} />,
    customSections: <LayoutGrid size={18} />,
};

// Section display names
const sectionNames: Record<SectionType, string> = {
    personalDetails: "Profile",
    summary: "Summary",
    workHistory: "Experience",
    education: "Education",
    projects: "Projects",
    achievements: "Awards",
    skills: "Skills",
    languages: "Languages",
    customSections: "Custom Section",
};

// Default layout configuration
const defaultLayoutConfig: {
    mainSections: SectionType[];
    sidebarSections: SectionType[];
} = {
    mainSections: [
        "summary",
        "workHistory",
        "education",
        "projects",
    ] as SectionType[],
    sidebarSections: [
        "skills",
        "languages",
        "achievements",
        "customSections",
    ] as SectionType[],
};

export const LayoutEditor = () => {
    const [open, setOpen] = useState(false);
    const [layoutConfig, setLayoutConfig] = useAtom(currentTemplateLayoutAtom);
    const currentTemplate = useAtomValue(resumeTemplateAtom);

    // Add an effect to filter out personalDetails if it exists in draggable sections
    useEffect(() => {
        const hasPersonalDetails = layoutConfig.mainSections.includes("personalDetails" as SectionType) ||
            layoutConfig.sidebarSections.includes("personalDetails" as SectionType);

        if (hasPersonalDetails) {
            const newConfig = {
                mainSections: layoutConfig.mainSections.filter(section => section !== "personalDetails"),
                sidebarSections: layoutConfig.sidebarSections.filter(section => section !== "personalDetails")
            };
            setLayoutConfig(newConfig);
        }
    }, [layoutConfig, setLayoutConfig]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // If dropped outside the list
        if (!destination) return;

        // If dropped in the same position
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        // Create a copy of the current layout
        const newLayout = { ...layoutConfig };

        // Handle moving within the same list
        if (source.droppableId === destination.droppableId) {
            const list = [...newLayout[source.droppableId as keyof typeof newLayout]];
            const [movedItem] = list.splice(source.index, 1);
            list.splice(destination.index, 0, movedItem);

            newLayout[source.droppableId as keyof typeof newLayout] = list as any;
        }
        // Handle moving between lists
        else {
            const sourceList = [...newLayout[source.droppableId as keyof typeof newLayout]];
            const destList = [...newLayout[destination.droppableId as keyof typeof newLayout]];

            const [movedItem] = sourceList.splice(source.index, 1);
            destList.splice(destination.index, 0, movedItem);

            newLayout[source.droppableId as keyof typeof newLayout] = sourceList as any;
            newLayout[destination.droppableId as keyof typeof newLayout] = destList as any;
        }

        // Update the layout state
        setLayoutConfig(newLayout);

        // Show success toast
        toast({
            title: "Layout updated",
            description: `Your resume layout for the ${currentTemplate} template has been updated.`,
        });
    };

    // Add reset function
    const resetToDefault = () => {
        setLayoutConfig(defaultLayoutConfig);
        toast({
            title: "Layout reset",
            description: `Template layout has been reset to default.`,
        });
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setOpen(true)}
            >
                <FileOutput size={16} />
                PDF Layout
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <Columns size={18} />
                            {currentTemplate} Template Layout Editor
                        </SheetTitle>
                        <SheetDescription>
                            Drag and drop sections to reorder them for the {currentTemplate} template. Layout changes are saved per template.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="pt-4">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Column */}
                                <div className="flex flex-col">
                                    <h3 className="font-medium text-sm mb-2">Main</h3>

                                    {/* Fixed Profile Section */}
                                    <div className="bg-muted/50 rounded-xl mb-3 p-2 border border-primary/20 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="text-primary">
                                                <UserCheck size={18} />
                                            </div>
                                            <span className="text-sm font-medium">Profile (Fixed)</span>
                                        </div>
                                        <div className="text-muted-foreground px-1">
                                            <span className="text-xs">Always at top</span>
                                        </div>
                                    </div>

                                    <Droppable droppableId="mainSections">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="border rounded-md min-h-[300px] flex-1 p-2 "
                                            >
                                                <div className="h-[300px] overflow-y-auto">
                                                    {layoutConfig.mainSections.map((section, index) => (
                                                        <Draggable key={section} draggableId={section} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className="bg-background rounded-xl mb-2 p-2 border flex items-center justify-between "
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="text-muted-foreground">
                                                                            {sectionIcons[section]}
                                                                        </div>
                                                                        <span className="text-sm">{sectionNames[section]}</span>
                                                                    </div>
                                                                    <div {...provided.dragHandleProps} className="cursor-move text-muted-foreground hover:text-foreground">
                                                                        <GripVertical size={18} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>

                                {/* Sidebar Column */}
                                <div className="flex flex-col">
                                    <h3 className="font-medium text-sm mb-2">Sidebar</h3>
                                    <Droppable droppableId="sidebarSections">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="border rounded-md min-h-[300px] flex-1 p-2 "
                                            >
                                                <div className="h-[300px] overflow-y-auto">
                                                    {layoutConfig.sidebarSections.map((section, index) => (
                                                        <Draggable key={section} draggableId={section} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className="bg-background rounded-xl mb-2 p-2 border flex items-center justify-between"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="text-muted-foreground">
                                                                            {sectionIcons[section]}
                                                                        </div>
                                                                        <span className="text-sm">{sectionNames[section]}</span>
                                                                    </div>
                                                                    <div {...provided.dragHandleProps} className="cursor-move text-muted-foreground hover:text-foreground">
                                                                        <GripVertical size={18} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        </DragDropContext>
                    </div>

                    <SheetFooter className="mt-6">
                        <Button
                            variant="destructive"
                            onClick={resetToDefault}
                        >
                            <span className="mr-2">Reset to Default</span>
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
};