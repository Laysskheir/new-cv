// types/resume.ts
export interface WorkHistory {
  title: string;
  description: string[];
  employer: string;
  location: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string; current: boolean };
}

export interface Education {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: { month: string; year: string };
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export interface CustomSection {
  title: string;
  description: string;
  icon: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string; current?: boolean };
}

export interface TemplateProps {
  heading: string;
  firstName: string;
  surname: string;
  profession: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  workHistory: WorkHistory[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  skills: string[];
  summary: string;
  languages: { name: string; proficiency: string }[];
  customSections: CustomSection[];
}

export interface ResumeData {
  firstName: string;
  surname: string;
  profession: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  summary: string;
  skills: string[];
  workHistory: {
    title: string;
    employer: string;
    startDate: {
      month: string;
      year: string;
    };
    endDate: {
      month?: string;
      year?: string;
      current?: boolean;
    };
    description: string | string[];
  }[];
  education: {
    degree: string;
    schoolName: string;
    schoolLocation: string;
    graduationDate: {
      month: string;
      year: string;
    };
  }[];
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
  customSections: CustomSection[];
}
