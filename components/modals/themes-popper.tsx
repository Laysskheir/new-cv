import React, { useState } from "react";
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
import themes from "../themes/themes";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemePopper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [isOpen, setIsOpen] = useState(false);

  // Update the selected theme
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  return (
    <Popover onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.color className="w-5 h-5 mr-1" />
          {children}
          <ChevronDown
            className={cn(
              "w-4 h-4 ml-1 transition-transform duration-200",
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
              Find themes and apply them to your resume.
            </p>
          </div>
          <div className="overflow-y-auto h-[40vh] hide_scrollbar">
            <RadioGroup
              defaultValue={selectedTheme}
              onValueChange={handleThemeChange}
              className="grid grid-cols-2 "
            >
              {themes.map((theme) => (
                <div key={theme.key} className="p-2">
                  <RadioGroupItem
                    value={theme.key}
                    id={theme.key}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={theme.key}
                    className={`relative p-4 cursor-pointer flex flex-col justify-between rounded-md border-2 transition-transform hover:scale-105 duration-300 ease-in-out peer-data-[state=checked]:border-primary`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{theme.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {theme.description}
                      </span>
                    </div>
                    {/* Color Palette Preview */}
                    <div className="flex mt-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          style={{ backgroundColor: color }}
                          className="w-5 h-5 rounded-full mr-1"
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
