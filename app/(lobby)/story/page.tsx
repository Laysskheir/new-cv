import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Story",
  description: `This is why we're building ${siteConfig.name}.`,
};

export default async function Page() {
  return (
    <div className="container max-w-[750px] ">
      <Button
        size="icon"
        variant="ghost"
        className="absolute size-8 top-7 left-7"
        asChild
      >
        <Link href="/">
          <X className="w-4 h-4" />
        </Link>
      </Button>
      <h1 className="mt-24 font-medium text-center text-5xl mb-10 leading-snug">
        This is why we're building <br />
        {siteConfig.name}.
      </h1>

      <h3 className="font-medium text-xl mb-2">Problem</h3>
      <p className="text-muted-foreground mb-8">
        Building a professional resume or CV is crucial for students and
        freelancers entering the job market or seeking new opportunities.
        However, most online resume builders are paid services, making it
        challenging for those with limited budgets to create high-quality CVs.
        This financial barrier can hinder career growth and job prospects for
        many individuals who need to showcase their skills and experiences
        effectively.
      </p>

      <h3 className="font-medium text-xl mb-2">Solution</h3>
      <p className="text-muted-foreground mb-8">
        To address this issue, we're developing a free, user-friendly resume
        builder website. Our platform will offer a variety of professional
        templates, customization options, and guidance to help users create
        standout CVs without any cost. By providing this essential tool for
        free, we aim to level the playing field and empower students,
        freelancers, and job seekers to present their best selves to potential
        employers or clients.
      </p>
    </div>
  );
}
