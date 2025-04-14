"use client";

import React, { useState } from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const DownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const element = document.getElementById("resume");
      if (!element) {
        throw new Error("Resume element not found");
      }

      const html2pdf = (await import("html2pdf.js")).default;

      const options = {
        filename: "resume.pdf",
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        margin: 0.5,
        pagebreak: { mode: ["avoid-all"] },
      };

      await html2pdf().set(options).from(element).save();

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="flex items-center justify-between "
      onClick={handleDownload}
      disabled={isLoading}
      aria-label="Download resume as PDF"
    >
      <div className="flex items-center">
        <DownloadCloud className="w-5 h-5 mr-2" />
        <div className="flex flex-col text-left">
          <p className="text-xs font-semibold">Download</p>
          <p className="text-[10px] ">1x as pdf</p>
        </div>
      </div>
    </Button>
  );
};

export default DownloadButton;
