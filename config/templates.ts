// templates.ts
import ResumeTemplate from "../components/ResumeTemplate";
import MiniCard from "../components/MiniCard";
import Premium from "../components/design/Premium";

interface TemplateConfig {
  name: string;
  description: string;
  category: string;
  layout: React.FC<any>;
  miniCard: React.FC<any>;
  layoutType: string;
  style: string;
  features: string[];
}

// Define your templates with categories
export const templates: Record<string, TemplateConfig> = {
  Premium: {
    name: "Premium",
    description:
      "A sophisticated, modern template with comprehensive sections and elegant styling",
    category: "Premium",
    layout: Premium,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "premium",
    features: [
      "with-photo",
      "skills-section",
      "projects-section",
      "achievements-section",
      "languages-section",
      "custom-sections",
    ],
  },
  Minimal: {
    name: "Minimal",
    description:
      "A clean, minimalist design with numbered sections and perfect typography",
    category: "Simple",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "minimal",
    features: [
      "without-photo",
      "numbered-sections",
      "skills-section",
      "projects-section",
    ],
  },
  ElegantClassic: {
    name: "Elegant Classic",
    description: "A clean, professional template with a traditional layout",
    category: "Simple",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "classic",
    features: ["without-photo", "skills-section"],
  },
  IvyLeague: {
    name: "Ivy League",
    description:
      "A sophisticated template with a focus on education and achievements",
    category: "Simple",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "classic",
    features: ["with-photo", "skills-section", "projects-section"],
  },
  Polished: {
    name: "Polished",
    description:
      "A refined template with balanced sections and elegant typography",
    category: "Creative",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "2-column",
    style: "creative",
    features: ["with-photo", "skills-section"],
  },
  DoubleColumn: {
    name: "Double Column",
    description: "A modern two-column layout with clear section separation",
    category: "Modern",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "2-column",
    style: "modern",
    features: ["without-photo", "skills-section", "projects-section"],
  },
  Stylish: {
    name: "Stylish",
    description:
      "A contemporary design with visual flair and modern aesthetics",
    category: "Modern",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "modern",
    features: ["with-photo", "skills-section"],
  },
  Modern: {
    name: "Modern",
    description: "A sleek, minimalist template with a focus on readability",
    category: "Modern",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "1-column",
    style: "minimal",
    features: ["without-photo", "skills-section"],
  },
  Professional: {
    name: "Professional",
    description:
      "A polished template with accent elements and professional styling",
    category: "Modern",
    layout: ResumeTemplate,
    miniCard: MiniCard,
    layoutType: "2-column",
    style: "modern",
    features: ["with-photo", "skills-section", "projects-section"],
  },
};

// Convert templates to a list with category details
export const templateList = Object.entries(templates).map(
  ([key, template]) => ({
    key,
    name: template.name,
    description: template.description,
    category: template.category,
    layout: template.layout,
    miniCard: template.miniCard,
    layoutType: template.layoutType,
    style: template.style,
    features: template.features,
  })
);
