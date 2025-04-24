// forms/workhistory.tsx
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
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { Label } from "../ui/label";
import { Trash2 } from "lucide-react";
import { TemplateProps, FormVisibility, WorkHistory } from "@/types/resume";

export function WorkHistoryForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleInputChange = (
    index: number,
    field: keyof WorkHistory,
    value:
      | string
      | string[]
      | { month: string; year: string; current?: boolean }
  ) => {
    const newWorkHistory = resumeState.workHistory.map((job, i) => {
      if (i === index) {
        return {
          ...job,
          [field]: value,
        };
      }
      return job;
    });
    setResumeState({
      ...resumeState,
      workHistory: newWorkHistory,
    });
  };

  const handleAddJob = () => {
    const newWorkHistory = [
      ...resumeState.workHistory,
      {
        title: "",
        employer: "",
        location: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "", current: false },
        description: [],
      },
    ];
    setResumeState({
      ...resumeState,
      workHistory: newWorkHistory,
    });
  };

  const deleteWorkEntry = (index: number) => {
    const newWorkHistory = resumeState.workHistory.filter((_, i) => i !== index);
    setResumeState({
      ...resumeState,
      workHistory: newWorkHistory,
    });
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      workHistory: !prev.workHistory,
    }));
  };

  return (
    <div id="workHistory" className="mt-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Work History</CardTitle>
          <CardDescription>
            Add your work experience in reverse chronological order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formVisibility.workHistory ? (
            <div className="space-y-4">
              {resumeState.workHistory?.map((job, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Job {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteWorkEntry(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Job Title</Label>
                        <Input
                          id={`title-${index}`}
                          value={job.title}
                          onChange={(e) =>
                            handleInputChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`employer-${index}`}>Employer</Label>
                        <Input
                          id={`employer-${index}`}
                          value={job.employer}
                          onChange={(e) =>
                            handleInputChange(index, "employer", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={job.location}
                        onChange={(e) =>
                          handleInputChange(index, "location", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Month"
                            value={job.startDate.month}
                            onChange={(e) =>
                              handleInputChange(index, "startDate", {
                                ...job.startDate,
                                month: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Year"
                            value={job.startDate.year}
                            onChange={(e) =>
                              handleInputChange(index, "startDate", {
                                ...job.startDate,
                                year: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Month"
                            value={job.endDate.month}
                            onChange={(e) =>
                              handleInputChange(index, "endDate", {
                                ...job.endDate,
                                month: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Year"
                            value={job.endDate.year}
                            onChange={(e) =>
                              handleInputChange(index, "endDate", {
                                ...job.endDate,
                                year: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      {job.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex gap-2">
                          <Input
                            value={desc}
                            onChange={(e) => {
                              const newDescription = [...job.description];
                              newDescription[descIndex] = e.target.value;
                              handleInputChange(
                                index,
                                "description",
                                newDescription
                              );
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newDescription = job.description.filter(
                                (_, i) => i !== descIndex
                              );
                              handleInputChange(
                                index,
                                "description",
                                newDescription
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleInputChange(index, "description", [
                            ...job.description,
                            "",
                          ]);
                        }}
                      >
                        Add Description Point
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleAddJob}>Add Job</Button>
            </div>
          ) : (
            <Button variant="outline" onClick={toggleFormVisibility}>
              Show Work History
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
