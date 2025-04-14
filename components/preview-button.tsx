"use client";

import { useAtom } from "@/state/store";
import { resumeStateAtom, resumeTemplateAtom } from "../state/resumeAtoms";
import React from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import ResumeTemplate from "./ResumeTemplate";

export default function PreviewButton() {
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedTemplate] = useAtom(resumeTemplateAtom);
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-center p-4 backdrop-blur-sm">
      <Drawer.Root>
        <DrawerTrigger asChild>
          <Button className="w-full max-w-[350px] overflow-y-auto rounded-full tracking-wide">
            Preview page
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[75%] pb-2">
          <ScrollArea className=" h-[80vh]">
            {/* Render preview content here */}
            <ResumeTemplate template={selectedTemplate} data={resumeData} />
          </ScrollArea>
        </DrawerContent>
      </Drawer.Root>
    </div>
  );
}
