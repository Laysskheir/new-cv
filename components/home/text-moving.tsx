import React from "react";
import { InfiniteMovingText } from "../ui/infinite-moving-text";

export default function TextMoving() {
  return (
    <div className="w-full mt-4">
      <div className="border-b pb-6 border-muted-foreground/80 flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingText
          text="Spark your career story — Transform your CV into a vibrant showcase —"
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
