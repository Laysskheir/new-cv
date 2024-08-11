"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import * as React from "react";

export default function Appearance() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
        <button type="button" onClick={() => setTheme("light")}>
          <LightModeCard active={theme === "light"} />
          <span className="mt-2  text-muted-foreground text-sm">
            Light
          </span>
        </button>
        <button type="button" disabled className="cursor-not-allowed opacity-50">
          <div className="relative">
            <DarkModeCard active={false} />
            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded">
              Soon
            </span>
          </div>
          <span className="mt-2  text-muted-foreground text-sm">
            Dark
          </span>
        </button>
        <button type="button" disabled className="cursor-not-allowed opacity-50">
          <div className="relative">
            <LightModeCard active={false} />
            <div
              className="absolute top-0 right-0 bottom-0 left-0"
              style={{
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              }}
            >
              <DarkModeCard active={false} />
            </div>
            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded">
              Soon
            </span>
          </div>
          <span className="mt-2  text-muted-foreground text-sm">
            System
          </span>
        </button>
      </div>
    </div>
  );
}

function LightModeCard({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "items-center rounded-md border-2 border-muted p-1",
        active && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      <div className=" rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-white " />
          <div className="h-2 w-[100px] rounded-lg bg-white " />
        </div>
        <div className="flex items-center space-x-2 rounded-md  p-2 shadow-sm">
          <div className="h-3 w-4 rounded-full bg-white " />
          <div className="h-2 w-[100px] rounded-lg bg-white " />
        </div>
        <div className="flex items-center space-x-2 rounded-md  p-2 shadow-sm">
          <div className="h-3 w-4 rounded-full bg-white " />
          <div className="h-2 w-[100px] rounded-lg bg-white " />
        </div>
      </div>
    </div>
  );
}

function DarkModeCard({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "items-center rounded-md border-2 border-muted bg-popover p-1",
        active && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      <div className=" rounded-sm bg-black p-2">
        <div className="space-y-2 rounded-md bg-neutral-950 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-muted-foreground" />
          <div className="h-2 w-[100px] rounded-lg bg-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-950 p-2 shadow-sm">
          <div className="h-3 w-4 rounded-full bg-muted-foreground" />
          <div className="h-2 w-[100px] rounded-lg bg-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-950 p-2 shadow-sm">
          <div className="h-3 w-4 rounded-full bg-muted-foreground" />
          <div className="h-2 w-[100px] rounded-lg bg-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
