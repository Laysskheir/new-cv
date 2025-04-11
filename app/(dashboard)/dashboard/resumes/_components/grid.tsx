"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CreateResumeCard } from "./create-card";
import { ImportResumeCard } from "./import-card";
import ResumeCard from "./resume-card";
import { Resume } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./empty-state";

interface ResumeProps {
  resumes: Resume[];
  isLoading?: boolean;
}

export const GridView = ({ resumes, isLoading = false }: ResumeProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (!resumes?.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
      </div>

      <div
        role="grid"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <motion.div
          role="gridcell"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <CreateResumeCard />
        </motion.div>

        <motion.div
          role="gridcell"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ImportResumeCard />
        </motion.div>

        <AnimatePresence mode="popLayout">
          {resumes.map((resume, index) => (
            <motion.div
              role="gridcell"
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: 0.1 + index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ResumeCard resume={resume} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
