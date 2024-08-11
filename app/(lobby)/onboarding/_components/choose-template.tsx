"use client";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { resumeTemplateAtom, resumeStateAtom } from "@/state/resumeAtoms";
import { templates } from "@/config/templates";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChooseTemplate() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useAtom(resumeTemplateAtom);
  const [resumeData] = useAtom(resumeStateAtom);

  // State for filters
  const [colorFilter, setColorFilter] = useState("");
  const [withPhoto, setWithPhoto] = useState(false);
  const [withoutPhoto, setWithoutPhoto] = useState(false);
  const [columns, setColumns] = useState<number | null>(null);

  // Sample templates filtering logic
  const filteredTemplates = Object.entries(templates);

  return (
    <motion.div
      className="flex flex-col items-center relative min-h-screen p-4"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div className="max-w-2xl text-center my-4">
        <h1 className="text-2xl sm:text-4xl font-bold">Choose from our best templates</h1>
        <p className="mb-6 text-muted-foreground text-sm sm:text-base">
          You can always change your template later.
        </p>
      </div>
      <div className="w-full max-w-6xl px-2 sm:px-4">
        {/* Main Content for Templates */}
        <div className="overflow-y-auto h-[calc(100vh-300px)] hide_scrollbar p-2 sm:p-4">
          <RadioGroup
            value={selectedTemplate}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            onValueChange={(value) => setSelectedTemplate(value)}
          >
            {filteredTemplates.map(([key, template]) => {
              const MiniCardComponent = template.miniCard;
              return (
                <div key={key} className="relative aspect-[3/4]">
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={key}
                    className="relative flex flex-col items-center justify-center rounded-md border-2 transition-all hover:scale-105 duration-300 ease-in-out peer-data-[state=checked]:border-primary overflow-hidden h-full cursor-pointer"
                  >
                    <div className="w-full h-full">
                      <MiniCardComponent template={key} />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 ease-in-out " />
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full px-4 mt-6 fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/onboarding?step=select-resume")}
        >
          Choose Later
        </Button>
        <Button onClick={() => router.push("/onboarding?step=select-resume")}>
          Choose Template
        </Button>
      </div>
    </motion.div>
  );
}
