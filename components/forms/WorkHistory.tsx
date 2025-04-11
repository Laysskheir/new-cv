// forms/workhistory.tsx
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
import { Trash2 } from "lucide-react";
import { Icons } from "../icons";
import { TemplateProps, FormVisibility } from "@/types/resume";

interface TypesProps {
  resumeState: TemplateProps;
  setResumeState: (
    newState: TemplateProps | ((prev: TemplateProps) => TemplateProps)
  ) => void;
  formVisibility: FormVisibility;
  setFormVisibility: (
    visibility: FormVisibility | ((prev: FormVisibility) => FormVisibility)
  ) => void;
}

const WorkHistory = ({
  resumeState,
  setResumeState,
  formVisibility,
  setFormVisibility,
}: TypesProps) => {
  const handleInputChange = (
    index: number,
    field: keyof (typeof resumeState.workHistory)[0],
    value:
      | string
      | string[]
      | { month: string; year: string; current?: boolean }
  ) => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      workHistory: prevState.workHistory.map((job, i) => {
        if (i === index) {
          return {
            ...job,
            [field]: value,
          };
        }
        return job;
      }),
    }));
  };

  const handleAddJob = () => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      workHistory: [
        ...prevState.workHistory,
        {
          title: "",
          employer: "",
          location: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "", current: false },
          description: [""],
        },
      ],
    }));
  };

  const deleteWorkEntry = (index: number) => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      workHistory: prevState.workHistory.filter((_, i) => i !== index),
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      workHistory: !prev.workHistory,
    }));
  };

  return (
    <Card id="workHistory" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">Tell us about your job</div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.workHistory ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.workHistory && (
          <CardDescription>
            We'll put your work history in the right order.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.workHistory && (
        <CardContent>
          {resumeState.workHistory.map((job, index) => (
            <div key={index} className="mt-4 pb-4 space-y-4">
              <div className="flex justify-between">
                <Label className="font-bold italic">Job #{index + 1}</Label>

                {/* Delete Button */}
                <Button
                  onClick={() => deleteWorkEntry(index)}
                  size="icon"
                  variant="outline"
                  className="size-8"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Input
                type="text"
                value={job.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                placeholder="Job Title *"
              />
              <Input
                type="text"
                value={job.employer}
                onChange={(e) =>
                  handleInputChange(index, "employer", e.target.value)
                }
                placeholder="Employer *"
              />
              <Input
                type="text"
                value={job.location}
                onChange={(e) =>
                  handleInputChange(index, "location", e.target.value)
                }
                placeholder="Location"
              />

              <fieldset className="flex gap-4 mt-2">
                <legend className="sr-only">Start Date</legend>
                <Input
                  type="text"
                  value={job.startDate.month}
                  onChange={(e) =>
                    handleInputChange(index, "startDate", {
                      ...job.startDate,
                      month: e.target.value,
                    })
                  }
                  placeholder="Start Month"
                />
                <Input
                  type="text"
                  value={job.startDate.year}
                  onChange={(e) =>
                    handleInputChange(index, "startDate", {
                      ...job.startDate,
                      year: e.target.value,
                    })
                  }
                  placeholder="Start Year"
                />
              </fieldset>
              <fieldset className="flex gap-4 mt-2">
                <legend className="sr-only">End Date</legend>
                <Input
                  type="text"
                  value={job.endDate.month}
                  onChange={(e) =>
                    handleInputChange(index, "endDate", {
                      ...job.endDate,
                      month: e.target.value,
                    })
                  }
                  placeholder="End Month"
                  disabled={job.endDate.current}
                />
                <Input
                  type="text"
                  value={job.endDate.year}
                  onChange={(e) =>
                    handleInputChange(index, "endDate", {
                      ...job.endDate,
                      year: e.target.value,
                    })
                  }
                  placeholder="End Year"
                  disabled={job.endDate.current}
                />
              </fieldset>
            </div>
          ))}
          <div className="flex justify-end w-full">
            <Button onClick={handleAddJob} size="sm">
              Add Another Job
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WorkHistory;
