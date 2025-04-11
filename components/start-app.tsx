"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import TextMoving from "@/components/home/text-moving";
import Questions from "@/components/home/Questions";
import Footer from "@/components/layouts/footer";
import ScalableFoundation from "./home/ScalableFoundation";
import { CVCreationSteps } from "./home/CVCreationSteps";

export default function StartPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled ? "p-0" : "p-4 md:p-10"
        }`}
      >
        <Hero className={`${scrolled ? "" : "rounded-lg"} shadow-lg`} />
      </div>
      <div className="container mx-auto px-0 space-y-16 md:space-y-24">
        <TextMoving />
        <CVCreationSteps />
        <ScalableFoundation />
        <Questions />
      </div>
      <Footer />
    </main>
  );
}
