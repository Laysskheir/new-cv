"use client";
// components/ui/text-color-animation.tsx

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface TextColorAnimationProps {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  textAlign: "left" | "center" | "right";
  colorClass01: string; // Updated to accept Tailwind class name
  colorClass02: string; // Updated to accept Tailwind class name
  Duration: number;
  delay: number;
  replays: boolean;
}

const TextColorAnimation: React.FC<TextColorAnimationProps> = ({
  text,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  colorClass01,
  colorClass02,
  Duration,
  delay,
  replays,
}) => {
  const controls = useAnimation();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        controls.start("visible");
      } else if (!entry.isIntersecting && replays) {
        controls.start("hidden");
      }
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [Duration, controls, delay, replays]);

  return (
    <div
      style={{
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        width: "200px",
        whiteSpace: "nowrap",
        textAlign: textAlign,
        position: "relative",
      }}
      className={`text-${colorClass01}`}
      ref={textRef}
    >
      <span style={{ position: "relative", display: "inline-block" }}>
        {text}
        <motion.span
          style={{
            position: "absolute",
            overflow: "hidden",
            whiteSpace: "nowrap",
            top: 0,
            left: 0,
            width: "100%",
          }}
          className={`text-${colorClass02}`}
          animate={controls}
          initial={{ width: "0%" }}
          variants={{
            visible: { width: "100%" },
            hidden: { width: "0%" },
          }}
          transition={{ duration: Duration }}
        >
          {text}
        </motion.span>
      </span>
    </div>
  );
};

export default TextColorAnimation;
