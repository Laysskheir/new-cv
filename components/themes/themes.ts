// themes.ts

type Theme = {
  key: string;
  name: string;
  description: string;
  colors: string[];
  // Adding CSS variable mappings to each theme
  variables: {
    textPrimary: string;
    textSecondary: string;
    bgPrimary: string;
    bgSecondary: string;
    accentPrimary: string;
    accentSecondary: string;
    headingColor: string;
    sectionBorder: string;
  };
};

const themes: Theme[] = [
  {
    key: "executive",
    name: "Executive Gray",
    description: "Refined grayscale theme perfect for senior positions.",
    colors: ["#ffffff", "#333333", "#666666"],
    variables: {
      textPrimary: "#333333", // Dark gray
      textSecondary: "#666666", // Medium gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f8f8f8", // Light gray
      accentPrimary: "#333333", // Dark gray
      accentSecondary: "#666666", // Medium gray
      headingColor: "#262626", // Near black
      sectionBorder: "#e0e0e0", // Light gray
    },
  },
  {
    key: "professional",
    name: "Professional Blue",
    description:
      "Clean and professional blue theme suitable for corporate roles.",
    colors: ["#ffffff", "#14213d", "#2a6fc9"],
    variables: {
      textPrimary: "#14213d", // Dark navy
      textSecondary: "#4f5e7b", // Muted navy
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f5f7f9", // Very light blue
      accentPrimary: "#2a6fc9", // Medium blue
      accentSecondary: "#1a4b8c", // Darker blue
      headingColor: "#14213d", // Dark navy
      sectionBorder: "#e6eaf0", // Light blue-gray
    },
  },
  {
    key: "minimal",
    name: "Minimal Black",
    description:
      "A timeless black and white theme for universal professionalism.",
    colors: ["#ffffff", "#000000", "#7f7f7f"],
    variables: {
      textPrimary: "#000000", // Black
      textSecondary: "#505050", // Dark gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f9f9f9", // Off-white
      accentPrimary: "#000000", // Black
      accentSecondary: "#404040", // Dark gray
      headingColor: "#000000", // Black
      sectionBorder: "#dfdfdf", // Light gray
    },
  },
  {
    key: "corporate",
    name: "Corporate Navy",
    description:
      "Traditional navy blue theme suitable for business and finance.",
    colors: ["#ffffff", "#0a192f", "#3e5c97"],
    variables: {
      textPrimary: "#0a192f", // Dark navy
      textSecondary: "#4a5568", // Navy gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f7f9fc", // Pale blue
      accentPrimary: "#3e5c97", // Navy
      accentSecondary: "#233554", // Dark navy
      headingColor: "#0a192f", // Dark navy
      sectionBorder: "#e2e8f0", // Light blue-gray
    },
  },
  {
    key: "legal",
    name: "Legal Maroon",
    description:
      "Sophisticated maroon accents for legal and academic professions.",
    colors: ["#ffffff", "#2d2d2d", "#7b2c34"],
    variables: {
      textPrimary: "#2d2d2d", // Near black
      textSecondary: "#595959", // Dark gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f9f9f9", // Off-white
      accentPrimary: "#7b2c34", // Maroon
      accentSecondary: "#5a2027", // Dark maroon
      headingColor: "#2d2d2d", // Near black
      sectionBorder: "#e6e6e6", // Light gray
    },
  },
  {
    key: "tech",
    name: "Tech Teal",
    description: "Modern teal accents for technology and innovation sectors.",
    colors: ["#ffffff", "#2d3748", "#38b2ac"],
    variables: {
      textPrimary: "#2d3748", // Dark slate gray
      textSecondary: "#4a5568", // Slate gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f7fafc", // Very light gray
      accentPrimary: "#38b2ac", // Teal
      accentSecondary: "#2c8a85", // Dark teal
      headingColor: "#2d3748", // Dark slate gray
      sectionBorder: "#e2e8f0", // Light gray
    },
  },
  {
    key: "medical",
    name: "Medical Green",
    description: "Professional green theme for healthcare and medical fields.",
    colors: ["#ffffff", "#1a3b34", "#38a169"],
    variables: {
      textPrimary: "#1a3b34", // Dark green
      textSecondary: "#476761", // Muted green
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f5f9f7", // Very light green
      accentPrimary: "#38a169", // Medium green
      accentSecondary: "#2f855a", // Darker green
      headingColor: "#1a3b34", // Dark green
      sectionBorder: "#e6f0eb", // Light green
    },
  },
  {
    key: "creative",
    name: "Creative Blue",
    description: "Subtle blue accents for creative professionals.",
    colors: ["#ffffff", "#2a4365", "#4299e1"],
    variables: {
      textPrimary: "#2a4365", // Dark blue
      textSecondary: "#4a5568", // Gray blue
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f7fafc", // Light blue-gray
      accentPrimary: "#4299e1", // Medium blue
      accentSecondary: "#3182ce", // Darker blue
      headingColor: "#2a4365", // Dark blue
      sectionBorder: "#e2e8f0", // Light blue-gray
    },
  },
  {
    key: "academic",
    name: "Academic Burgundy",
    description:
      "Traditional burgundy theme for academic and research positions.",
    colors: ["#ffffff", "#1a202c", "#9b2c2c"],
    variables: {
      textPrimary: "#1a202c", // Dark gray
      textSecondary: "#4a5568", // Medium gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f8f9fa", // Light gray
      accentPrimary: "#9b2c2c", // Burgundy
      accentSecondary: "#742121", // Dark burgundy
      headingColor: "#1a202c", // Dark gray
      sectionBorder: "#e2e8f0", // Light gray
    },
  },
  {
    key: "consultancy",
    name: "Consultancy Purple",
    description:
      "Professional purple accents for consulting and advisory roles.",
    colors: ["#ffffff", "#322659", "#805ad5"],
    variables: {
      textPrimary: "#322659", // Dark purple
      textSecondary: "#4a5568", // Dark gray
      bgPrimary: "#ffffff", // White
      bgSecondary: "#f7fafc", // Very light gray
      accentPrimary: "#805ad5", // Medium purple
      accentSecondary: "#6b46c1", // Darker purple
      headingColor: "#322659", // Dark purple
      sectionBorder: "#e9e3f5", // Light purple
    },
  },
];

export const defaultTheme = themes[0];

export default themes;
