"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

import { ThemeWrapper } from "@/components/themes/theme-wrapper";
import { Mockup } from "@/components/mockup";
import html2pdf from "html2pdf.js";

export default function SharedResumePage({
  params,
}: {
  params: { id: string };
}) {
  const handleDownload = () => {
    const element = document.getElementById("resume");
    if (element) {
      html2pdf().from(element).save("resume.pdf");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <Logo />
        <Button onClick={handleDownload}>Download PDF</Button>
      </header>
      <section className="flex items-center justify-center ">
        <ThemeWrapper>
          <Mockup />
        </ThemeWrapper>
      </section>
    </div>
  );
}
