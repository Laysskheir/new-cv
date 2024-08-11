"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTheme } from "../themes/use-theme";
import themes from "../themes/themes";

export function CommandMenuThemes({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState(theme);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    document.body.className = `theme-${selectedTheme}`;
  }, [selectedTheme]);

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Theme">
            {themes.map((theme) => (
              <CommandItem
                defaultValue={selectedTheme}
                onSelect={handleThemeChange}
                key={theme.key}
              >
                {theme.name}
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
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
