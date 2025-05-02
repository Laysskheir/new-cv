"use client";

import { useTheme } from "@/components/themes/use-theme";
import { cn } from "@/lib/utils";
import { defaultTheme } from "./themes";
import React from "react";

export function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme] = useTheme();
  // Use defaultTheme.key if theme is undefined or empty
  const themeClass = theme ? `theme-${theme}` : `theme-${defaultTheme.key}`;

  // Force add the theme class to all possible elements
  React.useEffect(() => {
    // Apply to document root elements
    const elements = [
      document.documentElement,
      document.body,
      document.querySelector('[data-theme-root="true"]')
    ];

    // Apply theme class to all elements
    elements.forEach(el => {
      if (el) {
        // Remove all theme classes
        el.classList.forEach(cls => {
          if (cls.startsWith('theme-')) {
            el.classList.remove(cls);
          }
        });
        // Add the current theme class
        el.classList.add(themeClass);
      }
    });
  }, [themeClass]);

  // Also apply the class to this component's wrapper div
  return <div className={cn(themeClass)}>{children}</div>;
}
