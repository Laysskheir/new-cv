"use client";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin w-6 h-6" />
        <p className="text-lg font-medium text-foreground">Loading...</p>
      </div>
    </div>
  );
}
