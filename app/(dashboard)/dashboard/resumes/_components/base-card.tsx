import { cn } from "@/lib/utils";
import React from "react";

interface BaseResumeCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function BaseResumeCard({
  children,
  className,
  onClick,
  disabled = false
}: BaseResumeCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-48 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-colors",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
}
