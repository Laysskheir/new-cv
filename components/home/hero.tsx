"use client";
import React from "react";
import { Button } from "../ui/button";
import Logo from "../logo";
import Link from "next/link";
import { Icons } from "../icons";
import { motion } from "framer-motion";
import AnimatedLight from "./AnimatedLight";
import { cn } from "@/lib/utils";
import { client } from "@/lib/auth-client";

export default function Hero({ className }: { className?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const { data: session } = client.useSession();

  return (
    <motion.div
      className={cn(
        "relative p-8 container bg-primary min-h-[90vh] flex flex-col justify-between items-start overflow-hidden",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatedLight className="top-1/4 left-8" size={200} color="background" />
      <AnimatedLight
        className="top-3/4 right-1/2"
        size={150}
        color="background"
      />
      <AnimatedLight
        className="bottom-1/2 right-1/4"
        size={250}
        color="background"
      />

      <motion.header
        className="relative w-full flex justify-between items-center"
        variants={itemVariants}
      >
        <Logo className="text-primary-foreground" />
        <nav className="flex gap-x-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {session?.session ? (
              <Button
                variant="link"
                className="font-semibold text-background hover:text-secondary transition-colors"
                onClick={() => {
                  client.signOut();
                }}
              >
                <Icons.fingerprint className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="link"
                className="font-semibold text-background hover:text-secondary transition-colors"
              >
                <Icons.fingerprint className="w-4 h-4 " />
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              asChild
              className="hover:bg-background hover:text-primary transition-colors"
            >
              <Link href="/story">Story</Link>
            </Button>
          </motion.div>
        </nav>
      </motion.header>

      <motion.div className="relative max-w-2xl w-full" variants={itemVariants}>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-start text-primary-foreground leading-tight mb-6"
          variants={itemVariants}
        >
          Craft your career's
          <span className="text-secondary/30 mx-2">masterpiece</span>
          and turn your CV into a
          <span className="text-secondary/30 ml-2">work of art</span>
        </motion.h1>

        <motion.div className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/resumes">
              {session?.session ? "Go to Dashboard" : "Let's Start"}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
