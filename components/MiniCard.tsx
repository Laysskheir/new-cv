// src/components/MiniCard.tsx

import React from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface MiniCardProps {
  template: string;
}

const MiniCard: React.FC<MiniCardProps> = ({ template }) => {
  return (
    <div className="relative border rounded-lg shadow-sm h-full w-full overflow-hidden">
      <Badge className="absolute bg-black text-white top-2 left-2 z-10 text-xs">
        {template.split(/(?=[A-Z])/).join(" ")}
      </Badge>
      <div className="relative h-full w-full aspect-auto">
        <Image
          src={`/images/templates/${template.toLowerCase()}.jpg`}
          alt={`${template} template`}
          layout="fill"
          objectFit="contain"
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
    </div>
  );
};

export default MiniCard;
