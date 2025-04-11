"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { user } from "@/lib/auth-client";
import { useToast } from "@/components/ui/use-toast";
import { Intro } from "./intro";
import SelectResume from "./select-resume ";
import ChooseTemplate from "./choose-template";
import UploadResume from "./upload-resume";
import { StepsBar } from "./steps-bar";

export function Onboarding() {
  const router = useRouter();
  const search = useSearchParams();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);

  const step = search.get("step") ?? "";
  const steps = ["choose-template", "select-resume", "upload-resume"];
  const currentStep = steps.indexOf(step) + 1;

  // Redirect to dashboard if onboarding is already completed
  if (session?.user?.onboardingCompleted) {
    router.replace("/dashboard");
  }

  const handleCompleteOnboarding = async () => {
    try {
      setIsCompleting(true);
      await user.update({
        onboardingCompleted: true,
        fetchOptions: {
          onSuccess: () => {
            toast({
              description: "Onboarding completed successfully",
            });
            // Use replace instead of push to prevent going back to onboarding
            router.replace("/dashboard");
          },
          onError: (error: any) => {
            toast({
              description: error.error.message,
            });
          },
        },
      });
    } catch (error) {
      toast({
        description: "Failed to complete onboarding",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  // If no step is selected and user is not on intro, redirect to intro
  if (!step && !session?.user?.onboardingCompleted) {
    router.replace("/onboarding");
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {step && (
          <StepsBar
            steps={steps}
            currentStep={currentStep}
            onComplete={handleCompleteOnboarding}
            isCompleting={isCompleting}
          />
        )}

        <div className="flex-1">
          {!step && <Intro key="intro" />}
          {step === "choose-template" && <ChooseTemplate />}
          {step === "select-resume" && <SelectResume />}
          {step === "upload-resume" && <UploadResume />}
        </div>
      </AnimatePresence>
    </div>
  );
}
