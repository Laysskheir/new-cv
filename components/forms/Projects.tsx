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
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Icons } from "../icons";

const Projects: React.FC = () => {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleInputChange = (
    index: number,
    field: keyof (typeof resumeState.projects)[0],
    value: any
  ) => {
    setResumeState((prevState) => {
      const updatedProjects = prevState.projects.map((project, i) => {
        if (i === index) {
          return {
            ...project,
            [field]: value,
          };
        }
        return project;
      });
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  };

  const handleAddProject = () => {
    setResumeState((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        {
          name: "",
          description: "",
          technologies: [],
          link: "",
        },
      ],
    }));
  };

  const deleteProject = (index: number) => {
    setResumeState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter((_, i) => i !== index),
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisibility(prev => ({ ...prev, projects: !prev.projects }));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">
            Tell us about your projects
          </div>
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
          {resumeState.projects.map((project, index) => (
            <div key={index} className="mt-4 pb-4 space-y-4">
              <div className="flex justify-between">
                <Label className="font-bold italic">Project #{index + 1}</Label>
                <Button
                  onClick={() => deleteProject(index)}
                  size="icon"
                  variant="outline"
                  className="size-8"
                >
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </div>
              <Input
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                placeholder="Project Name *"
              />
              <Textarea
                value={project.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Project Description *"
              />
              <Input
                type="text"
                value={project.technologies.join(", ")}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "technologies",
                    e.target.value.split(", ")
                  )
                }
                placeholder="Technologies Used (comma-separated)"
              />
              <Input
                type="text"
                value={project.link}
                onChange={(e) =>
                  handleInputChange(index, "link", e.target.value)
                }
                placeholder="Project Link"
              />
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
};

export default Projects;
