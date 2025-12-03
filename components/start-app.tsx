"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import TextMoving from "@/components/home/text-moving";
import Questions from "@/components/home/Questions";
import Footer from "@/components/layouts/footer";
import ScalableFoundation from "./home/ScalableFoundation";
import { CVCreationSteps } from "./home/CVCreationSteps";

export default function StartPage() {
  return (
    <main className="overflow-hidden">
      <div className={`transition-all duration-300 ease-in-out`}>
        <Hero className={`shadow-lg`} />
      </div>

      <iframe
        src="https://next.hollo.ai/live?agent-id=laysskheir"
        width="100%"
        height="600"
      ></iframe>
      <div className="lg:container xl:!max-w-none mx-auto px-0 space-y-16 md:space-y-24">
        <TextMoving />
        <CVCreationSteps />
        <ScalableFoundation />
        <Questions />
      </div>
      <Footer />
    </main>
  );
}
