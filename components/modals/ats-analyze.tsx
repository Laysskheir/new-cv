"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Signal } from "lucide-react";

export default function AtsAnalyze({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState({
    score: 0,
    suggestions: 0,
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <ol className="space-y-4">
              {[
                "Paste the job description",
                "We'll analyze the job ad",
                "Receive tailored suggestions",
              ].map((text, index) => (
                <li key={index} className="flex items-center text-base">
                  <Badge variant="secondary" className="mr-3">
                    {index + 1}
                  </Badge>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <Button onClick={() => setStep(2)} className="w-full">
              Continue
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p>Paste the job description below:</p>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here"
              rows={8}
            />
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button
                onClick={() => {
                  setAnalysisResult({
                    score: Math.floor(Math.random() * 26) + 60,
                    suggestions: Math.floor(Math.random() * 15) + 1,
                  });
                  setStep(3);
                }}
              >
                Analyze
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="text-3xl font-bold">{analysisResult.score}%</div>
            <p>Your resume match score</p>
            <p>
              We have {analysisResult.suggestions} suggestions to improve your
              resume
            </p>
            <Button className="w-full">View Suggestions</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Activity className="w-4 h-4 mr-1" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            {step === 1
              ? "Check & tailor your resume"
              : "Applying for a new job?"}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
