"use client";

import { UploadSimple } from "@phosphor-icons/react";
import { BaseResumeCard } from "./base-card";
import { cn } from "@/lib/utils";

export function ImportResumeCard() {
  return (
    <BaseResumeCard className="border-dashed hover:border-primary/50 hover:cursor-pointer transition-colors">
      <div className="flex flex-col items-center justify-center h-full space-y-2 py-6">
        <div className="rounded-full bg-primary/10 p-3">
          <UploadSimple className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="font-medium">Import Resume</h3>
          <p className="text-sm text-muted-foreground">Upload an existing resume</p>
        </div>
      </div>
    </BaseResumeCard>
  );
}
