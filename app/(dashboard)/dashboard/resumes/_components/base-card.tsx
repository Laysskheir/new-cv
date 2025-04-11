import Tilt from "react-parallax-tilt";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { defaultTiltProps } from "@/constants/parallax-tilt";

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const BaseCard = ({ children, className, onClick }: Props) => (
  <Tilt {...defaultTiltProps}>
    <Card
      className={cn(
        "relative flex aspect-[1/1.4142] scale-100 cursor-pointer items-center justify-center bg-secondary/50 p-0 transition-transform active:scale-95",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  </Tilt>
);
