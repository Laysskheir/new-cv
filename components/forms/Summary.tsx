"use client";

import React from "react";
import { useAtom } from "jotai";
import { resumeStateAtom } from "@/state/resumeAtoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";

const Summary: React.FC = () => {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeState((prevState) => ({
      ...prevState,
      summary: event.target.value,
    }));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Briefly tell us about your background
        </CardTitle>
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
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default Summary;