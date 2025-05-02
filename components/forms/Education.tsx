// forms/eduction.tsx
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
import { Button } from "@/components/ui/button";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { FormVisibility } from "@/types/resume";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export function EducationForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleInputChange = (
    index: number,
    field: keyof (typeof resumeState.education)[0],
    value: string | { month: string; year: string }
  ) => {
    setResumeState({
      ...resumeState,
      education: resumeState.education.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            [field]: value,
          };
        }
        return entry;
      }),
    });
  };

  const handleAddEducation = () => {
    setResumeState({
      ...resumeState,
      education: [
        ...resumeState.education,
        {
          schoolName: "",
          schoolLocation: "",
          degree: "",
          fieldOfStudy: "",
          graduationDate: { month: "", year: "" },
        },
      ],
    });
  };

  const deleteEducation = (index: number) => {
    setResumeState({
      ...resumeState,
      education: resumeState.education.filter((_, i) => i !== index),
    });
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      education: !prev.education,
    }));
  };

  return (
    <Card id="education" className="mt-4">
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add your educational background in reverse chronological order
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formVisibility.education ? (
          <div className="space-y-4">
            {resumeState.education?.map((entry, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label className="font-bold italic">
                    Education #{index + 1}
                  </Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="School Name"
                        value={entry.schoolName}
                        onChange={(e) =>
                          handleInputChange(index, "schoolName", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="School Location"
                        value={entry.schoolLocation}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "schoolLocation",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Degree"
                        value={entry.degree}
                        onChange={(e) =>
                          handleInputChange(index, "degree", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Field of Study"
                        value={entry.fieldOfStudy}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Graduation Month"
                        value={entry.graduationDate.month}
                        onChange={(e) =>
                          handleInputChange(index, "graduationDate", {
                            ...entry.graduationDate,
                            month: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Graduation Year"
                        value={entry.graduationDate.year}
                        onChange={(e) =>
                          handleInputChange(index, "graduationDate", {
                            ...entry.graduationDate,
                            year: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={handleAddEducation}>Add Education</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={toggleFormVisibility}>
            Show Education
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
