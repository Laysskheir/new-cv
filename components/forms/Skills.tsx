// forms/skills.tsx
"use client";

import React from "react";
import { useAtom } from "jotai";
import { skillsAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
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

const Skills = ({
  resumeState,
  setResumeState,
  formVisibility,
  setFormVisibility,
}: TypesProps) => {
  const [skills, setSkills] = useAtom(skillsAtom);

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => (i === index ? value : skill))
    );
  };

  const deleteSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev) => ({ ...prev, skills: !prev.skills }));
  };

  return (
    <Card id="skills" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">
            What skills would you like to highlight?
          </div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.skills ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.skills && (
          <CardDescription>
            Choose from our pre-written examples below or write your own.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.skills && (
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="relative">
                <Icons.lightning className="absolute text-muted-foreground left-2 top-2/4 size-4 -translate-y-1/4" />
                <Input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full p-2 mt-2 pl-10 pr-10 border rounded"
                  placeholder="Enter a skill"
                />
                <Button
                  onClick={() => deleteSkill(index)}
                  size="icon"
                  variant="outline"
                  className="size-8 absolute mt-1 right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-end w-full col-span-2">
              <Button onClick={handleAddSkill} size="sm">
                Add Skill
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Skills;
