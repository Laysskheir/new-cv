"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
}

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          progress={scrollYProgress}
          index={i}
        />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  progress: any; // Using 'any' to avoid MotionValue type issues
  index: number;
}

function ProjectCard({ project, progress, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const yRange = useTransform(progress, [0, 1], [0, -100 * index]);
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  const scaleRange = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.25],
    [1, 0.8]
  );
  const scale = useSpring(scaleRange, { stiffness: 400, damping: 90 });

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale }}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <div className="relative w-full max-w-7xl aspect-video rounded-lg overflow-hidden bg-white shadow-lg">
        <Image src={project.image} alt={project.title} fill objectFit="cover" />
        <div className="absolute inset-0 flex items-center justify-start ml-16">
          <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg p-8 rounded-md max-w-lg">
            <h3 className="text-white text-5xl font-bold mb-4">
              {project.title}
            </h3>
            <p className="text-white text-lg my-6">{project.description}</p>
            <Link href="/" className="text-white flex items-center">
              <Button
                size="sm"
                variant="ghost"
                className="mr-2 backdrop-blur-sm"
              >
                <MoveUpRight className="w-4 h-4" />
              </Button>
              Discover
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const projects: Project[] = [
  {
    title: "Erikk",
    description:
      "Erikk represents a multi-purpose Website ideal for creative agencies, design studios, freelancers, and personal portfolios.",
    image: "/images/image1.png",
  },
  {
    title: "Alvy",
    description:
      "Alvy is a versatile and functional Framer Template for creative agencies, design studios, freelancers, and personal portfolios.",
    image:
      "https://framerusercontent.com/images/8sLI9tGVjnnnT5efJRaCy2iIiQ.webp?scale-down-to=2048",
  },
  {
    title: "Fylla",
    description:
      "Fylla is a minimal & modern Agency Framer Template perfectly suited for creative agencies, design studios, freelancer or your personal portfolio.",
    image:
      "https://framerusercontent.com/images/0wVpYAYpC8Pn72EfvBCIDRgSGE.webp?scale-down-to=2048",
  },
];
