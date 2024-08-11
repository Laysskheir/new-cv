import { ResumeData } from "@/types/resume";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeName(theme: string) {
  return theme.toLowerCase().replace(" ", "-");
}

const isBrowser = typeof window !== 'undefined';

