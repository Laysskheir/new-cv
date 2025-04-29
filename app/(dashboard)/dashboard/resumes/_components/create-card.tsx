"use client";

import React, { useEffect, useState } from "react";
import { BaseResumeCard } from "./base-card";
import { Plus, Info } from "lucide-react";
import { CreateResume } from "../_dialogs/create-resume";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSubscriptionLimits } from "@/lib/client-subscription";

export function CreateResumeCard() {
  const [reachedLimit, setReachedLimit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscriptionLimits() {
      try {
        setLoading(true);
        // Use the client-side subscription limit checker
        const limits = await getSubscriptionLimits();

        // Free users can create up to 3 resumes
        if (!limits.canCreateMore) {
          setReachedLimit(true);
        } else {
          setReachedLimit(false);
        }
      } catch (error) {
        console.error("Failed to check subscription limits:", error);
        // Default to allowing creation
        setReachedLimit(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscriptionLimits();
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center h-full space-y-2 py-6">
      <div className="rounded-full bg-primary/10 p-3">
        <Plus className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="font-medium">Create Resume</h3>
        <p className="text-sm text-muted-foreground">Start from scratch</p>
        {reachedLimit && (
          <Badge variant="destructive" className="mt-2">
            Limit Reached
          </Badge>
        )}
      </div>
    </div>
  );

  if (reachedLimit) {
    return (
      <div className="space-y-2">
        <div className="opacity-60 cursor-not-allowed">
          <BaseResumeCard className="border-dashed">{content}</BaseResumeCard>
        </div>
        <div className="text-center text-sm text-muted-foreground space-y-3">
          <div className="flex items-center justify-center gap-1">
            <Info className="h-3 w-3" />
            <p>You've reached the free plan limit of 3 resumes</p>
          </div>
          <Button size="sm" variant="outline" asChild className="mt-1">
            <Link href="/dashboard/subscription">Upgrade to Pro</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CreateResume>
      <BaseResumeCard
        className="border-dashed hover:border-primary/50 hover:cursor-pointer transition-colors"
        disabled={loading}
      >
        {content}
      </BaseResumeCard>
    </CreateResume>
  );
}
