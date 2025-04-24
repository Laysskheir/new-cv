//state/resumeAtoms.ts
import { TemplateProps, FormVisibility } from "@/types/resume";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const pageMarginsAtom = atomWithStorage("pageMargins", 2);
export const sectionSpacingAtom = atomWithStorage("sectionSpacing", 2);
export const fontSizeAtom = atomWithStorage("fontSize", 16);
export const fontFamilyAtom = atomWithStorage("fontFamily", "Arial");

export const formVisibilityAtom = atomWithStorage<FormVisibility>(
  "formVisibility",
  {
    skills: true,
    education: true,
    workHistory: true,
    projects: true,
    summary: true,
    personalDetails: true,
    languages: true,
    customSections: true,
  }
);

const defaultResumeData: TemplateProps = {
  heading: "Professional Resume",
  firstName: "John",
  surname: "Doe",
  profession: "Senior Software Engineer",
  city: "San Francisco",
  country: "USA",
  postalCode: "94105",
  phone: "+1 (555) 123-4567",
  email: "john.doe@example.com",
  workHistory: [
    {
      title: "Senior Software Engineer",
      employer: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: { month: "Jan", year: "2020" },
      endDate: { month: "", year: "", current: true },
      description: [
        "Led development of cloud-based applications using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Mentored junior developers and conducted code reviews",
        "Architected microservices architecture for improved scalability",
      ],
    },
    {
      title: "Software Engineer",
      employer: "Digital Solutions Ltd.",
      location: "New York, NY",
      startDate: { month: "Jun", year: "2017" },
      endDate: { month: "Dec", year: "2019", current: false },
      description: [
        "Developed and maintained frontend applications using React and TypeScript",
        "Collaborated with UX designers to implement responsive interfaces",
        "Optimized application performance resulting in 30% faster load times",
        "Participated in agile development processes and sprint planning",
      ],
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      link: "https://github.com/johndoe/ecommerce",
    },
    {
      name: "Task Management App",
      description:
        "Created a collaborative task management application with real-time updates",
      technologies: ["React", "Firebase", "Material UI", "TypeScript"],
      link: "https://github.com/johndoe/taskmanager",
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      schoolName: "Stanford University",
      schoolLocation: "Stanford, CA",
      fieldOfStudy: "Computer Science",
      graduationDate: { month: "May", year: "2015" },
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      schoolName: "MIT",
      schoolLocation: "Cambridge, MA",
      fieldOfStudy: "Software Engineering",
      graduationDate: { month: "May", year: "2013" },
    },
  ],
  achievements: [
    {
      title: "Best Innovation Award",
      date: "2021",
      description:
        "Received award for developing an innovative solution to reduce server costs by 60%",
    },
    {
      title: "Conference Speaker",
      date: "2020",
      description:
        "Presented at React Summit on 'Building Scalable React Applications'",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "Docker",
    "AWS",
    "CI/CD",
    "Git",
    "RESTful APIs",
    "GraphQL",
    "Redux",
    "Next.js",
    "HTML/CSS",
    "Sass",
    "Jest",
    "Agile/Scrum",
  ],
  summary:
    "Experienced software engineer with a strong background in full-stack development. Passionate about creating efficient, scalable applications and mentoring junior developers. Skilled in modern web technologies with a focus on React and Node.js ecosystems. Proven track record of delivering high-quality solutions that meet business needs.",
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Fluent" },
    { name: "French", proficiency: "Intermediate" },
  ],
  customSections: [],
};

// Add a new atom to track if data is loaded from DB
export const isDataLoadedAtom = atom(false);

// Create the storage atom outside the getter
const storageAtom = atomWithStorage<TemplateProps>(
  "resumeState",
  defaultResumeData
);

// Modify the resumeStateAtom to work with both local storage and DB
export const resumeStateAtom = atom(
  (get) => {
    const localData = get(storageAtom);
    const isLoaded = get(isDataLoadedAtom);

    // If data is loaded from DB, use that instead of local storage
    if (isLoaded) {
      return {
        ...defaultResumeData,
        ...localData,
        workHistory: localData.workHistory || defaultResumeData.workHistory,
        projects: localData.projects || defaultResumeData.projects,
        education: localData.education || defaultResumeData.education,
        achievements: localData.achievements || defaultResumeData.achievements,
        skills: localData.skills || defaultResumeData.skills,
        languages: localData.languages || defaultResumeData.languages,
        customSections: localData.customSections || defaultResumeData.customSections,
      };
    }
    return defaultResumeData;
  },
  (get, set, newValue: TemplateProps) => {
    // Update both local storage and the atom
    set(storageAtom, newValue);
    set(isDataLoadedAtom, true);
  }
);

export const resumeTemplateAtom = atomWithStorage<string>(
  "resumeTemplate",
  "ElegantClassic"
);

export const themeAtom = atomWithStorage<string>("theme", "light");

export const skillsAtom = atomWithStorage<string[]>("skills", [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
]);

export const summaryAtom = atomWithStorage(
  "summary",
  "Passionate developer with over 5 years of experience in building web applications."
);

export const shareIdAtom = atomWithStorage<string | null>("shareId", null);
