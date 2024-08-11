import React from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { downloadFormatAtom } from "@/state/resumeAtoms";
import html2pdf from "html2pdf.js";
import { convert } from "html-to-text";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const DownloadButton = () => {
  const [downloadFormat] = useAtom(downloadFormatAtom);

  const handleDownload = async () => {
    const element = document.getElementById("resume");
    if (element) {
      switch (downloadFormat) {
        case "pdf":
          html2pdf().from(element).save("resume.pdf");
          break;
        case "docx":
          await downloadAsDocx(element);
          break;
        case "txt":
          downloadAsTxt(element);
          break;
      }
    }
  };

  const downloadAsTxt = (element: HTMLElement) => {
    const text = convert(element.innerHTML, {
      wordwrap: 130,
      ignoreImage: true,
      ignoreHref: true,
    });
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "resume.txt");
  };

  const downloadAsDocx = async (element: HTMLElement) => {
    const text = convert(element.innerHTML, {
      wordwrap: false,
      ignoreImage: true,
      ignoreHref: true,
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
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
            <p className="text-[10px] ">1x as {downloadFormat.toUpperCase()}</p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default DownloadButton;
