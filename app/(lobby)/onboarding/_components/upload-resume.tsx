"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UploadIcon, X } from "lucide-react";
import { Icons } from "@/components/icons";
import { useAtom } from "jotai";
import { resumeStateAtom } from "@/state/resumeAtoms";
import axios from "axios";

export default function UploadResume() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setResumeState] = useAtom(resumeStateAtom);

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center relative min-h-screen p-4 sm:p-6 md:p-8"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div className="max-w-2xl text-center my-4 sm:my-6 md:my-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          How do you want to upload your resume?
        </h1>
      </div>

      {/* Upload Section */}
      {!file && (
        <div className="flex flex-col mt-4 sm:mt-6 md:mt-8 items-center justify-center space-y-4 sm:space-y-6 mb-4 sm:mb-6 w-full max-w-4xl">
          {/* Drag and Drop Section */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 w-full text-center">
            <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 mb-2 sm:mb-4" />
            <p className="mb-2 text-lg sm:text-xl font-semibold">
              Drag and drop a file here
            </p>
            <Button className="mt-2 sm:mt-4" onClick={handleFileInputClick}>
              Browse
            </Button>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center w-full">
            <hr className="w-full border-t border-gray-300" />
            <span className="px-3 text-sm font-semibold text-muted-foreground">OR</span>
            <hr className="w-full border-t border-gray-300" />
          </div>

          {/* Third-party Upload Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <Button
              variant="outline"
              className="w-full sm:w-48 flex items-center justify-center space-x-2"
            >
              <Icons.google className="w-4 h-4 mr-1" />
              <span>Google Drive</span>
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-48 flex items-center justify-center space-x-2"
            >
              <Icons.dropbox className="w-4 h-4 mr-1" />
              <span>Dropbox</span>
            </Button>
          </div>
        </div>
      )}

      {/* File Display Section */}
      {file && (
        <div className="relative flex flex-col items-center mt-4 sm:mt-6 border-2 border-dashed rounded-lg p-4 sm:p-6 w-full max-w-lg text-center mb-4">
          <Button
            className="absolute top-2 right-2 size-6 rounded-full"
            onClick={handleRemoveFile}
            size="icon"
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="text-base sm:text-lg font-medium my-2 sm:my-4">{file.name}</p>
          <Button className="mt-2" onClick={handleFileInputClick}>
            Change File
          </Button>
        </div>
      )}

      {/* File Type Information */}
      <div className="text-xs sm:text-sm mt-2 sm:mt-4">
        Files we can read:
        <span className="font-medium ml-1 text-xs text-muted-foreground">
          DOC, DOCX, PDF, TXT
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/onboarding?step=select-resume")}
        >
          Back
        </Button>

        <Button onClick={() => router.push("/editor")} disabled={!file}>
          Next
        </Button>
      </div>
    </motion.div>
  );
}
