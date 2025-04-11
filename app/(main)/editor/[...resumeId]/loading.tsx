"use client"
import { motion } from "framer-motion";

export default function EditorLoading() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] bg-accent/10">
      {/* Left Sidebar Skeleton */}
      <div className="w-64 bg-background border-r animate-pulse" />

      {/* Main Content Skeleton */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="h-8 w-24 bg-muted rounded animate-pulse" />
          </div>

          {/* Form Sections Skeleton */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="h-32 bg-muted rounded-lg animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Skeleton */}
      <div className="hidden lg:block w-96 bg-background border-l">
        <div className="h-full flex items-center justify-center">
          <div className="w-64 h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
