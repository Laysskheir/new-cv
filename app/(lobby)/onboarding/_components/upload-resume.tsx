"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UploadIcon, X } from "lucide-react";
import { useAtom } from "jotai";
import { resumeStateAtom } from "@/state/resumeAtoms";
import { useToast } from "@/components/ui/use-toast";

export default function UploadResume() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOCX, DOC, or TXT file.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setUploadError(null);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to parse resume");
      }

      const parsedData = await response.json();
      setResumeState(parsedData);

      toast({
        title: "Resume parsed successfully",
        description: "Your resume has been processed and structured.",
      });

      router.push("/dashboard/resumes");
    } catch (error: any) {
      setLoading(false);
      setUploadError(
        error.message || "Failed to upload and parse resume. Please try again."
      );
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to upload and parse resume. Please try again.",
        variant: "destructive",
      });
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
          Upload Your Resume
        </h1>
        <p className="text-muted-foreground mt-2">
          We'll extract and structure your information automatically
        </p>
      </div>

      {!file && (
        <div className="flex flex-col mt-4 sm:mt-6 md:mt-8 items-center justify-center space-y-4 sm:space-y-6 mb-4 sm:mb-6 w-full max-w-4xl">
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
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
        </div>
      )}

      {file && (
        <div className="relative flex flex-col items-center mt-4 sm:mt-6 border-2 border-dashed rounded-lg p-4 sm:p-6 w-full max-w-lg text-center mb-4">
          <Button
            className="absolute top-2 right-2 size-6 rounded-full"
            onClick={handleRemoveFile}
            size="icon"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="text-base sm:text-lg font-medium my-2 sm:my-4">
            {file.name}
          </p>
          <Button
            className="mt-2"
            onClick={handleFileInputClick}
            variant="outline"
          >
            Change File
          </Button>
        </div>
      )}

      {file && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleFileUpload} disabled={loading}>
            {loading ? "Processing..." : "Process Resume"}
          </Button>
        </div>
      )}

      {uploadError && (
        <p className="text-red-500 mt-4 text-sm">{uploadError}</p>
      )}

      <div className="text-xs sm:text-sm mt-2 sm:mt-4 text-muted-foreground">
        Supported formats: PDF, DOCX, DOC, TXT
      </div>

      <div className="flex justify-between w-full fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/onboarding?step=select-resume")}
        >
          Back
        </Button>

        <Button onClick={handleFileUpload} disabled={!file || loading}>
          {loading ? "Processing..." : "Next"}
        </Button>
      </div>
    </motion.div>
  );
}
