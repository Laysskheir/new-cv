import React from "react";
import { TemplateProps } from "../../types/resume";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

const Polished: React.FC<TemplateProps> = ({
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
}) => (
  <div className="bg-white w-full max-w-none m-0 p-0 text-black">
    <div className="grid grid-cols-12 min-h-screen">
      {/* Left Sidebar */}
      <div className="col-span-4 bg-gray-50 p-8">
        <div className="sticky top-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{`${firstName} ${surname}`}</h1>
            <p className="text-lg text-gray-700 mb-6">{profession}</p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
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

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <p key={index} className="text-sm text-gray-700">
                  • {skill}
                </p>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {lang.name} -{" "}
                  <span className="text-gray-600">{lang.proficiency}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-8 p-8">
        {/* Professional Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          {workHistory.map((job, index) => (
            <div key={index} className="mb-6">
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

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Projects</h2>
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
        {achievements && achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Achievements
            </h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
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
        )}
      </div>
    </div>
  </div>
);

export default Polished;
