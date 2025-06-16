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
import { TemplateProps } from "@/types/resume";
import { resumeStateAtom } from "@/state/resumeAtoms";

export function HeadingForm() {
  const [resumeState, setResumeState] = useAtom(resumeStateAtom);

  const handleInputChange = (field: keyof TemplateProps, value: string) => {
    setResumeState({
      ...resumeState,
      [field]: value,
    });
  };

  return (
    <div id="heading" className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-4 items-center text-lg font-semibold">
            Personal Information
          </CardTitle>
          <CardDescription>
            We suggest including an email and phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {/* First Name and Surname */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={resumeState.firstName ?? ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  value={resumeState.surname ?? ""}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  placeholder="Surname"
                />
              </div>
            </div>

            {/* Profession */}
            <Input
              type="text"
              value={resumeState.profession ?? ""}
              onChange={(e) => handleInputChange("profession", e.target.value)}
              placeholder="Profession"
            />

            {/* City/Municipality and Country */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={resumeState.city ?? ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City/Municipality"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  value={resumeState.country ?? ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Country"
                />
              </div>
            </div>

            {/* Postal Code */}
            <Input
              type="text"
              value={resumeState.postalCode ?? ""}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="Postal Code"
            />

            {/* Phone and Email */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="tel"
                  value={resumeState.phone ?? ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Phone"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="email"
                  value={resumeState.email ?? ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
