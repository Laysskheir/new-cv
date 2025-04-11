// themes.ts

type Theme = {
  key: string;
  name: string;
  description: string;
  colors: string[];
};

const themes: Theme[] = [
  {
    key: "modern",
    name: "Modern Elegance",
    description: "A sleek and contemporary theme with a refined color palette.",
    colors: ["#ffffff", "#2c3e50", "#3498db"], // White, Dark Blue, Light Blue
  },
  {
    key: "classic",
    name: "Classic Professional",
    description: "Timeless black and white theme for a formal presentation.",
    colors: ["#ffffff", "#000000", "#7f8c8d"], // White, Black, Gray
  },
  {
    key: "sophisticated",
    name: "Sophisticated Charcoal",
    description: "A dark theme with subtle accents for a modern look.",
    colors: ["#34495e", "#ecf0f1", "#e74c3c"], // Charcoal, Light Gray, Red
  },
  {
    key: "creative",
    name: "Creative Spark",
    description: "Vibrant colors for a creative and dynamic presentation.",
    colors: ["#ffffff", "#e67e22", "#2980b9"], // White, Orange, Blue
  },
  {
    key: "minimalist",
    name: "Minimalist Chic",
    description: "Simple and clean design with a focus on content.",
    colors: ["#f8f9fa", "#495057", "#6c757d"], // Light Gray, Dark Gray, Medium Gray
  },
  {
    key: "academic",
    name: "Academic Excellence",
    description: "A scholarly theme with deep blue and gold accents.",
    colors: ["#ffffff", "#003366", "#d4af37"], // White, Dark Blue, Gold
  },
  {
    key: "tech",
    name: "Tech Innovator",
    description: "Modern tech-inspired theme with bold colors.",
    colors: ["#ffffff", "#007acc", "#005f99"], // White, Light Blue, Dark Blue
  },
  {
    key: "earthy",
    name: "Earthy Tones",
    description: "Natural colors for a grounded and organic feel.",
    colors: ["#d0e1d4", "#2c5f2d", "#8e735b"], // Light Green, Dark Green, Brown
  },
  {
    key: "sunset",
    name: "Sunset Glow",
    description: "Warm and inviting colors reminiscent of a sunset.",
    colors: ["#ffcc00", "#ff5733", "#c70039"], // Yellow, Orange, Red
  },
  {
    key: "oceanic",
    name: "Oceanic Calm",
    description: "Cool blues and greens for a refreshing look.",
    colors: ["#60a3d9", "#003b6f", "#1abc9c"], // Light Blue, Dark Blue, Teal
  },
];

export const defaultTheme = themes[0];

export default themes;
