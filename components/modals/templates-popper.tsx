"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { resumeTemplateAtom, resumeStateAtom } from "@/state/resumeAtoms";
import { templates } from "@/config/templates";
import { ChevronDown } from "lucide-react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

// Define categories
const categories = ["All", "Simple", "Modern", "Creative"];

export function TemplatesPopper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useAtom(resumeTemplateAtom);
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to filter templates by category
  const filteredTemplates =
    selectedCategory === "All"
      ? Object.entries(templates)
      : Object.entries(templates).filter(
          ([, template]) => template.category === selectedCategory
        );

  return (
    <Popover onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.cv className="w-5 h-5 mr-1" />
          {children}
          <ChevronDown
            className={cn(
              "w-4 h-4 ml-1 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-xl p-4">
        <div className="mb-4 flex  gap-2">
          {/* Category Buttons */}
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "text-primary bg-accent"
                  : "text-muted-foreground"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        {/* Template List */}
        <div className="overflow-y-auto h-[60vh] hide_scrollbar">
          <RadioGroup
            value={selectedTemplate}
            className="grid grid-cols-2 gap-4 p-2"
            onValueChange={setSelectedTemplate}
          >
            {filteredTemplates.map(([key, template]) => {
              const MiniCardComponent = template.miniCard;

              return (
                <div key={key} className="">
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={key}
                    className={`relative flex cursor-pointer flex-col items-center justify-between rounded-md border-2 transition-transform hover:scale-105 duration-300 ease-in-out peer-data-[state=checked]:border-primary`}
                  >
                    <div className=" h-72 w-60 ">
                      {/* Render the MiniCard component with data from the atom */}
                      <MiniCardComponent template={key} data={resumeData} />
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
