"use client";

import React from "react";
import { TemplateProps } from "@/types/resume";
import { LayoutRenderer } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

const IvyLeague: React.FC<TemplateProps> = (props) => {
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
    projects,
    skills,
    summary,
    achievements,
    languages,
  } = props;

  // Function to render each section based on type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "personalDetails":
        return (
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {firstName} {surname}
            </h1>
            <p className="text-xl text-gray-700 mb-4">{profession}</p>
            <div className="flex justify-center space-x-6 text-gray-700">
              <span>{phone}</span>
              <span>{email}</span>
              <span>{`${city}, ${country}${postalCode ? `, ${postalCode}` : ''}`}</span>
            </div>
          </header>
        );

      case "summary":
        return summary ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((skill, index) => (
                <p key={index} className="text-gray-700">
                  • {skill}
                </p>
              ))}
            </div>
          </section>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Languages</h2>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang, index) => (
                <p key={index} className="text-gray-700">
                  {lang.name} - {lang.proficiency}
                </p>
              ))}
            </div>
          </section>
        ) : null;

      case "workHistory":
        return workHistory && workHistory.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Work Experience
            </h2>
            {workHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-700">{job.employer}</p>
                  </div>
                  <p className="text-gray-600">
                    {job.startDate.month} {job.startDate.year} -{" "}
                    {job.endDate.current
                      ? "Present"
                      : `${job.endDate.month} ${job.endDate.year}`}
                  </p>
                </div>
                <p className="text-gray-600 mb-2">
                  {job.location}
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {job.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.technologies && (
                  <p className="text-gray-600">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.schoolName}
                    </h3>
                    <p className="text-gray-700">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    {edu.graduationDate.month} {edu.graduationDate.year}
                  </p>
                </div>
                {edu.schoolLocation && <p className="text-gray-600">{edu.schoolLocation}</p>}
              </div>
            ))}
          </section>
        ) : null;

      case "achievements":
        return achievements && achievements.length > 0 ? (
          <section className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Achievements</h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.date}</p>
                </div>
                <p className="text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <LayoutRenderer data={props}>
      {({ mainSections, sidebarSections }) => (
        <div className="text-black bg-white w-full max-w-[750px] mx-auto p-8">
          {/* Always render personal details at the top */}
          {renderSection("personalDetails")}

          {/* Single column layout - all sections in order */}
          <div className="flex flex-col gap-2">
            {/* Main sections first (excluding personalDetails) */}
            {mainSections
              .filter((section: SectionType) => section !== "personalDetails")
              .map((section: SectionType) => (
                <div key={section}>
                  {renderSection(section)}
                </div>
              ))}

            {/* Sidebar sections after main sections */}
            {sidebarSections.map((section: SectionType) => (
              <div key={section}>
                {renderSection(section)}
              </div>
            ))}
          </div>
        </div>
      )}
    </LayoutRenderer>
  );
};

export default IvyLeague;
