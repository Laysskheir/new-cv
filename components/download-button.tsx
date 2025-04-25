"use client";

import React, { useState } from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { pdfGenerator } from '@/lib/pdf-generator';

const DownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) {
      toast({
        title: "Error",
        description: "Resume element not found",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Add print-mode class before generating PDF
      resumeElement.classList.add('print-mode');

      await pdfGenerator.generatePDF(resumeElement, {
        filename: "resume.pdf",
        scale: 2
      });

      // Remove print-mode class after generating PDF
      resumeElement.classList.remove('print-mode');

      toast({
        title: "Success",
        description: "PDF downloaded successfully!"
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to download PDF",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="flex items-center justify-between"
      onClick={handleDownload}
      disabled={isLoading}
      aria-label="Download resume as PDF"
    >
      <div className="flex items-center">
        <DownloadCloud className="w-5 h-5 mr-2" />
        <div className="flex flex-col text-left">
          <p className="text-xs font-semibold">Download</p>
          <p className="text-[10px]">PDF format</p>
        </div>
      </div>
    </Button>
  );
};

export default DownloadButton;
