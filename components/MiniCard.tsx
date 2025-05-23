// src/components/MiniCard.tsx

import React from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface MiniCardProps {
  template: string;
  className?: string;
  showPreview?: boolean;
}

const MiniCard: React.FC<MiniCardProps> = ({
  template,
  className,
  showPreview = false,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Generate a simple preview based on template name
  const renderPreview = () => {
    if (showPreview) {
      return (
        <div className="w-full h-full bg-white p-4 flex flex-col">
          <div className="h-4 w-3/4 bg-primary/20 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-muted rounded mb-4"></div>

          <div className="flex-1 grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <div className="h-3 w-full bg-muted rounded"></div>
              <div className="h-3 w-4/5 bg-muted rounded"></div>
              <div className="h-3 w-3/4 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-muted rounded"></div>
              <div className="h-3 w-4/5 bg-muted rounded"></div>
              <div className="h-3 w-3/4 bg-muted rounded"></div>
            </div>
          </div>

          <div className="mt-4 h-3 w-2/3 bg-primary/10 rounded"></div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-lg overflow-hidden bg-muted transition-all duration-300",
        isHovered && "shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Badge variant="secondary" className="absolute top-2 left-2 z-10">
        {template.split(/(?=[A-Z])/).join(" ")}
      </Badge>

      <div className="relative w-full h-full">
        {!imageError ? (
          <Image
            src={`/images/templates/${template.toLowerCase()}.jpg`}
            alt={`${template} template preview`}
            fill
            className="object-cover transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Try .png if .jpg fails
              if (target.src.endsWith('.jpg')) {
                target.src = target.src.replace('.jpg', '.png');
              } else {
                setImageError(true);
              }
            }}
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            {renderPreview() || (
              <span className="text-muted-foreground">
                Preview not available
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCard;
