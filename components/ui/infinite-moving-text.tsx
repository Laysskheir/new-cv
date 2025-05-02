"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingText = ({
  text,
  direction = "left",
  speed = "slow",
  pauseOnHover = false,
  className,
}: {
  text: string;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate content for seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "150s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  // Split text into parts to apply different styles
  const textParts = text.split("Transform your CV");

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex items-center w-max whitespace-nowrap animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        <li className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl lg:text-[85px] text-primary flex">
            {textParts.map((part, index) => (
              <React.Fragment key={index}>
                <span>{part}</span>
                {index < textParts.length - 1 && (
                  <span className="text-muted-foreground/70 mx-2">
                    Transform your CV
                  </span>
                )}
              </React.Fragment>
            ))}
          </h1>
        </li>
      </ul>
    </div>
  );
};
