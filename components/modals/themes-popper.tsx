import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Icons } from "../icons";

import { useTheme } from "../themes/use-theme";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import themes, { defaultTheme } from "../themes/themes";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemePopper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme || defaultTheme.key);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize theme if not already set
  useEffect(() => {
    if (!theme) {
      setTheme(defaultTheme.key);
    }
    // We don't need to manage body classes here anymore - ThemeWrapper handles it
  }, [theme, setTheme]);

  // Update the selected theme
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    // We don't need to manage body classes here anymore - ThemeWrapper handles it
  };

  // Get the current theme object
  const currentThemeObj = themes.find(t => t.key === selectedTheme) || defaultTheme;

  return (
    <Popover onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className="flex items-center gap-1">
            {currentThemeObj.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>
          {children}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Explore Themes</h4>
            <p className="text-sm text-muted-foreground">
              Choose a theme for your resume to give it a unique style.
            </p>
          </div>
          <div className="overflow-y-auto max-h-[60vh] pr-1 hide_scrollbar">
            <RadioGroup
              value={selectedTheme}
              onValueChange={handleThemeChange}
              className="grid grid-cols-2 gap-3"
            >
              {themes.map((theme) => (
                <div key={theme.key} className="relative">
                  <RadioGroupItem
                    value={theme.key}
                    id={theme.key}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={theme.key}
                    className={cn(
                      "relative flex flex-col justify-between h-full p-4 cursor-pointer rounded-md border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
                      selectedTheme === theme.key ? "border-primary ring-2 ring-primary/20" : "border-border"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">{theme.name}</span>
                        {selectedTheme === theme.key && (
                          <div className="rounded-full bg-primary w-5 h-5 flex items-center justify-center text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {theme.description}
                      </span>
                    </div>

                    {/* Preview background in theme colors */}
                    <div
                      className="mt-3 rounded-md overflow-hidden h-20 border"
                      style={{ background: theme.variables.bgPrimary }}
                    >
                      {/* Header bar */}
                      <div
                        className="h-5 w-full"
                        style={{ background: theme.variables.accentPrimary }}
                      />

                      {/* Content preview */}
                      <div className="p-2">
                        <div
                          className="w-24 h-2.5 rounded-sm mb-2"
                          style={{ background: theme.variables.headingColor }}
                        />
                        <div className="flex space-x-1">
                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              className="w-8 h-1.5 rounded-sm"
                              style={{ background: theme.variables.textSecondary }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Color Palette Preview */}
                    <div className="flex mt-2 gap-1">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          style={{ backgroundColor: color }}
                          className="w-5 h-5 rounded-full"
                          title={color}
                        />
                      ))}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
