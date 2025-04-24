export type SiteConfig = typeof siteConfig;

const links = {
  x: "https://twitter.com/laysskheir",
  instagram: "https://instagram.com/laysskheir",
  facebook: "https://facebook.com/laysskheir",
  github: "https://github.com/laysskheir",
  linkedin: "https://linkedin.com/in/laysskheir",
};

export const siteConfig = {
  name: "new/cv",
  author: "Laysskheir",
  description: "Create professional resumes effortlessly with our intuitive website builder.",
  url: "https://new-cv-builder.vercel.app",
  links,
  logo: {
    light: "/logo-light.png",
    dark: "/logo-dark.png",
    alt: "new/cv Logo",
    width: 120,
    height: 40,
  },
  ogImage: "/og-image.png",
  ogImageAlt: "new/cv - Professional Resume Builder",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  locale: "en_US",
  keywords: ["resume", "CV", "new/cv", "professional", "career", "resume builder", "CV creator"],
  social: {
    twitter: "@laysskheir",
    github: "Laysskheir",
  },
};
