"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  renameResume,
  duplicateResume,
  deleteResume,
} from "@/actions/resume/resume-actions";
import { generateRandomName, kebabCase } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  MagicWand,
  Spinner,
  PencilSimple,
  CopySimple,
  TrashSimple,
} from "@phosphor-icons/react";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "rename" | "duplicate" | "delete" | null;
  resume: {
    id: string;
    title: string;
    slug: string;
  };
};

export function ResumeActionDialog({
  open,
  onOpenChange,
  action,
  resume,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(resume.title);
  const [slug, setSlug] = useState(resume.slug);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      setTitle(
        action === "duplicate" ? `${resume.title} (Copy)` : resume.title
      );
      setSlug(
        action === "duplicate" ? kebabCase(`${resume.title}-copy`) : resume.slug
      );
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  }, [open, action, resume.title, resume.slug]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(kebabCase(newTitle));
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    setTitle(name);
    setSlug(kebabCase(name));
    titleInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAction();
    }
  };

  const handleAction = async () => {
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    setLoading(true);

    try {
      switch (action) {
        case "rename":
          await renameResume(resume.id, title);
          toast({
            title: "Resume renamed successfully",
            description: `"${resume.title}" is now "${title}"`,
            duration: 3000,
          });
          break;
        case "duplicate":
          await duplicateResume(resume.id);
          toast({
            title: "Resume duplicated successfully",
            description: `Created a copy of "${resume.title}"`,
            duration: 3000,
          });
          break;
        case "delete":
          await deleteResume(resume.id);
          toast({
            title: "Resume deleted successfully",
            description: `"${resume.title}" has been permanently deleted`,
            duration: 3000,
          });
          break;
      }
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast({
        title: `Failed to ${action} resume`,
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (action) {
      case "rename":
      case "duplicate":
        return (
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              handleAction();
            }}
            onKeyDown={handleKeyDown}
            className="space-y-4"
          >
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <div className="flex gap-2">
                  <Input
                    ref={titleInputRef}
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                    minLength={3}
                    maxLength={100}
                    placeholder="Enter a descriptive title"
                    className="flex-1"
                    autoComplete="off"
                  />
                  <TooltipProvider>
                    <Tooltip content="Generate a random name">
                      <Button
                        size="icon"
                        type="button"
                        variant="outline"
                        onClick={onGenerateRandomName}
                        className="shrink-0"
                        disabled={loading}
                      >
                        <MagicWand className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {action === "duplicate" && (
                  <p className="text-sm text-muted-foreground">
                    Tip: Name your resume based on the position you're applying
                    for
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  minLength={3}
                  maxLength={100}
                  placeholder="resume-title"
                  className="font-mono"
                  autoComplete="off"
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the resume URL
                </p>
              </div>
            </div>
          </form>
        );
      case "delete":
        return (
          <div className="space-y-4">
            <DialogDescription>
              Are you sure you want to delete the resume "{resume.title}"? This
              action cannot be undone.
            </DialogDescription>
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              <p>
                ⚠️ All data associated with this resume will be permanently
                deleted.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action === "rename" && (
              <>
                <PencilSimple className="h-5 w-5" />
                Rename Resume
              </>
            )}
            {action === "duplicate" && (
              <>
                <CopySimple className="h-5 w-5" />
                Duplicate Resume
              </>
            )}
            {action === "delete" && (
              <>
                <TrashSimple className="h-5 w-5" />
                Delete Resume
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {renderContent()}
        <DialogFooter>
          {action === "delete" && (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleAction}
            disabled={loading}
            variant={action === "delete" ? "destructive" : "default"}
            className="min-w-[100px]"
          >
            {loading ? (
              <>
                <Spinner size={16} className="animate-spin mr-2" />
                {action === "rename" && "Renaming..."}
                {action === "duplicate" && "Duplicating..."}
                {action === "delete" && "Deleting..."}
              </>
            ) : action ? (
              action.charAt(0).toUpperCase() + action.slice(1)
            ) : (
              ""
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
