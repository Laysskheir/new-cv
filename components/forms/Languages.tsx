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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

const Languages: React.FC = () => {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);
  const [formVisibility, setFormVisibility] = useAtom(formVisibilityAtom);

  const handleAddLanguage = () => {
    setResumeState((prevState) => ({
      ...prevState,
      languages: [
        ...(prevState.languages || []),
        { name: "", proficiency: "" },
      ],
    }));
  };

  const handleLanguageChange = (
    index: number,
    field: "name" | "proficiency",
    value: string
  ) => {
    setResumeState((prevState) => ({
      ...prevState,
      languages:
        prevState.languages?.map((lang, i) =>
          i === index ? { ...lang, [field]: value } : lang
        ) || [],
    }));
  };

  const deleteLanguage = (index: number) => {
    setResumeState((prevState) => ({
      ...prevState,
      languages: prevState.languages?.filter((_, i) => i !== index) || [],
    }));
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prev) => ({ ...prev, languages: !prev.languages }));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center">What languages do you speak?</div>
          <Button
            onClick={toggleFormVisibility}
            size="sm"
            variant="link"
            className="ml-2"
          >
            {formVisibility.languages ? (
              <Icons.eye className="w-5 h-5" />
            ) : (
              <Icons.eyeoff className="w-5 h-5" />
            )}
          </Button>
        </CardTitle>
        {formVisibility.languages && (
          <CardDescription>
            List the languages you speak and your proficiency level.
          </CardDescription>
        )}
      </CardHeader>
      {formVisibility.languages && (
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {resumeState.languages?.map((language, index) => (
              <div key={index} className="relative">
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute  left-2 top-1/2 size-8 -translate-y-1/2"
                >
                  <Icons.globe className="w-4 h-4" />
                </Button>
                <Input
                  type="text"
                  value={language.name}
                  onChange={(e) =>
                    handleLanguageChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 mt-1 pl-10 pr-10 border rounded"
                  placeholder="Enter a language"
                />
                <Input
                  type="text"
                  value={language.proficiency}
                  onChange={(e) =>
                    handleLanguageChange(index, "proficiency", e.target.value)
                  }
                  className="w-full p-2 mt-2 pl-10 pr-10 border rounded"
                  placeholder="Enter proficiency"
                />
                <Button
                  onClick={() => deleteLanguage(index)}
                  size="icon"
                  variant="outline"
                  className="size-8 absolute mt-1 right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-end w-full col-span-2">
              <Button onClick={handleAddLanguage} size="sm">
                Add Language
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Languages;
