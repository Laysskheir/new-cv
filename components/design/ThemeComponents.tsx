import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    title: string;
    className?: string;
    icon?: React.ReactNode;
}

// Themed section header that follows the theme colors
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className, icon }) => {
    return (
        <div className={cn(
            "flex items-center gap-2 mb-3 pb-2 border-b border-theme-border",
            className
        )}>
            {icon && <span className="text-theme-accent-primary">{icon}</span>}
            <h2 className="text-theme-heading font-semibold text-lg">
                {title}
            </h2>
        </div>
    );
};

// Themed date range or location component
export const MetaInfo: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={cn("text-sm text-theme-text-secondary", className)}>
            {children}
        </div>
    );
};

// Themed section item (e.g., a job, education, etc.)
export const SectionItem: React.FC<{
    children: React.ReactNode;
    className?: string;
    borderBottom?: boolean;
}> = ({
    children,
    className,
    borderBottom = true
}) => {
        return (
            <div className={cn(
                "mb-4 pb-3",
                borderBottom && "border-b border-theme-border",
                className
            )}>
                {children}
            </div>
        );
    };

// Section title with optional right-aligned content
export const SectionTitle: React.FC<{
    title: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
}> = ({ title, rightContent, className }) => {
    return (
        <div className={cn("flex justify-between items-start", className)}>
            <h3 className="font-medium text-theme-heading">{title}</h3>
            {rightContent && (
                <div className="text-theme-accent-primary">{rightContent}</div>
            )}
        </div>
    );
}; 