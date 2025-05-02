import React from "react";
import { TemplateProps } from "../../types/resume";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { LayoutRenderer } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

const Polished: React.FC<TemplateProps> = (props) => {
  const {
    firstName,
    surname,
    profession,
    phone,
    email,
    city,
    country,
    summary,
    skills,
    workHistory,
    education,
    languages,
    projects,
    achievements,
  } = props;

  // Function to render each section based on type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "personalDetails":
        return (
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{`${firstName} ${surname}`}</h1>
            <p className="text-lg text-gray-700 mb-4">{profession}</p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-700">
                <PhoneIcon className="w-4 h-4 mr-2 text-gray-600" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MailIcon className="w-4 h-4 mr-2 text-gray-600" />
                <span>{email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPinIcon className="w-4 h-4 mr-2 text-gray-600" />
                <span>{`${city}, ${country}`}</span>
              </div>
            </div>
          </header>
        );

      case "summary":
        return summary ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        ) : null;

      case "workHistory":
        return workHistory && workHistory.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Professional Experience
            </h2>
            {workHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-700">{job.employer}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.startDate.month} {job.startDate.year} -{" "}
                    {job.endDate.current
                      ? "Present"
                      : `${job.endDate.month} ${job.endDate.year}`}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {job.description.map((desc, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-700">{edu.schoolName}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.graduationDate.month} {edu.graduationDate.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <p key={index} className="text-sm text-gray-700">
                  • {skill}
                </p>
              ))}
            </div>
          </div>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Languages</h2>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {lang.name} -{" "}
                  <span className="text-gray-600">{lang.proficiency}</span>
                </p>
              ))}
            </div>
          </div>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {project.description}
                </p>
                {project.technologies && (
                  <p className="text-sm text-gray-600">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case "achievements":
        return achievements && achievements.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Achievements
            </h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                </div>
                <p className="text-sm text-gray-700">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <LayoutRenderer data={props}>
      {({ mainSections, sidebarSections }) => (
        <div className="bg-white w-full max-w-[750px] mx-auto p-8 text-black">
          <div className="flex flex-col">
            {/* Always render personal details at the top */}
            {renderSection("personalDetails")}

            {/* Single column layout - all sections in order */}
            <div className="flex flex-col gap-3">
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
        </div>
      )}
    </LayoutRenderer>
  );
};

export default Polished;
