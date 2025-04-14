"use client";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader className="animate-spin w-6 h-6" />
        <p className="text-lg font-medium text-foreground">Loading...</p>
      </motion.div>
    </div>
  );
}
