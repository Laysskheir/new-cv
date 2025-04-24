"use client";

import { useState, useRef } from "react";
import {
  CopySimple,
  FolderOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { formatDistanceToNow } from "date-fns";
import { BaseCard } from "./base-card";
import { cn } from "@/lib/utils";
import { ResumeActionDialog } from "../_dialogs/resume-action-dialog";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

type Props = {
  resume: {
    id: string;
    title: string;
    slug: string;
    updatedAt: Date | string;
  };
};

type ActionType = "rename" | "duplicate" | "delete" | null;

export default function ResumeCard({ resume }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAction = (action: ActionType) => {
    setCurrentAction(action);
    setIsDialogOpen(true);
    setIsContextMenuOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentAction(null);
  };

  const router = useRouter();
  const onOpen = () => {
    router.push(`/editor/${resume.id}`);
  };

  return (
    <>
      <ContextMenu onOpenChange={setIsContextMenuOpen}>
        <ContextMenuTrigger asChild>
          <motion.div
            ref={cardRef}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }}
            aria-label={`Resume: ${resume.title}`}
          >
            <BaseCard
              className={cn(
                "group relative space-y-0 overflow-hidden transition-all duration-200",
                isHovered && "ring-2 ring-primary/20",
                isContextMenuOpen && "ring-2 ring-primary/40"
              )}
              onClick={onOpen}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />

              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary hover:bg-primary/20"
                  aria-label="Open resume"
                >
                  <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </motion.div>

              <motion.div
                className={cn(
                  "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-3 sm:p-4 pt-8 sm:pt-12",
                  "transition-transform duration-200 group-hover:translate-y-1"
                )}
                initial={{ y: 0 }}
                animate={{ y: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="line-clamp-2 text-sm sm:text-base font-medium transition-colors group-hover:text-primary">
                  {resume.title}
                </h4>
                <p className="line-clamp-1 text-[10px] sm:text-xs opacity-75">
                  Last updated{" "}
                  {formatDistanceToNow(new Date(resume.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </motion.div>
            </BaseCard>
          </motion.div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-40 sm:w-48">
          <ContextMenuItem onSelect={() => onOpen()}>
            <FolderOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
            Open
          </ContextMenuItem>

          <ContextMenuItem onSelect={() => handleAction("rename")}>
            <PencilSimple className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
            Rename
          </ContextMenuItem>

          <ContextMenuItem onSelect={() => handleAction("duplicate")}>
            <CopySimple className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
            Duplicate
          </ContextMenuItem>

          <ContextMenuSeparator />
          <ContextMenuItem
            onSelect={() => handleAction("delete")}
            className="text-destructive focus:text-destructive"
          >
            <TrashSimple className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isDialogOpen && (
        <ResumeActionDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          action={currentAction}
          resume={resume}
        />
      )}
    </>
  );
}
