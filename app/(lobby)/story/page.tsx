import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight, CheckCircle2, Heart, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Discover why we're building ${siteConfig.name} and our mission to democratize resume building.`,
};

export default async function Page() {
  return (
    <div className="container max-w-[750px]">
      <Button
        size="icon"
        variant={"secondary"}
        className="absolute size-8 top-7 left-7"
        asChild
      >
        <Link href="/">
          <X className="w-4 h-4" />
        </Link>
      </Button>
      <div className="mt-8 space-y-12">
        <div className=" space-y-4">
          <h1 className="font-medium text-4xl leading-tight">
            This is why we're building{" "}
            <span className="text-primary text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Empowering everyone to create professional resumes, free of charge
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="font-semibold text-2xl">The Problem</h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              Building a professional resume or CV is crucial for students and
              freelancers entering the job market or seeking new opportunities.
              However, most online resume builders are paid services, making it
              challenging for those with limited budgets to create high-quality CVs.
              This financial barrier can hinder career growth and job prospects for
              many individuals who need to showcase their skills and experiences
              effectively.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="font-semibold text-2xl">Our Solution</h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              To address this issue, we're developing a free, user-friendly resume
              builder website. Our platform will offer a variety of professional
              templates, customization options, and guidance to help users create
              standout CVs without any cost. By providing this essential tool for
              free, we aim to level the playing field and empower students,
              freelancers, and job seekers to present their best selves to potential
              employers or clients.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
