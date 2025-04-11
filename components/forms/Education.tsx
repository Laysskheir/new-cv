// forms/eduction.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { Label } from "../ui/label";
import { Icons } from "../icons";
import { TemplateProps, FormVisibility } from "@/types/resume";

// Define the types for the education entry and resume state
interface GraduationDate {
  month: string;
  year: string;
}

interface EducationEntry {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: GraduationDate;
}

interface ResumeState {
  education: EducationEntry[];
}

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

const Education = ({
  resumeState,
  setResumeState,
  formVisibility,
  setFormVisibility,
}: TypesProps) => {
  const handleInputChange = (
    index: number,
    field: keyof (typeof resumeState.education)[0],
    value: string | { month: string; year: string }
  ) => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      education: prevState.education.map((edu, i) => {
        if (i === index) {
          return {
            ...edu,
            [field]: value,
          };
        }
        return edu;
      }),
    }));
  };

  const handleAddEducation = () => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          schoolName: "",
          schoolLocation: "",
          degree: "",
          fieldOfStudy: "",
          graduationDate: { month: "", year: "" },
        },
      ],
    }));
  };

  const deleteEducation = (index: number) => {
    setResumeState((prevState: TemplateProps) => ({
      ...prevState,
      education: prevState.education.filter((_, i) => i !== index),
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      education: !prev.education,
    }));
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => (1990 + i).toString()
  );

  const degrees = [
    "Bachelor's",
    "Master's",
    "PhD",
    "Associate's",
    "Diploma",
    "Certificate",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card id="education" className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">Tell us about your education</div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.education ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.education && (
          <CardDescription>
            Enter your education experience so far, even if you are a current
            student or did not graduate.
          </CardDescription>
        )}
      </CardHeader>

      {formVisibility.education && (
        <CardContent>
          {resumeState.education.map((entry, index) => (
            <div key={index} className="mt-4 pb-4 space-y-4">
              <div className="flex justify-between">
                <Label className="font-bold italic">
                  Education #{index + 1}
                </Label>

                {/* Delete Button */}
                <Button
                  onClick={() => deleteEducation(index)}
                  size="icon"
                  variant="outline"
                  className="size-8"
                >
                  <Icons.trash className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex gap-4 mt-2">
                {/* School Name */}
                <Input
                  type="text"
                  value={entry.schoolName}
                  onChange={(e) =>
                    handleInputChange(index, "schoolName", e.target.value)
                  }
                  placeholder="School Name *"
                />

                {/* School Location */}
                <Input
                  type="text"
                  value={entry.schoolLocation}
                  onChange={(e) =>
                    handleInputChange(index, "schoolLocation", e.target.value)
                  }
                  placeholder="School Location"
                />
              </div>

              {/* Degree */}
              <Select
                onValueChange={(value) =>
                  handleInputChange(index, "degree", value)
                }
                value={entry.degree}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent>
                  {degrees.map((degree, idx) => (
                    <SelectItem key={idx} value={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Field of Study */}
              <Input
                type="text"
                value={entry.fieldOfStudy}
                onChange={(e) =>
                  handleInputChange(index, "fieldOfStudy", e.target.value)
                }
                placeholder="Field of Study"
              />

              {/* Graduation Date */}
              <div className="flex gap-4 mt-2">
                <Select
                  onValueChange={(value) =>
                    handleInputChange(index, "graduationDate", {
                      ...entry.graduationDate,
                      month: value,
                    })
                  }
                  value={entry.graduationDate.month}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Graduation Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, idx) => (
                      <SelectItem key={idx} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) =>
                    handleInputChange(index, "graduationDate", {
                      ...entry.graduationDate,
                      year: value,
                    })
                  }
                  value={entry.graduationDate.year}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Graduation Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year, idx) => (
                      <SelectItem key={idx} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          <div className="flex justify-end w-full">
            <Button onClick={handleAddEducation} size="sm">
              Add Education
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Education;
