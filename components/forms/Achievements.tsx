// forms/archievemnst.tsx
"use client";
import React from "react";
import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Icons } from "../icons";
import { TemplateProps, FormVisibility, Achievement } from "@/types/resume";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";

export function AchievementsForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleInputChange = (
    index: number,
    field: keyof Achievement,
    value: string
  ) => {
    setResumeState({
      ...resumeState,
      achievements: resumeState.achievements.map((achievement, i) => {
        if (i === index) {
          return {
            ...achievement,
            [field]: value,
          };
        }
        return achievement;
      }),
    });
  };

  const handleAddAchievement = () => {
    setResumeState({
      ...resumeState,
      achievements: [
        ...resumeState.achievements,
        {
          title: "",
          description: "",
          date: "",
        },
      ],
    });
  };

  const deleteAchievement = (index: number) => {
    setResumeState({
      ...resumeState,
      achievements: resumeState.achievements.filter((_, i) => i !== index),
    });
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      projects: !prev.projects, // Using projects visibility for achievements
    }));
  };

  return (
    <Card id="achievements" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">Achievements</div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.projects ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.projects && (
          <CardDescription>
            Highlight your key achievements and accomplishments.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.projects && (
        <CardContent>
          {resumeState.achievements?.map((achievement, index) => (
            <div key={index} className="mt-4 pb-4 space-y-4">
              <div className="flex justify-between">
                <Label className="font-bold italic">
                  Achievement #{index + 1}
                </Label>
                <Button
                  onClick={() => deleteAchievement(index)}
                  size="icon"
                  variant="outline"
                  className="size-8"
                >
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </div>
              <Input
                type="text"
                value={achievement.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                placeholder="Achievement Title *"
              />
              <Textarea
                value={achievement.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Achievement Description *"
              />
              <Input
                type="text"
                value={achievement.date}
                onChange={(e) =>
                  handleInputChange(index, "date", e.target.value)
                }
                placeholder="Date (e.g., May 2023)"
              />
            </div>
          ))}
          <div className="flex justify-end w-full">
            <Button onClick={handleAddAchievement} size="sm">
              Add Another Achievement
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
