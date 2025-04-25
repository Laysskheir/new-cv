import {
  FileText,
  BookOpen,
  Briefcase,
  Award,
  Compass,
  MousePointerClick,
  GraduationCap,
  Puzzle,
  Languages,
  User,
} from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionId =
  | "heading"
  | "summary"
  | "workHistory"
  | "education"
  | "projects"
  | "achievements"
  | "certifications"
  | "languages"
  | "skills"
  | "custom";

export const getSectionIcon = (id: SectionId, props: any = {}) => {
  switch (id) {
    // Left Sidebar
    case "heading": {
      return <User size={22} {...props} />;
    }
    case "summary": {
      return <FileText size={22} {...props} />;
    }
    case "workHistory": {
      return <Briefcase size={22} {...props} />;
    }
    case "education": {
      return <GraduationCap size={22} {...props} />;
    }
    case "projects": {
      return <Puzzle size={22} {...props} />;
    }
    case "achievements": {
      return <BookOpen size={22} {...props} />;
    }
    case "certifications": {
      return <Award size={22} {...props} />;
    }
    case "languages": {
      return <Languages size={22} {...props} />;
    }
    case "skills": {
      return <Compass size={22} {...props} />;
    }
    case "custom": {
      return <MousePointerClick size={22} {...props} />;
    }
    default: {
      return null;
    }
  }
};

type SectionIconProps = ButtonProps & {
  id: SectionId;
  name?: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline";
};

export const SectionIcon = ({
  id,
  name,
  icon,
  variant = "default",
  className,
  ...props
}: SectionIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip side="right" content={name}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            variant={variant === "outline" ? "outline" : "ghost"}
            className={cn(
              "size-9 rounded-full transition-all duration-200",
              variant === "outline"
                ? "border-dashed hover:bg-muted/50"
                : "hover:bg-muted/70",
              className
            )}
            {...props}
          >
            {icon ?? getSectionIcon(id, { size: 20 })}
          </Button>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};
