"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { createResume } from "@/actions/resume/create-resume";
import { kebabCase } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import React from "react";
import { Spinner } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Lock } from "lucide-react";
import Link from "next/link";
import { getSubscriptionLimits } from "@/lib/client-subscription";

// Zod schema for validation
const createResumeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
});

type CreateResumeForm = z.infer<typeof createResumeSchema>;

// Helper function for checking subscription limits - defined outside component to avoid strict mode issues
const checkSubscriptionLimits = async () => {
  try {
    const limits = await getSubscriptionLimits();

    if (!limits.canCreateMore) {
      return {
        hasError: true,
        error: `You've reached your limit of ${limits.limit} resumes on the free plan.`,
        needsUpgrade: true,
        currentCount: limits.resumeCount,
        limit: limits.limit
      };
    }

    return { hasError: false };
  } catch (error) {
    console.error("Error checking limits:", error);
    return { hasError: false };
  }
};

export function CreateResume({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [subscriptionError, setSubscriptionError] = useState<{
    error: string;
    needsUpgrade: boolean;
    currentCount: number;
    limit: number;
  } | null>(null);

  const form = useForm<CreateResumeForm>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const { watch, setValue } = form;

  // Check subscription limits when dialog opens
  useEffect(() => {
    if (open) {
      const checkLimits = async () => {
        const result = await checkSubscriptionLimits();
        if (result.hasError) {
          setSubscriptionError({
            error: result.error!,
            needsUpgrade: result.needsUpgrade!,
            currentCount: result.currentCount!,
            limit: result.limit!
          });
        } else {
          setSubscriptionError(null);
        }
      };

      checkLimits();
    }
  }, [open]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", kebabCase(value.title || ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = (formData: CreateResumeForm) => {
    // Reset subscription error
    setSubscriptionError(null);

    startTransition(async () => {
      const result = await createResume(null, formData);
      if (result.success) {
        toast({
          title: result.message || "Resume created successfully",
          variant: "default",
        });
        setOpen(false);
        router.refresh();
      } else if (result.error) {
        // Check if this is a subscription limit error
        if (result.needsUpgrade) {
          setSubscriptionError({
            error: result.error,
            needsUpgrade: result.needsUpgrade,
            currentCount: result.currentCount,
            limit: result.limit
          });
        } else {
          toast({
            title: result.error,
            variant: "destructive",
          });
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-5xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new resume</DialogTitle>
              <DialogDescription>
                Start building your resume by giving it a name.
              </DialogDescription>
            </DialogHeader>

            {subscriptionError && subscriptionError.needsUpgrade && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" /> Subscription Limit Reached
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p>{subscriptionError.error}</p>
                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <Link href="/dashboard/subscription">Upgrade to Pro</Link>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {!subscriptionError?.needsUpgrade && (
              <div className="grid gap-4 py-4">
                {/* Title field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Tip: You can name the resume referring to the position you
                        are applying for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug field */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              {subscriptionError?.needsUpgrade ? (
                <Button asChild variant="default">
                  <Link href="/dashboard/subscription">Upgrade to Pro</Link>
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Spinner size={16} className="animate-spin mr-2" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
