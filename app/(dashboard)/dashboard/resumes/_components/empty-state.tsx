"use client";
import { FileText } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { CreateResumeCard } from "./create-card";
import { ImportResumeCard } from "./import-card";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 px-4 py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative"
      >
        <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl" />
        <div className="relative rounded-full bg-primary/10 p-4">
          <FileText size={32} className="text-primary" weight="duotone" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h3 className="text-xl font-bold tracking-tight">No Resumes Yet</h3>
        <p className="text-muted-foreground max-w-md text-xs">
          Start building your professional profile by creating a new resume or
          importing an existing one
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <CreateResumeCard />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ImportResumeCard />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
