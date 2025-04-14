import React from "react";
import { CustomSection, TemplateProps } from "@/types/resume";
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
    <div className="bg-white w-full max-w-none m-0 p-0">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {firstName} {surname}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{profession}</p>
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
            <div className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2 text-gray-600" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 mr-2 text-gray-600" />
              <span>{email}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2 text-gray-600" />
              <span>{`${city}, ${country}`}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Shorter */}
          <div className="col-span-4 space-y-8">
            {/* Summary */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Summary</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Skills</h2>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((language, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {language.name} -{" "}
                    <span className="text-gray-600">
                      {language.proficiency}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Longer */}
          <div className="col-span-8 space-y-8">
            {/* Work Experience */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Work Experience
              </h2>
              {workHistory.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-1">
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

            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
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
                  {edu.fieldOfStudy && (
                    <p className="text-sm text-gray-600">
                      Field of Study: {edu.fieldOfStudy}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Projects
                </h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-4">
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
            )}

            {/* Achievements */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Achievements
              </h2>
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
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

            {/* Custom Sections */}
            {customSections?.map((section: CustomSection, index: number) => (
              <div key={index}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  {section.description}
                </p>
                <p className="text-sm text-gray-600">
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
