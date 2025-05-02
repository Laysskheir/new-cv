"use client";

import React from "react";
import { TemplateProps, CustomSection } from "@/types/resume";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { LayoutRenderer, SectionHeader, MetaInfo, SectionItem, SectionTitle } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";
import { DynamicResumeLayout } from "@/components/dynamic-resume-layout";

const Modern: React.FC<TemplateProps> = (props) => {
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
    skills,
    languages,
    summary,
    achievements,
    projects,
    customSections,
  } = props;

  // Function to render each section based on type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "personalDetails":
        return (
          <div className="bg-theme-bg-secondary p-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold text-theme-heading">
                {firstName} {surname}
              </h1>
              <p className="text-lg text-theme-text-secondary mt-1">{profession}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-theme-text-secondary">
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{`${city}, ${country}`}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "summary":
        return summary ? (
          <div>
            <SectionHeader title="Summary" />
            <p className="text-theme-text-secondary">{summary}</p>
          </div>
        ) : null;

      case "workHistory":
        return workHistory && workHistory.length > 0 ? (
          <div>
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {workHistory.map((job, idx) => (
                <SectionItem
                  key={idx}
                  borderBottom={idx !== workHistory.length - 1}
                >
                  <SectionTitle
                    title={
                      <>
                        <div className="text-lg font-medium text-theme-heading">{job.title}</div>
                        <div className="text-theme-text-primary font-medium">{job.employer}</div>
                        <div className="text-sm text-theme-text-secondary mb-2">{job.location}</div>
                      </>
                    }
                    rightContent={
                      <MetaInfo>
                        {job.startDate.month} {job.startDate.year} -{" "}
                        {job.endDate.current ? "Present" : `${job.endDate.month} ${job.endDate.year}`}
                      </MetaInfo>
                    }
                  />
                  <ul className="list-disc pl-5 text-theme-text-secondary space-y-1">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </SectionItem>
              ))}
            </div>
          </div>
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <div>
            <SectionHeader title="Education" />
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <SectionItem
                  key={idx}
                  borderBottom={idx !== education.length - 1}
                >
                  <SectionTitle
                    title={
                      <>
                        <div className="text-lg font-medium text-theme-heading">{edu.degree}</div>
                        <div className="text-theme-text-primary">{edu.schoolName}</div>
                        {edu.fieldOfStudy && (
                          <div className="text-sm text-theme-text-secondary">Field of Study: {edu.fieldOfStudy}</div>
                        )}
                      </>
                    }
                    rightContent={
                      <MetaInfo>
                        {edu.graduationDate.month} {edu.graduationDate.year}
                      </MetaInfo>
                    }
                  />
                </SectionItem>
              ))}
            </div>
          </div>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <div>
            <SectionHeader title="Skills" />
            <ul className="space-y-1">
              {skills.map((skill, idx) => (
                <li key={idx} className="text-theme-text-secondary">{skill}</li>
              ))}
            </ul>
          </div>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <div>
            <SectionHeader title="Languages" />
            <ul className="space-y-2">
              {languages.map((language, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="font-medium text-theme-text-primary">{language.name}</span>
                  <MetaInfo>{language.proficiency}</MetaInfo>
                </li>
              ))}
            </ul>
          </div>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <div>
            <SectionHeader title="Projects" />
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <SectionItem
                  key={idx}
                  borderBottom={idx !== projects.length - 1}
                >
                  <SectionTitle title={project.name} />
                  <p className="text-theme-text-secondary mb-1">{project.description}</p>
                  {project.technologies && (
                    <MetaInfo>
                      Technologies: {project.technologies.join(", ")}
                    </MetaInfo>
                  )}
                  {project.link && (
                    <a href={project.link} className="text-sm text-theme-accent-primary hover:underline">
                      View Project
                    </a>
                  )}
                </SectionItem>
              ))}
            </div>
          </div>
        ) : null;

      case "achievements":
        return achievements && achievements.length > 0 ? (
          <div>
            <SectionHeader title="Achievements" />
            <div className="space-y-4">
              {achievements.map((achievement, idx) => (
                <SectionItem
                  key={idx}
                  borderBottom={idx !== achievements.length - 1}
                >
                  <SectionTitle
                    title={achievement.title}
                    rightContent={
                      <MetaInfo>{achievement.date}</MetaInfo>
                    }
                  />
                  <p className="text-theme-text-secondary">{achievement.description}</p>
                </SectionItem>
              ))}
            </div>
          </div>
        ) : null;

      case "customSections":
        return customSections && customSections.length > 0 ? (
          <>
            {customSections.map((section, index) => (
              <div key={index}>
                <SectionHeader title={section.title} />
                <p className="text-theme-text-secondary mb-2">{section.description}</p>
                {section.startDate && (
                  <MetaInfo>
                    {section.startDate.month} {section.startDate.year} -{" "}
                    {section.endDate?.current
                      ? "Present"
                      : `${section.endDate?.month} ${section.endDate?.year}`}
                  </MetaInfo>
                )}
              </div>
            ))}
          </>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <LayoutRenderer data={props}>
      {() => (
        <div className="bg-theme-bg-primary text-theme-text-primary w-full max-w-none m-0 p-0">
          <DynamicResumeLayout renderSection={renderSection}>
            <div className="hidden">Extra content if needed</div>
          </DynamicResumeLayout>
        </div>
      )}
    </LayoutRenderer>
  );
};

export default Modern;
