"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Activity, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useAtom } from "jotai"
import { resumeStateAtom } from "@/state/resumeAtoms"

export default function EnhancedATSCheck({ children }: { children: React.ReactNode; }) {

  const [resumeState, setResumeState] = useAtom(resumeStateAtom);

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [jobDescription, setJobDescription] = useState("")
  const [analysisResult, setAnalysisResult] = useState({
    score: 0,
    keyFeatures: [
      { name: "Skills Match", score: 0 },
      { name: "Experience Alignment", score: 0 },
      { name: "Education Fit", score: 0 },
      { name: "Keyword Usage", score: 0 },
    ],
  })

  const introSteps = [
    "We analyze your resume against the job description",
    "Our AI identifies key requirements and qualifications",
    "You receive a match score and tailored suggestions",
  ]

  const handleAnalyze = () => {
    // Extract relevant data from resumeState
    const { skills, workHistory, education } = resumeState;

    // Simulate analysis logic
    const overallScore = calculateMatchScore(jobDescription, skills, workHistory, education);
    const keyFeatures = analysisResult.keyFeatures.map(feature => ({
      ...feature,
      score: Math.floor(Math.random() * 101) // Replace with actual scoring logic
    }));

    setAnalysisResult({ score: overallScore, keyFeatures });
    setStep(3);
  }

  // Function to calculate match score based on job description and resume data
  const calculateMatchScore = (jobDescription: string, skills: string[], workHistory: any[], education: any[]) => {
    let score = 0;

    // Example scoring logic
    if (jobDescription.includes("Senior Developer")) {
      score += 20; // Add points for matching job title
    }
    // Add more logic to analyze skills, work history, and education...

    return Math.min(score, 100); // Ensure score does not exceed 100
  }

  const resetDialog = () => {
    setStep(1)
    setJobDescription("")
    setAnalysisResult({
      score: 0,
      keyFeatures: analysisResult.keyFeatures.map(feature => ({ ...feature, score: 0 }))
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <ol className="space-y-4">
              {introSteps.map((text, index) => (
                <li key={index} className="flex items-start text-base">
                  <Badge variant="secondary" className="mr-3 mt-1">
                    {index + 1}
                  </Badge>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <Button onClick={() => setStep(2)} className="w-full">
              Get Started
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Paste the job description below:</p>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              rows={8}
              className="resize-none"
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleAnalyze} disabled={!jobDescription.trim()}>
                Analyze Resume
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{analysisResult.score}%</div>
              <p className="text-xl font-semibold mb-4">Resume Match Score</p>
            </div>
            <div className="space-y-4">
              {analysisResult.keyFeatures.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{feature.name}</span>
                    <span className="font-semibold">{feature.score}%</span>
                  </div>
                  <Progress value={feature.score} className="h-2" />
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={() => setOpen(false)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              View Detailed Report
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) resetDialog()
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Activity className="w-4 h-4 mr-2" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            {step === 1 ? "ATS Resume Check" : step === 2 ? "Enter Job Description" : "Analysis Results"}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}