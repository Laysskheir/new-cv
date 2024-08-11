"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons"; // Import your custom icons here

// Schema for form validation
const FormSchema = z.object({
  feedback: z
    .string()
    .min(10, {
      message: "Feedback must be at least 10 characters.",
    })
    .max(160, {
      message: "Feedback must not be longer than 160 characters.",
    }),
});

export function FeedbackModal({ children }: { children: React.ReactNode }) {
  const [rating, setRating] = useState<number | null>(null); // State for storing the selected rating

  // React Hook Form setup
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Feedback submitted", { ...data, rating });
    // Handle form submission here, e.g., send data to an API
  };

  // Function to change rating
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Send Feedback</DialogTitle>
          <p className="text-sm text-gray-500">We read them all!</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Emoji Rating Buttons */}
            <div className="flex justify-around items-center mb-4">
              {[
                {
                  value: 1,
                  icon: <Icons.angry className="size-12" />,
                  label: "Angry",
                },
                {
                  value: 2,
                  icon: <Icons.neutral className="size-12" />,
                  label: "Neutral",
                },
                {
                  value: 3,
                  icon: <Icons.happy className="size-12" />,
                  label: "Happy",
                },
                {
                  value: 5,
                  icon: <Icons.love className="size-12" />,
                  label: "Love",
                },
                {
                  value: 4,
                  icon: <Icons.cool className="size-12" />,
                  label: "Cool",
                },
              ].map(({ value, icon, label }) => (
                <Button
                  type="button"
                  key={value}
                  size="icon"
                  variant="outline"
                  onClick={() => handleRatingChange(value)}
                  className={`p-1 transition-transform transform ease-in-out rounded-full ${
                    rating === value
                      ? "scale-125 text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                  aria-label={label}
                >
                  {icon}
                </Button>
              ))}
            </div>

            {/* Feedback Textarea */}
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How can we improve your experience?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your feedback..."
                      className="resize-none border-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" className="w-full">
                Send Feedback
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
