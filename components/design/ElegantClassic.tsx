"use client";

import React from "react";
import { TemplateProps } from "@/types/resume";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { LayoutRenderer } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

const ElegantClassic: React.FC<TemplateProps> = (props) => {
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
    achievements,
    projects,
    summary,
  } = props;

  // Function to render each section based on type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "personalDetails":
        return (
          <header className="text-center mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold mb-1 text-gray-900">
              {firstName} {surname}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{profession}</p>

            <div className="flex flex-wrap justify-center gap-6 text-gray-700">
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{email}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{`${city}, ${country}`}</span>
              </div>
            </div>
          </header>
        );

      case "summary":
        return summary ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        ) : null;

      case "workHistory":
        return workHistory && workHistory.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Work Experience
            </h2>

            <div className="space-y-5">
              {workHistory.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
                    <span className="text-gray-600 text-sm">
                      {job.startDate.month} {job.startDate.year} - {" "}
                      {job.endDate.current ? "Present" : `${job.endDate.month} ${job.endDate.year}`}
                    </span>
                  </div>

                  <p className="text-gray-900 font-medium mb-2">{job.employer}, {job.location}</p>

                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {job.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Education
            </h2>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm">
                      {edu.graduationDate.month} {edu.graduationDate.year}
                    </span>
                  </div>

                  <p className="text-gray-900 mb-1">{edu.schoolName}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-gray-700">Field of Study: {edu.fieldOfStudy}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Projects
            </h2>

            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Skills
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-1 grid grid-cols-2">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Languages
            </h2>

            <ul className="grid grid-cols-2 gap-2">
              {languages.map((language, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-900">{language.name}</span>
                  <span className="text-gray-600">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null;

      case "achievements":
        return achievements && achievements.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
              Achievements
            </h2>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{achievement.date}</p>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <LayoutRenderer data={props}>
      {({ mainSections, sidebarSections }) => (
        <div className="bg-white text-gray-800 p-10 max-w-[750px] mx-auto">
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

export default ElegantClassic;
