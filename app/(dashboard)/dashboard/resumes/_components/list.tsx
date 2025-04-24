"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Resume } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CopySimple,
    FolderOpen,
    PencilSimple,
    TrashSimple,
    DotsThree,
} from "@phosphor-icons/react";
import { ResumeActionDialog } from "../_dialogs/resume-action-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ListViewProps {
    resumes: Resume[];
}

export function ListView({ resumes }: ListViewProps) {
    const [currentResume, setCurrentResume] = useState<Resume | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<"rename" | "duplicate" | "delete" | null>(null);
    const router = useRouter();

    const handleAction = (resume: Resume, action: "rename" | "duplicate" | "delete") => {
        setCurrentResume(resume);
        setCurrentAction(action);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentAction(null);
        setCurrentResume(null);
    };

    return (
        <div className="space-y-2">
            <AnimatePresence initial={false}>
                {resumes.map((resume, index) => (
                    <motion.div
                        key={resume.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            delay: index * 0.05,
                            duration: 0.2,
                        }}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50"
                    >
                        <div
                            className="flex items-center gap-3 flex-1 cursor-pointer"
                            onClick={() => router.push(`/editor/${resume.id}`)}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FolderOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-col">
                                    <h3 className="font-medium group-hover:text-primary transition-colors">
                                        {resume.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Last updated {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <DotsThree className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 sm:w-48">
                                <DropdownMenuItem onClick={() => router.push(`/editor/${resume.id}`)}>
                                    <FolderOpen className="w-3.5 h-3.5 mr-2" />
                                    Open
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleAction(resume, "rename")}>
                                    <PencilSimple className="w-3.5 h-3.5 mr-2" />
                                    Rename
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleAction(resume, "duplicate")}>
                                    <CopySimple className="w-3.5 h-3.5 mr-2" />
                                    Duplicate
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleAction(resume, "delete")}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <TrashSimple className="w-3.5 h-3.5 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>
                ))}
            </AnimatePresence>

            {currentResume && isDialogOpen && (
                <ResumeActionDialog
                    open={isDialogOpen}
                    onOpenChange={handleDialogClose}
                    action={currentAction}
                    resume={currentResume}
                />
            )}
        </div>
    );
} 