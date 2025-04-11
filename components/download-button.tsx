import React from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

const DownloadButton = () => {

  const handleDownload = async () => {
    const element = document.getElementById("resume");

    if (element) {
      const options = {
        filename: "resume.pdf",
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div>
      <Button
        className="flex items-center justify-between"
        onClick={handleDownload}
      >
        <div className="flex items-center mr-2">
          <DownloadCloud className="w-5 h-5 mr-2 " />
          <div className="flex flex-col text-left ">
            <p className="text-xs font-semibold">Download</p>
            <p className="text-[10px] ">1x as pdf</p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default DownloadButton;
