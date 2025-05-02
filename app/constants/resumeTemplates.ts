export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium?: boolean;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "Dynamic",
    name: "Customizable Layout",
    description: "A fully customizable layout that you can arrange as you like",
    thumbnail: "/templates/dynamic-template.png",
  },
  {
    id: "DoubleColumn",
    name: "Double Column",
    description:
      "A clean two-column layout with a sidebar for skills and education",
    thumbnail: "/templates/double-column.png",
  },
  {
    id: "IvyLeague",
    name: "Ivy League",
    description:
      "An elegant, professional layout inspired by Ivy League resumes",
    thumbnail: "/templates/ivy-league.png",
  },
  {
    id: "ElegantClassic",
    name: "Elegant Classic",
    description: "A timeless, clean design with modern typography",
    thumbnail: "/templates/elegant-classic.png",
  },
  {
    id: "Polished",
    name: "Polished",
    description: "A streamlined design that emphasizes readability",
    thumbnail: "/templates/polished.png",
  },
  {
    id: "Modern",
    name: "Modern",
    description: "A contemporary design with a distinctive sidebar",
    thumbnail: "/templates/modern.png",
    isPremium: true,
  },
  {
    id: "Professional",
    name: "Professional",
    description: "A structured, corporate-friendly layout",
    thumbnail: "/templates/professional.png",
    isPremium: true,
  },
  {
    id: "Minimal",
    name: "Minimal",
    description: "A clean, uncluttered design that lets your content shine",
    thumbnail: "/templates/minimal.png",
    isPremium: true,
  },
  {
    id: "Premium",
    name: "Premium",
    description: "An upscale design for senior professionals and executives",
    thumbnail: "/templates/premium.png",
    isPremium: true,
  },
];
