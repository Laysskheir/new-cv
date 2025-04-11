import React from "react";
import { TemplateProps } from "@/types/resume";
import { cn } from "@/lib/utils";

export interface BaseTemplateProps {
  className?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className }) => (
  <section className={cn("mb-6", className)}>
    <h2 className="font-bold mb-4 uppercase tracking-wide">{title}</h2>
    {children}
  </section>
);

export const ContactItem: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{children}</span>
  </div>
);

export const DateRange: React.FC<{
  startDate: { month: string; year: string };
  endDate: { month: string; year: string; current: boolean };
}> = ({ startDate, endDate }) => (
  <span className="text-muted-foreground text-sm">
    {startDate.month} {startDate.year} -{" "}
    {endDate.current ? "Present" : `${endDate.month} ${endDate.year}`}
  </span>
);

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "max-w-2xl mx-auto px-4 space-y-[var(--section-spacing)] text-[length:var(--font-size)]",
        className
      )}
    >
      {children}
    </div>
  );
};
