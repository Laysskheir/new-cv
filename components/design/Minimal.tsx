"use client";

import React from "react";
import { TemplateProps, CustomSection } from "@/types/resume";
import { LayoutRenderer, SectionHeader, MetaInfo, SectionItem, SectionTitle } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

const Minimal: React.FC<TemplateProps> = (props) => {
    const {
        firstName,
        surname,
        profession,
        city,
        country,
        phone,
        email,
        workHistory,
        education,
        projects,
        skills,
        summary,
        languages,
        achievements,
        customSections,
    } = props;

    // Function to render each section based on type
    const renderSection = (sectionType: SectionType) => {
        switch (sectionType) {
            case "personalDetails":
                return (
                    <header className="mb-8 border-b border-theme-border pb-4" style={{ pageBreakInside: 'avoid' }}>
                        <h1 className="text-2xl font-semibold mb-2 text-theme-heading">{`${firstName} ${surname}`}</h1>
                        <p className="text-theme-text-secondary mb-4">{profession}</p>
                        <div className="flex gap-4 text-sm text-theme-text-secondary">
                            <span>{phone}</span>
                            <span>•</span>
                            <span>{email}</span>
                            <span>•</span>
                            <span>{`${city}, ${country}`}</span>
                        </div>
                    </header>
                );

            case "summary":
                return summary ? (
                    <section className="mb-8">
                        <SectionHeader
                            title="Professional Summary"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">1</span>}
                        />
                        <p className="text-theme-text-secondary leading-relaxed">{summary}</p>
                    </section>
                ) : null;

            case "workHistory":
                return workHistory && workHistory.length > 0 ? (
                    <section className="mb-8">
                        <SectionHeader
                            title="Professional Experience"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">2</span>}
                        />
                        <div className="space-y-6">
                            {workHistory.map((work, index) => (
                                <SectionItem
                                    key={index}
                                    borderBottom={index !== workHistory.length - 1}
                                >
                                    <SectionTitle
                                        title={<>
                                            <div className="font-semibold">{work.title}</div>
                                            <div className="text-theme-text-secondary">{work.employer}</div>
                                        </>}
                                        rightContent={
                                            <MetaInfo>
                                                {work.startDate.month} {work.startDate.year} - {" "}
                                                {work.endDate.current ? "Present" : `${work.endDate.month} ${work.endDate.year}`}
                                            </MetaInfo>
                                        }
                                    />
                                    <ul className="list-disc pl-4 space-y-1 text-theme-text-secondary mt-2">
                                        {work.description.map((desc, descIndex) => (
                                            <li key={descIndex}>{desc}</li>
                                        ))}
                                    </ul>
                                </SectionItem>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "projects":
                return projects && projects.length > 0 ? (
                    <section className="mb-8">
                        <SectionHeader
                            title="Projects"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">3</span>}
                        />
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <SectionItem
                                    key={index}
                                    borderBottom={index !== projects.length - 1}
                                >
                                    <SectionTitle title={project.name} />
                                    <p className="text-theme-text-secondary mb-2 mt-1">{project.description}</p>
                                    {project.technologies && (
                                        <MetaInfo>
                                            Technologies: {project.technologies.join(", ")}
                                        </MetaInfo>
                                    )}
                                </SectionItem>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "education":
                return education && education.length > 0 ? (
                    <section className="mb-8">
                        <SectionHeader
                            title="Education"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">4</span>}
                        />
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <SectionItem
                                    key={index}
                                    borderBottom={index !== education.length - 1}
                                >
                                    <SectionTitle
                                        title={<>
                                            <div className="font-semibold">{edu.degree}</div>
                                            <div className="text-theme-text-secondary">{edu.schoolName}</div>
                                        </>}
                                        rightContent={
                                            <MetaInfo>
                                                {edu.graduationDate.month} {edu.graduationDate.year}
                                            </MetaInfo>
                                        }
                                    />
                                </SectionItem>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "skills":
                return skills && skills.length > 0 ? (
                    <section>
                        <SectionHeader
                            title="Skills"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">5</span>}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="text-theme-text-secondary">
                                    • {skill}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "languages":
                return languages && languages.length > 0 ? (
                    <section>
                        <SectionHeader
                            title="Languages"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">6</span>}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            {languages.map((language, index) => (
                                <div key={index} className="text-theme-text-secondary">
                                    • {language.name}: {language.proficiency}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "achievements":
                return achievements && achievements.length > 0 ? (
                    <section className="mb-8">
                        <SectionHeader
                            title="Achievements"
                            icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">7</span>}
                        />
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <SectionItem
                                    key={index}
                                    borderBottom={index !== achievements.length - 1}
                                >
                                    <SectionTitle
                                        title={achievement.title}
                                        rightContent={<MetaInfo>{achievement.date}</MetaInfo>}
                                    />
                                    <p className="text-theme-text-secondary mt-1">{achievement.description}</p>
                                </SectionItem>
                            ))}
                        </div>
                    </section>
                ) : null;

            case "customSections":
                return customSections && customSections.length > 0 ? (
                    <>
                        {customSections.map((section, index) => (
                            <section key={index} className="mb-8">
                                <SectionHeader
                                    title={section.title}
                                    icon={<span className="w-6 h-6 rounded-full bg-theme-accent-primary text-white flex items-center justify-center text-sm">{8 + index}</span>}
                                />
                                <p className="text-theme-text-secondary mb-2">{section.description}</p>
                                {section.startDate && (
                                    <MetaInfo>
                                        {section.startDate.month} {section.startDate.year} - {" "}
                                        {section.endDate?.current
                                            ? "Present"
                                            : `${section.endDate?.month} ${section.endDate?.year}`}
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
                <div className="w-full max-w-none m-0 p-8 bg-theme-bg-primary text-theme-text-primary">
                    <div className="flex flex-col max-w-[750px] mx-auto">
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

export default Minimal; 