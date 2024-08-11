"use client";

import { useAtom } from "jotai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, UploadIcon } from "lucide-react";

export default function SelectResume() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextClick = () => {
    if (selectedOption === "upload-existing") {
      router.push("/onboarding?step=upload-resume");
    } else if (selectedOption === "create-new") {
      router.push("/editor");
    } else {
      router.push("/onboarding?step=select-resume");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center relative min-h-screen p-4"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div className="max-w-2xl text-center my-4">
        <h1 className="text-2xl sm:text-4xl font-bold">
          Are you uploading an existing resume?
        </h1>
        <p className="mb-6 mt-4 text-muted-foreground text-sm sm:text-base">
          Just review, edit, and update it with new information.
        </p>
      </div>

      {/* Main Content for Templates */}
      <div className="flex-grow overflow-y-auto w-full p-4 sm:px-4 mb-20">
        <RadioGroup
          value={selectedOption || undefined}
          onValueChange={handleOptionChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Option 1: Create New Resume */}
          <div
            className={`relative flex flex-col items-center justify-between rounded-md border-2 transition-transform hover:scale-105 duration-300 ease-in-out peer-data-[state=checked]:border-primary p-4 sm:p-6 ${
              selectedOption === "create-new" ? "border-primary" : ""
            }`}
          >
            <RadioGroupItem
              value="create-new"
              id="create-new"
              className="peer sr-only"
            />
            <Label htmlFor="create-new" className="flex flex-col items-center cursor-pointer">
              <PencilIcon className="w-5 h-5 mb-2" />
              <span className="text-lg sm:text-xl font-semibold text-center">Create New Resume</span>
              <span className="text-muted-foreground mt-2 text-center text-sm sm:text-base">
                We'll guide you through the whole process so your skills can shine.
              </span>
            </Label>
          </div>

          {/* Option 2: Upload Existing Resume */}
          <div
            className={`relative flex flex-col items-center justify-between rounded-md border-2 transition-transform hover:scale-105 duration-300 ease-in-out peer-data-[state=checked]:border-primary p-4 sm:p-6 ${
              selectedOption === "upload-existing" ? "border-primary" : ""
            }`}
          >
            <RadioGroupItem
              value="upload-existing"
              id="upload-existing"
              className="peer sr-only"
            />
            <Label
              htmlFor="upload-existing"
              className="flex flex-col items-center cursor-pointer"
            >
              <UploadIcon className="w-5 h-5 mb-2" />
              <span className="text-lg sm:text-xl font-semibold text-center">
                Upload Existing Resume
              </span>
              <span className="text-muted-foreground mt-2 text-center text-sm sm:text-base">
                We'll guide you through enhancing your existing resume with expert tips.
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/onboarding?step=choose-template")}
        >
          Back
        </Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </motion.div>
  );
}
