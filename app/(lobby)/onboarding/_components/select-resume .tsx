"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { client, user } from "@/lib/auth-client";
import { useToast } from "@/components/ui/use-toast";
import {
  PencilIcon,
  UploadIcon,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "create-new",
    title: "Create New Resume",
    description:
      "We'll guide you through the whole process so your skills can shine.",
    icon: PencilIcon,
    features: [
      "AI-powered suggestions",
      "Professional templates",
      "Real-time preview",
      "Export in multiple formats",
    ],
  },
  {
    id: "upload-existing",
    title: "Upload Existing Resume",
    description: "Coming Soon",
    icon: UploadIcon,
    features: [
      "Smart parsing",
      "Format conversion",
      "Content optimization",
      "Style matching",
    ],
    disabled: true,
  },
];

export default function SelectResume() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextClick = async () => {
    if (!selectedOption) return;

    setIsLoading(true);
    try {
      if (selectedOption === "upload-existing") {
        router.push("/onboarding?step=upload-resume");
      } else if (selectedOption === "create-new") {
        client.updateUser({
          onboardingCompleted: true,
          fetchOptions: {
            onSuccess: () => {
              toast({
                description: "Onboarding completed successfully",
              });
              router.push("/dashboard/resumes");
            },
            onError: (error: any) => {
              toast({
                description: error.error.message,
                variant: "destructive",
              });
            },
          },
        });
      }
    } catch (error) {
      console.error("Navigation error:", error);
      toast({
        description: "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div className="max-w-3xl w-full text-center my-4">
        <motion.h1
          className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let's Build Your Professional Resume
        </motion.h1>
        <motion.p
          className="mb-8 mt-4 text-muted-foreground text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose how you'd like to get started with your resume journey
        </motion.p>
      </div>

      <div className="flex-grow w-full max-w-4xl p-4 sm:px-4 mb-20">
        <RadioGroup
          value={selectedOption || undefined}
          onValueChange={handleOptionChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          {options.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative flex flex-col items-start rounded border-2 transition-all duration-300",
                "hover:shadow-lg hover:border-primary/50",
                "bg-card/50 backdrop-blur-sm",
                selectedOption === option.id && "border-primary shadow-lg",
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="peer sr-only"
                disabled={option.disabled}
              />
              <Label
                htmlFor={option.id}
                className="flex flex-col w-full p-6 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">{option.title}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {option.disabled ? "Coming Soon" : option.description}
                </p>
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push("/onboarding?step=choose-template")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNextClick}
            disabled={!selectedOption || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
