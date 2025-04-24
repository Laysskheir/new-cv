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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { TemplateProps, FormVisibility } from "@/types/resume";
import { Switch } from "@/components/ui/switch";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import { Trash2 } from "lucide-react";

interface CustomSection {
  title: string;
  description: string;
  icon: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string; current: boolean };
  includeTitle: boolean;
  includeDescription: boolean;
  includeDate: boolean;
  includeIcon: boolean;
}

export function CustomSectionForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleAddSection = () => {
    setResumeState({
      ...resumeState,
      customSections: [
        ...resumeState.customSections,
        {
          title: "",
          description: "",
          icon: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "", current: false },
          includeTitle: true,
          includeDescription: true,
          includeDate: true,
        },
      ],
    });
  };

  const handleEditSection = (
    index: number,
    field: keyof CustomSection,
    value: any
  ) => {
    setResumeState({
      ...resumeState,
      customSections: resumeState.customSections.map((section, i) => {
        if (i === index) {
          return {
            ...section,
            [field]: value,
          };
        }
        return section;
      }),
    });
  };

  const handleEmojiClick = (index: number, emojiObject: any) => {
    handleEditSection(index, "icon", emojiObject.native);
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev: FormVisibility) => ({
      ...prev,
      customSections: !prev.customSections,
    }));
  };

  return (
    <Card id="customSections" className="mt-4">
      <CardHeader>
        <CardTitle>Custom Sections</CardTitle>
        <CardDescription>
          Add any additional sections to your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formVisibility.customSections ? (
          <div className="space-y-4">
            {resumeState.customSections?.map((section, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Section {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setResumeState({
                        ...resumeState,
                        customSections: resumeState.customSections.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) =>
                        handleEditSection(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Section Description"
                      value={section.description}
                      onChange={(e) =>
                        handleEditSection(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Start Month"
                        value={section.startDate.month}
                        onChange={(e) =>
                          handleEditSection(index, "startDate", {
                            ...section.startDate,
                            month: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Start Year"
                        value={section.startDate.year}
                        onChange={(e) =>
                          handleEditSection(index, "startDate", {
                            ...section.startDate,
                            year: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="End Month"
                        value={section.endDate.month}
                        onChange={(e) =>
                          handleEditSection(index, "endDate", {
                            ...section.endDate,
                            month: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="End Year"
                        value={section.endDate.year}
                        onChange={(e) =>
                          handleEditSection(index, "endDate", {
                            ...section.endDate,
                            year: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={section.includeTitle}
                      onCheckedChange={(checked: boolean) =>
                        handleEditSection(index, "includeTitle", checked)
                      }
                    />
                    <Label>Include Title</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={section.includeDescription}
                      onCheckedChange={(checked: boolean) =>
                        handleEditSection(index, "includeDescription", checked)
                      }
                    />
                    <Label>Include Description</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={section.includeDate}
                      onCheckedChange={(checked: boolean) =>
                        handleEditSection(index, "includeDate", checked)
                      }
                    />
                    <Label>Include Date</Label>
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={handleAddSection}>Add Custom Section</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={toggleFormVisibility}>
            Show Custom Sections
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
