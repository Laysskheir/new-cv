"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
    view: "grid" | "list";
    onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8",
                    view === "grid" && "bg-background shadow-sm"
                )}
                onClick={() => onChange("grid")}
            >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8",
                    view === "list" && "bg-background shadow-sm"
                )}
                onClick={() => onChange("list")}
            >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
            </Button>
        </div>
    );
} 