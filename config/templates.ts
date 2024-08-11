// templates.ts
import ResumeTemplate from "../components/ResumeTemplate";
import MiniCard from "../components/MiniCard";

// Define your templates with categories
export const templates = {
  ElegantClassic: {
    name: "Elegant Classic",
    category: "Simple",
    layout: ResumeTemplate,
    miniCard: MiniCard,
  },
  IvyLeague: {
    name: "IvyLeague",
    category: "Simple",
    layout: ResumeTemplate,
    miniCard: MiniCard,
  },
  Polished: {
    name: "Polished",
    category: "Creative",
    layout: ResumeTemplate,
    miniCard: MiniCard,
  },
  DoubleColumn: {
    name: "DoubleColumn",
    category: "Modern",
    layout: ResumeTemplate,
    miniCard: MiniCard,
  },
};

// Convert templates to a list with category details
export const templateList = Object.entries(templates).map(
  ([key, template]) => ({
    key,
    name: template.name,
    category: template.category,
    layout: template.layout,
    miniCard: template.miniCard,
  })
);
