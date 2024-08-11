import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-primary-foreground via-white/50  to-gray-500 rounded-md shadow-md flex items-center justify-center">
        <span className="text-priamry font-bold">-.-</span>
      </div>

      {showText && (
        <span
          className={cn("hidden font-bold lg:inline-block", className)}
        >
          new/cv
        </span>
      )}
    </Link>
  );
}
