import React from "react";
import { cn } from "@/lib/utils";
import { TemplateProps } from "@/types/resume";

interface BaseTemplateProps extends TemplateProps {
  className?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<{
  title?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ title, className, children }) => (
  <section className={cn("space-y-3", className)}>
    {title && (
      <h2 className="text-lg font-semibold border-b pb-1">
        {title}
      </h2>
    )}
    {children}
  </section>
);

export const ContactItem: React.FC<{
  icon?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}> = ({ icon, href, children }) => (
  <div className="flex items-center gap-2 text-sm">
    {icon && <span className="text-gray-500">{icon}</span>}
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-colors"
      >
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )}
  </div>
);

export const DateRange: React.FC<{
  startDate: string;
  endDate?: string;
  className?: string;
}> = ({ startDate, endDate, className }) => (
  <span className={cn("text-sm text-gray-500", className)}>
    {startDate}
    {endDate && endDate !== startDate && ` - ${endDate}`}
  </span>
);

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  className,
  children,
}) => {
  return (
    <article
      id="resume-content"
      className={cn(
        "w-[210mm] min-h-[297mm] mx-auto bg-white p-6 ",
        className
      )}
    >
      {children}
    </article>
  );
};

export default BaseTemplate;
