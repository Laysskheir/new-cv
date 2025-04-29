"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResumeTemplate from "../ResumeTemplate";
import { ScrollArea } from "../ui/scroll-area";
import { Icons } from "../icons";

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
        <Button variant="outline" className="flex items-center gap-2">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <ScrollArea className="h-[70vh]">
          <ResumeTemplate template={template} data={data} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
