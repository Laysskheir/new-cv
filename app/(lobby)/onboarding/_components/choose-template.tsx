"use client";
import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, LayoutGrid, LayoutList } from "lucide-react";

import { resumeTemplateAtom, resumeStateAtom } from "@/state/resumeAtoms";
import { templates } from "@/config/templates";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ChooseTemplate() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useAtom(resumeTemplateAtom);
  const [resumeData] = useAtom(resumeStateAtom);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <motion.h1
                className="text-2xl font-semibold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Select a Template
              </motion.h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
                  }
                  className="h-8 w-8"
                >
                  {viewMode === "grid" ? (
                    <LayoutGrid className="w-4 h-4" />
                  ) : (
                    <LayoutList className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Choose a design that best suits your professional needs
            </motion.p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto px-4 py-4">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <RadioGroup
            value={selectedTemplate}
            className={cn(
              "grid gap-4",
              viewMode === "grid"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1"
            )}
            onValueChange={setSelectedTemplate}
          >
            <AnimatePresence mode="popLayout">
              {Object.entries(templates).map(([key, template]) => (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "relative",
                    viewMode === "list" && "flex gap-4"
                  )}
                >
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={key}
                    className={cn(
                      "relative flex flex-col rounded-lg border transition-all duration-200",
                      "hover:border-primary hover:shadow-sm",
                      "bg-card/50 backdrop-blur-sm",
                      selectedTemplate === key && "border-primary shadow-sm",
                      viewMode === "list" && "flex-row w-full"
                    )}
                  >
                    <div
                      className={cn(
                        "w-full",
                        viewMode === "list"
                          ? "aspect-video w-48"
                          : "aspect-[4/3]"
                      )}
                    >
                      <template.miniCard template={key} />
                    </div>
                    <div
                      className={cn(
                        "p-3 space-y-1",
                        viewMode === "list" && "flex-1"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{template.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {template.layoutType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </Label>
                </motion.div>
              ))}
            </AnimatePresence>
          </RadioGroup>
        </ScrollArea>
      </div>

      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => router.push("/onboarding")}
              className="h-9"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => router.push("/onboarding?step=select-resume")}
              className="h-9"
              disabled={!selectedTemplate}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
