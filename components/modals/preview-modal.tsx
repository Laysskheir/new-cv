"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResumeTemplate from "../ResumeTemplate";
import { ScrollArea } from "../ui/scroll-area";

export default function PreviewModal({
  children,
  template,
  data,
}: {
  children: React.ReactNode;
  template: any;
  data: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl mt-4">
        <ScrollArea className=" h-[80vh]">
          {/* Render preview content here */}
          <ResumeTemplate template={template} data={data} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
