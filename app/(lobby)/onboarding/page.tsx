import * as React from "react";
import { type Metadata } from "next";

import { Onboarding } from "./_components/onboarding";
import { Shell } from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";
import { GridPattern } from "@/components/grid-pattern";

export const metadata: Metadata = {
  title: "Onboarding | Builder",
  description: "Get started with creating your professional resume",
};

export default function OnboardingPage() {
  return (
    <Shell className=" h-screen max-w-screen-lg">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className="[mask-image:radial-gradient(300px_circle_at_left_top,white,transparent)]"
      />
      <React.Suspense fallback={<Skeleton className="size-full" />}>
        <Onboarding />
      </React.Suspense>
    </Shell>
  );
}
