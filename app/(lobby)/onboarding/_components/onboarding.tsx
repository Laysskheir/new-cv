// @see https://github.com/juliusmarminge/acme-corp/blob/main/apps/nextjs/src/app/(dashboard)/onboarding/multi-step-form.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Intro } from "./intro";
import SelectResume from "./select-resume ";
import ChooseTemplate from "./choose-template";
import UploadResume from "./upload-resume";

export function Onboarding() {
  const search = useSearchParams();
  const step = search.get("step");

  return (
    <AnimatePresence mode="wait">
      {!step && <Intro key="intro" />}
      {step === "choose-template" && <ChooseTemplate />}
      {step === "select-resume" && <SelectResume />}
      {step === "upload-resume" && <UploadResume />}

    </AnimatePresence>
  );
}
