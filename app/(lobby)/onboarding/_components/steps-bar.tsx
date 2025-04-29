"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {  ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsBarProps {
  steps: string[];
  currentStep: number;
  onComplete: () => Promise<void>;
  isCompleting: boolean;
}

export function StepsBar({
  steps,
  currentStep,
  onComplete,
  isCompleting,
}: StepsBarProps) {
  const router = useRouter();

  return (
    <div className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4">
        <div className="flex items-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="flex items-center gap-2 group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (index + 1 < currentStep) {
                  router.push(`/onboarding?step=${step}`);
                }
              }}
            >
              <div
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200",
                  index + 1 < currentStep &&
                    "border-primary bg-primary hover:bg-primary/90",
                  index + 1 === currentStep &&
                    "border-primary ring-2 ring-primary/20",
                  index + 1 > currentStep &&
                    "border-border hover:border-primary/50",
                  index + 1 < currentStep && "hover:scale-105"
                )}
              >
                {index + 1 < currentStep ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      index + 1 === currentStep && "text-primary",
                      index + 1 > currentStep && "text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    index + 1 <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground",
                    index + 1 < currentStep && "group-hover:text-primary"
                  )}
                >
                  {step
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                <span className="text-xs text-muted-foreground">
                  Step {index + 1} of {steps.length}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
