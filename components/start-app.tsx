"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import TextMoving from "@/components/home/text-moving";
import Questions from "@/components/home/Questions";
import Footer from "@/components/layouts/footer";
import ScalableFoundation from "./home/ScalableFoundation";
import { CVCreationSteps } from "./home/CVCreationSteps";

export default function StartPage() {
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Check if iframe loaded successfully after a delay
    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [iframeLoaded]);

  return (
    <main className="overflow-hidden">
      <div className={`transition-all duration-300 ease-in-out`}>
        <Hero className={`shadow-lg`} />
      </div>

      <div className="relative w-full" style={{ minHeight: "600px" }}>
        {iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center p-4">
              <p className="text-gray-600 mb-2">Unable to load the chat interface.</p>
              <a
                href="https://laysskheir.next.hollo.ai/live?agent-id=laysskheir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open in a new window
              </a>
            </div>
          </div>
        )}
        <iframe
          src="https://laysskheir.next.hollo.ai/live?agent-id=laysskheir"
          width="100%"
          height="600"
          allow="microphone; camera; geolocation"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIframeLoaded(true)}
          onError={() => setIframeError(true)}
          style={{ display: iframeError ? "none" : "block" }}
          title="Chat Interface"
        />
      </div>
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
