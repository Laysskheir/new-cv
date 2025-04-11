import React from "react";
import { CustomSection, TemplateProps } from "@/types/resume";
import Image from "next/image";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

const DoubleColumn: React.FC<TemplateProps> = ({
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
  customSections,
  languages,
}) => {
  return (
    <div className="p-2 space-y-[var(--section-spacing)] text-[length:var(--font-size)]">
      <div className="max-w-5xl mx-auto">
        <div data-section-id="header" className="flex items-center mb-8">
          <div className="">
            <h1 className="text-xl font-bold">
              {firstName} {surname}
            </h1>
            <p className="text-muted-foreground text-sm">{profession}</p>
            <div className="flex mt-2 text-muted-foreground text-sm ">
              <div className="flex items-center mr-4">
                <PhoneIcon className="w-4 h-4 mr-1" />
                <p>{phone}</p>
              </div>
              <div className="flex items-center mr-4">
                <MailIcon className="w-4 h-4 mr-1" />
                <p>{email}</p>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <p>{`${city} ${country} ${postalCode}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2 pr-8">
            <div data-section-id="education">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-muted-foreground text-sm">
                    {edu.schoolName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {edu.schoolLocation}
                  </p>
                  <p className="text-muted-foreground text-sm">{`${edu.graduationDate.month} ${edu.graduationDate.year}`}</p>
                </div>
              ))}
            </div>

            <div data-section-id="experience">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mt-8 mb-4 uppercase tracking-wide">
                Experience
              </h2>
              {workHistory.map((work, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm">{work.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {work.employer}
                  </p>
                  <p className="text-muted-foreground text-sm">{`${
                    work.startDate.month
                  } ${work.startDate.year} - ${
                    work.endDate.current
                      ? "Present"
                      : `${work.endDate.month} ${work.endDate.year}`
                  }`}</p>
                  <p className="text-muted-foreground text-sm">
                    {work.location} {work.remote ? "(Remote)" : ""}
                  </p>
                  {work.description && Array.isArray(work.description) && (
                    <ul className="list-disc list-inside">
                      {work.description.map((desc, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div data-section-id="achievements">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mt-8 mb-4 uppercase tracking-wide">
                Achievements
              </h2>
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.date}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 pl-8">
            <div data-section-id="summary">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                Summary
              </h2>
              <p className="mb-8 text-muted-foreground text-sm">{summary}</p>
            </div>

            <div data-section-id="skills">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {skills.map((skill, index) => (
                  <p key={index} className="text-muted-foreground text-sm">
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            <div data-section-id="languages">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {languages.map((language, index) => (
                  <p key={index} className="text-muted-foreground text-sm">
                    {language.name} - {language.proficiency}
                  </p>
                ))}
              </div>
            </div>

            <div data-section-id="projects">
              <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.link}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <p className="text-muted-foreground text-sm mt-1">
                      Technologies: {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Add Custom Sections */}
            {customSections?.map((section: CustomSection, index: number) => (
              <div
                key={index}
                data-section-id={`custom-${index}`}
                className="mt-8"
              >
                <h2 className="text-xl font-bold border-b border-primary pb-2 mb-4 uppercase tracking-wide">
                  {section.title}
                </h2>
                {section.icon && (
                  <span className="text-lg mr-2">{section.icon}</span>
                )}
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
                <p className="text-muted-foreground text-sm">
                  {section.startDate?.month} {section.startDate?.year} -{" "}
                  {section.endDate?.current
                    ? "Present"
                    : `${section.endDate?.month} ${section.endDate?.year}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleColumn;
