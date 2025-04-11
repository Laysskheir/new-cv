"use client";

import React from "react";
import { useAtom } from "jotai";
import { resumeStateAtom, formVisibilityAtom } from "@/state/resumeAtoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";
import { Icons } from "../icons";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "lucide-react";
import { useTheme } from "next-themes";
import { Textarea } from "../ui/textarea";
import { DatePickerWithRange } from "../DatePickerWithRange";
import { format } from "date-fns";
import { TemplateProps } from "@/types/resume";

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

function EmojiPickerPopper({
  children,
  onEmojiClick,
}: {
  children: React.ReactNode;
  onEmojiClick: (emojiObject: any) => void;
}) {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{children}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          theme={theme === "dark" ? "dark" : "light"}
          searchDisabled
          previewConfig={{ showPreview: false }}
          width={300}
          height={300}
        />
      </PopoverContent>
    </Popover>
  );
}

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

const CustomSection = ({
  resumeState,
  setResumeState,
  formVisibility,
  setFormVisibility,
}: TypesProps) => {
  const [open, setOpen] = React.useState(false);
  const [includeTitle, setIncludeTitle] = React.useState(true);
  const [includeDescription, setIncludeDescription] = React.useState(true);
  const [includeDate, setIncludeDate] = React.useState(true);
  const [includeIcon, setIncludeIcon] = React.useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleAddSection = () => {
    const newSection: CustomSection = {
      title: "SECTION TITLE",
      description: "Description",
      icon: "💎",
      startDate: { month: "January", year: "2020" },
      endDate: { month: "", year: "", current: true },
      includeTitle: includeTitle,
      includeDescription: includeDescription,
      includeDate: includeDate,
      includeIcon: includeIcon,
    };
    const updatedSections = [...resumeState.customSections, newSection];
    setResumeState((prevState) => ({
      ...prevState,
      customSections: updatedSections,
    }));
    setOpen(false);
  };

  const handleEditSection = (index: number, field: string, value: any) => {
    const updatedSections = [...resumeState.customSections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setResumeState((prevState) => ({
      ...prevState,
      customSections: updatedSections,
    }));
  };

  const handleEmojiClick = (index: number, emojiObject: any) => {
    handleEditSection(index, "icon", emojiObject.emoji);
    setShowEmojiPicker({
      ...showEmojiPicker,
      [index]: false,
    });
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev) => ({
      ...prev,
      customSections: !prev.customSections,
    }));
  };

  if (!formVisibility.customSections) {
    return (
      <Card id="custom" className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">Custom Sections</div>
            <Button
              onClick={toggleFormVisibility}
              size="sm"
              variant="link"
              className="ml-2"
            >
              <Icons.eyeoff className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">Custom Sections</div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            <Icons.eye className="w-5 h-5" />
          </Button>
        </CardTitle>
        <CardDescription>
          Add and manage custom sections for your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Section</DialogTitle>
              <DialogDescription>
                Configure the elements for your new custom section
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-4">
                <Label className="text-lg">Section Elements:</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Checkbox
                    id="includeTitle"
                    checked={includeTitle}
                    onCheckedChange={() => setIncludeTitle(!includeTitle)}
                  />
                  <Label htmlFor="includeTitle">Title</Label>
                  <Checkbox
                    id="includeDescription"
                    checked={includeDescription}
                    onCheckedChange={() =>
                      setIncludeDescription(!includeDescription)
                    }
                  />
                  <Label htmlFor="includeDescription">Description</Label>
                  <Checkbox
                    id="includeDate"
                    checked={includeDate}
                    onCheckedChange={() => setIncludeDate(!includeDate)}
                  />
                  <Label htmlFor="includeDate">Date</Label>
                  <Checkbox
                    id="includeIcon"
                    checked={includeIcon}
                    onCheckedChange={() => setIncludeIcon(!includeIcon)}
                  />
                  <Label htmlFor="includeIcon">Icon</Label>
                </div>
              </div>
              <div className="border p-4 rounded-md">
                <h4 className="font-bold mb-2">Preview</h4>
                <div className="flex items-center space-x-2">
                  {includeIcon && <Icons.diamond className="w-4 h-4" />}
                  {includeTitle && (
                    <span className="font-semibold">Sample Title</span>
                  )}
                  {includeDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Sample Date</span>
                    </div>
                  )}
                </div>
                {includeDescription && (
                  <p className="text-sm mt-1">Sample Description</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddSection}>Create Section</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="space-y-6 mt-6">
          {resumeState.customSections.map((section, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
                <Input
                  value={section.title}
                  onChange={(e) =>
                    handleEditSection(index, "title", e.target.value)
                  }
                  className="font-bold text-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newSections = resumeState.customSections.filter(
                      (_, i) => i !== index
                    );
                    setResumeState((prevState) => ({
                      ...prevState,
                      customSections: newSections,
                    }));
                  }}
                >
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center space-x-4">
                    {includeIcon && (
                      <EmojiPickerPopper
                        onEmojiClick={(emojiObject) =>
                          handleEmojiClick(index, emojiObject)
                        }
                      >
                        <span className="text-sm">{section.icon || "🔍"}</span>
                      </EmojiPickerPopper>
                    )}
                    {includeDate && (
                      <DatePickerWithRange
                        className="w-full"
                        onChange={(range) => {
                          handleEditSection(index, "startDate", {
                            month: format(range.from, "MMM"),
                            year: format(range.from, "yyyy"),
                          });
                          handleEditSection(index, "endDate", {
                            month: range.to ? format(range.to, "MMM") : "",
                            year: range.to ? format(range.to, "yyyy") : "",
                            current: !range.to,
                          });
                        }}
                      />
                    )}
                  </div>
                  {includeDescription && (
                    <Textarea
                      value={section.description}
                      onChange={(e) =>
                        handleEditSection(index, "description", e.target.value)
                      }
                      className="w-full"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end ">
        <Button size="sm" onClick={() => setOpen(true)}>
          Add New Section
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomSection;
