// forms/projects.tsx
"use client";

import React from "react";
import { useAtom } from "@/state/store";
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
import { TemplateProps, FormVisibility, Project } from "@/types/resume";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";

export function ProjectsForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleInputChange = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const newProjects = resumeState.projects.map((project, i) => {
      if (i === index) {
        return {
          ...project,
          [field]: value,
        };
      }
      return project;
    });
    setResumeState({
      ...resumeState,
      projects: newProjects,
    });
  };

  const handleAddProject = () => {
    const newProjects = [
      ...resumeState.projects,
      {
        name: "",
        description: "",
        technologies: [],
        link: "",
      },
    ];
    setResumeState({
      ...resumeState,
      projects: newProjects,
    });
  };

  const deleteProject = (index: number) => {
    const newProjects = resumeState.projects.filter((_, i) => i !== index);
    setResumeState({
      ...resumeState,
      projects: newProjects,
    });
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      projects: !prev.projects,
    }));
  };

  return (
    <Card id="projects" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">Projects</div>
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
            Showcase your best projects and achievements.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.projects && (
        <CardContent>
          {resumeState.projects?.map((project, index) => (
            <div key={index} className="space-y-4">
              <div>
                <Label>
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name={`projects.${index}.name`}
                  value={project.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <Label>
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name={`projects.${index}.description`}
                  value={project.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  rows={3}
                  required
                  placeholder="Enter project description"
                />
              </div>
              <div>
                <Label>
                  Technologies <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name={`projects.${index}.technologies`}
                  value={project.technologies.join(", ")}
                  onChange={(e) => {
                    const technologies = e.target.value
                      .split(",")
                      .map((tech) => tech.trim());
                    handleInputChange(index, "technologies", technologies);
                  }}
                  placeholder="Enter technologies separated by commas"
                  required
                />
              </div>
              <div>
                <Label>Project Link</Label>
                <Input
                  type="url"
                  name={`projects.${index}.link`}
                  value={project.link}
                  onChange={(e) =>
                    handleInputChange(index, "link", e.target.value)
                  }
                  placeholder="Enter project URL"
                />
              </div>
              <Button
                type="button"
                onClick={() => deleteProject(index)}
                size="icon"
                variant="outline"
                className="size-8 bg-destructive"
              >
                <Icons.trash className="w-3 h-3" />
              </Button>
            </div>
          ))}
          <div className="flex justify-end w-full">
            <Button onClick={handleAddProject} size="sm">
              Add Another Project
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
