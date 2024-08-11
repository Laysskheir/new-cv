// themes.ts

type Theme = {
  key: string;
  name: string;
  description: string;
  colors: string[];
};

const themes: Theme[] = [
  {
    key: "default",
    name: "Default",
    description: "Standard theme",
    colors: ["#f0f0f0", "#333333"],
  },
  {
    key: "windows98",
    name: "Windows 98",
    description: "Retro computing style",
    colors: ["#c0c0c0", "#000080"],
  },
  {
    key: "daylight",
    name: "Daylight",
    description: "Bright and warm tones",
    colors: ["#f0e0b0", "#8b4513"],
  },

  {
    key: "forest",
    name: "Forest",
    description: "Natural and earthy tones",
    colors: ["#d0e1d4", "#2c5f2d"],
  },
  {
    key: "ocean",
    name: "Ocean",
    description: "Calming blue hues",
    colors: ["#60a3d9", "#003b6f"],
  },
  {
    key: "sunset",
    name: "Sunset",
    description: "Warm and vibrant colors",
    colors: ["#ffa200", "#ff7b00"],
  },
];

export const defaultTheme = themes[0];

export default themes;
