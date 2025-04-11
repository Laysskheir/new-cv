"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LayoutTemplate,
  FileText,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function Intro() {
  const router = useRouter();
  const showText = useDebounce(true, 800);


  return (
    <motion.div
      className="flex size-full flex-col items-center justify-center px-4"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      {showText && (
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center"
        >
          <motion.h1
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            Create Your Professional Resume
          </motion.h1>

          <motion.p
            className="max-w-2xl text-md text-muted-foreground sm:text-lg"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            Stand out from the crowd with a professionally designed resume. Our
            easy-to-use builder helps you create a resume that gets noticed.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: "spring" },
              },
            }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/onboarding?step=choose-template")}
              className="gap-2"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { delay: 0.6 },
              },
            }}
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Trusted by professionals worldwide</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
