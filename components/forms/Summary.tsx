// forms/summry.tsx
"use client";
import React from "react";
import { useAtom } from "@/state/store";
import { resumeStateAtom } from "@/state/resumeAtoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { TemplateProps } from "@/types/resume";

export function SummaryForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeState({
      ...resumeState,
      summary: event.target.value,
    });
  };

  return (
    <Card id="summary" className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Summary</CardTitle>
        <CardDescription>
          Write a concise summary highlighting your key qualifications and
          career objectives.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Textarea
          value={resumeState.summary}
          onChange={handleChange}
          className="w-full p-2 mt-2 border rounded resize-vertical"
          placeholder="Enter a brief summary about yourself (2-3 sentences)"
          rows={8}
        />
      </CardContent>
    </Card>
  );
}
