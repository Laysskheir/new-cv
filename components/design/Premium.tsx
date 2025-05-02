"use client";

import React from 'react';
import { TemplateProps, CustomSection } from '@/types/resume';
import { LayoutRenderer, SectionHeader, MetaInfo, SectionItem, SectionTitle } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

const Premium: React.FC<TemplateProps> = (props) => {
    const {
        firstName,
        surname,
        profession,
        city,
        country,
        postalCode,
        phone,
        email,
        workHistory,
        education,
        skills,
        summary,
        achievements,
        languages,
        projects,
        customSections,
    } = props;

    // Function to render each section based on type
    const renderSection = (sectionType: SectionType) => {
        switch (sectionType) {
            case "personalDetails":
                return (
                    <header className="flex items-start gap-6 mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-theme-heading">{`${firstName} ${surname}`}</h1>
                            <p className="text-xl text-theme-text-secondary mt-1">{profession}</p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-theme-text-secondary">
                                <span className="flex items-center gap-1">
                                    <LocationIcon className="w-4 h-4" />
                                    {city}, {country} {postalCode}
                                </span>
                                <span className="flex items-center gap-1">
                                    <PhoneIcon className="w-4 h-4" />
                                    {phone}
                                </span>
                                <span className="flex items-center gap-1">
                                    <EmailIcon className="w-4 h-4" />
                                    {email}
                                </span>
                            </div>
                        </div>
                    </header>
                );

            case "summary":
                return summary ? (
                    <section className="mb-6">
                        <SectionHeader title="Summary" />
                        <p className="text-theme-text-primary whitespace-pre-line">{summary}</p>
                    </section>
                ) : null;

            case "workHistory":
                return workHistory && workHistory.length > 0 ? (
                    <section className="mb-6">
                        <SectionHeader title="Experience" />
                        {workHistory.map((work, index) => (
                            <SectionItem
                                key={index}
                                borderBottom={index !== workHistory.length - 1}
                            >
                                <SectionTitle
                                    title={
                                        <div>
                                            <h3 className="text-lg font-semibold text-theme-heading">{work.title}</h3>
                                            <p className="text-theme-text-secondary">{work.employer}</p>
                                            <p className="text-theme-text-secondary">{work.location}</p>
                                        </div>
                                    }
                                    rightContent={
                                        <MetaInfo>
                                            {work.startDate.month} {work.startDate.year} to{' '}
                                            {work.endDate.current
                                                ? 'Present'
                                                : `${work.endDate.month} ${work.endDate.year}`}
                                        </MetaInfo>
                                    }
                                />
                                {Array.isArray(work.description) && (
                                    <ul className="list-disc list-inside mt-2 text-theme-text-primary">
                                        {work.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {typeof work.description === 'string' && (
                                    <p className="mt-2 text-theme-text-primary">{work.description}</p>
                                )}
                            </SectionItem>
                        ))}
                    </section>
                ) : null;

            case "education":
                return education && education.length > 0 ? (
                    <section className="mb-6">
                        <SectionHeader title="Education" />
                        {education.map((edu, index) => (
                            <SectionItem
                                key={index}
                                borderBottom={index !== education.length - 1}
                            >
                                <SectionTitle
                                    title={
                                        <div>
                                            <h3 className="text-lg font-semibold text-theme-heading">{edu.schoolName}</h3>
                                            <p className="text-theme-text-secondary">{edu.degree}</p>
                                            <p className="text-theme-text-secondary">{edu.fieldOfStudy}</p>
                                        </div>
                                    }
                                    rightContent={
                                        <div className="text-right">
                                            <MetaInfo>
                                                {edu.graduationDate.month} {edu.graduationDate.year}
                                            </MetaInfo>
                                            <MetaInfo>{edu.schoolLocation}</MetaInfo>
                                        </div>
                                    }
                                />
                            </SectionItem>
                        ))}
                    </section>
                ) : null;

            case "achievements":
                return achievements && achievements.length > 0 ? (
                    <section className="mt-6">
                        <SectionHeader title="Achievements" />
                        <div className="grid grid-cols-2 gap-4">
                            {achievements.map((achievement, index) => (
                                <SectionItem
                                    key={index}
                                    borderBottom={false}
                                    className="mb-0"
                                >
                                    <SectionTitle
                                        title={achievement.title}
                                        rightContent={<MetaInfo>{achievement.date}</MetaInfo>}
                                    />
                                    <p className="text-theme-text-secondary">{achievement.description}</p>
                                </SectionItem>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "skills":
                return skills && skills.length > 0 ? (
                    <section>
                        <SectionHeader title="Skills" />
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-theme-bg-secondary text-theme-text-primary px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "languages":
                return languages && languages.length > 0 ? (
                    <section className="mt-6">
                        <SectionHeader title="Languages" />
                        <div className="grid grid-cols-3 gap-4">
                            {languages.map((language, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="font-medium text-theme-text-primary">{language.name}</span>
                                    <MetaInfo>{language.proficiency}</MetaInfo>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "projects":
                return projects && projects.length > 0 ? (
                    <section className="mb-6">
                        <SectionHeader title="Projects" />
                        {projects.map((project, index) => (
                            <SectionItem
                                key={index}
                                borderBottom={index !== projects.length - 1}
                            >
                                <SectionTitle title={project.name} />
                                <p className="text-theme-text-secondary">{project.description}</p>
                                {project.technologies && (
                                    <p className="text-theme-text-secondary mt-1">
                                        <span className="font-medium text-theme-text-primary">Technologies:</span> {project.technologies.join(", ")}
                                    </p>
                                )}
                                {project.link && (
                                    <a href={project.link} className="text-theme-accent-primary hover:underline mt-1 inline-block">
                                        View Project
                                    </a>
                                )}
                            </SectionItem>
                        ))}
                    </section>
                ) : null;

            case "customSections":
                return customSections && customSections.length > 0 ? (
                    <>
                        {customSections.map((section, index) => (
                            <section key={index} className="mb-6">
                                <SectionHeader title={section.title} />
                                <p className="text-theme-text-primary">{section.description}</p>
                                {section.startDate && (
                                    <MetaInfo className="mt-1">
                                        {section.startDate.month} {section.startDate.year}{' '}
                                        {section.endDate && '- '}
                                        {section.endDate?.current
                                            ? 'Present'
                                            : section.endDate
                                                ? `${section.endDate.month} ${section.endDate.year}`
                                                : ''}
                                    </MetaInfo>
                                )}
                            </section>
                        ))}
                    </>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <LayoutRenderer data={props}>
            {({ mainSections, sidebarSections }) => (
                <div className="max-w-[750px] mx-auto bg-theme-bg-primary text-theme-text-primary p-8">
                    <div className="flex flex-col">
                        {/* Always render personal details at the top */}
                        {renderSection("personalDetails")}

                        {/* Single column layout - all sections in order */}
                        <div className="flex flex-col gap-4 mt-4">
                            {/* Main sections first (excluding personalDetails) */}
                            {mainSections
                                .filter((section) => section !== "personalDetails")
                                .map((section) => (
                                    <div key={section} className="mb-2">
                                        {renderSection(section)}
                                    </div>
                                ))}

                            {/* Sidebar sections after main sections */}
                            {sidebarSections.map((section) => (
                                <div key={section} className="mb-2">
                                    {renderSection(section)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </LayoutRenderer>
    );
};

// Icon components
const LocationIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export default Premium;
