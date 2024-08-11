// src/state/resumeAtoms.ts
import { TemplateProps } from "@/types/resume";
import { atomWithStorage } from "jotai/utils";

export const pageMarginsAtom = atomWithStorage("pageMargins", 2);
export const sectionSpacingAtom = atomWithStorage("sectionSpacing", 2);
export const fontSizeAtom = atomWithStorage("fontSize", 16);
export const fontFamilyAtom = atomWithStorage("fontFamily", "Arial");

export const formVisibilityAtom = atomWithStorage("formVisibility", {
  skills: false,
  education: false,
  workHistory: false,
  projects: false,
  summary: false,
  personalDetails: false,
  languages: false,
  customSections: false,
});

// Atom for the resume state including personal details, work history, and education...
export const resumeStateAtom = atomWithStorage<TemplateProps>("resumeState", {
  heading: "Welcome to My Resume",
  firstName: "John",
  surname: "Doe",
  profession: "Software Engineer",
  city: "San Francisco",
  country: "USA",
  postalCode: "94103",
  phone: "+1 555 123 4567",
  email: "john.doe@example.com",
  workHistory: [
    {
      title: "Senior Developer",
      description: [
        "Designed and developed complex web applications using React, Node.js, and MongoDB",
        "Implemented robust testing frameworks and CI/CD pipelines to ensure high-quality and reliable software",
        "Mentored junior developers and contributed to team-wide technical decisions",
      ],
      employer: "Tech Corp",
      location: "Remote",
      startDate: { month: "January", year: "2020" },
      endDate: { month: "June", year: "2023", current: false },
    },
  ],
  projects: [
    {
      name: "Personal Portfolio Website",
      description:
        "Designed and developed a responsive portfolio website to showcase my projects and skills.",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      link: "https://johndoe-portfolio.com",
    },
  ],
  education: [
    {
      schoolName: "University of Technology",
      schoolLocation: "New York, NY",
      degree: "Bachelor of Science in Computer Science",
      fieldOfStudy: "Computer Science",
      graduationDate: { month: "May", year: "2019" },
    },
  ],
  achievements: [
    {
      title: "Best Employee of the Year",
      description:
        "Recognized for outstanding performance and contributions to the team.",
      date: "December 2022",
    },
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "French", proficiency: "Intermediate" },
  ],
  customSections: [
    {
      title: "Custom Section 1",
      description: "Description for custom section 1",
      icon: "Choose icon",
      startDate: { month: "July", year: "2019" },
      endDate: { month: "", year: "", current: true },
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "CSS"],
  summary:
    "Passionate developer with over 5 years of experience in building web applications.",
});

// Atom for the selected resume template
export const resumeTemplateAtom = atomWithStorage<string>(
  "resumeTemplate",
  "ElegantClassic"
);

// Atom for managing the selected theme
export const themeAtom = atomWithStorage<string>("theme", "light");

// Atom for managing the list of skills
export const skillsAtom = atomWithStorage<string[]>("skills", [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
]);

// Atom for managing the summary text
export const summaryAtom = atomWithStorage(
  "summary",
  "Passionate developer with over 5 years of experience in building web applications."
);

// Atom for managing the share ID
export const shareIdAtom = atomWithStorage<string | null>("shareId", null);

// Add this new atom for the download format
export const downloadFormatAtom = atomWithStorage<"pdf" | "docx" | "txt">(
  "downloadFormat",
  "pdf"
);
