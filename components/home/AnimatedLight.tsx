import React from "react";
import { motion } from "framer-motion";

interface AnimatedLightProps {
  className?: string;
  size: number;
  color: string;
}

const AnimatedLight: React.FC<AnimatedLightProps> = ({
  className,
  size,
  color,
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className} bg-${color}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 20, 0],
        y: [0, 20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

export default AnimatedLight;
