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
import { TemplateProps } from "@/types/resume";

interface FormVisibility {
  skills: boolean;
  education: boolean;
  workHistory: boolean;
  projects: boolean;
  summary: boolean;
  personalDetails: boolean;
  languages: boolean;
  customSections: boolean;
}

interface TypesProps {
  resumeState: TemplateProps;
  setResumeState: (newState: TemplateProps) => void;
  formVisibility: FormVisibility;
  setFormVisibility: (visibility: FormVisibility) => void;
}

const Achievements = ({
  resumeState,
  setResumeState,
  formVisibility,
  setFormVisibility,
}: TypesProps) => {
  const handleInputChange = (
    index: number,
    field: keyof (typeof resumeState.achievements)[0],
    value: string
  ) => {
    setResumeState((prevState) => {
      const updatedAchievements = prevState.achievements.map(
        (achievement, i) => {
          if (i === index) {
            return {
              ...achievement,
              [field]: value,
            };
          }
          return achievement;
        }
      );
      return {
        ...prevState,
        achievements: updatedAchievements,
      };
    });
  };

  const handleAddAchievement = () => {
    setResumeState((prevState) => ({
      ...prevState,
      achievements: [
        ...prevState.achievements,
        {
          title: "",
          description: "",
          date: "",
        },
      ],
    }));
  };

  const deleteAchievement = (index: number) => {
    setResumeState((prevState) => ({
      ...prevState,
      achievements: prevState.achievements.filter((_, i) => i !== index),
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev) => ({
      ...prev,
      achievements: !prev.achievements,
    }));
  };

  return (
    <Card id="achievements" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">
            Tell us about your achievements
          </div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.achievements ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.achievements && (
          <CardDescription>
            Highlight your key achievements and accomplishments.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.achievements && (
        <CardContent>
          {resumeState.achievements.map((achievement, index) => (
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
};

export default Achievements;
