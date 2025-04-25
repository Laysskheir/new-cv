import React from "react";
import { TemplateProps } from "@/types/resume";

export const IvyLeague: React.FC<TemplateProps> = ({
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
}) => {
  return (
    <div className="text-black w-full max-w-none m-0 p-0">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {firstName} {surname}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{profession}</p>
          <div className="flex justify-center space-x-6 text-gray-700">
            <span>{phone}</span>
            <span>{email}</span>
            <span>{`${city}, ${country}, ${postalCode}`}</span>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="grid grid-cols-3 gap-2">
            {skills.map((skill, index) => (
              <p key={index} className="text-gray-700">
                • {skill}
              </p>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang, index) => (
              <p key={index} className="text-gray-700">
                {lang.name} - {lang.proficiency}
              </p>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          {workHistory.map((job, index) => (
            <div key={index} className="mb-6">
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

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-6">
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

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.schoolName}
                  </h3>
                  <p className="text-gray-700">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                </div>
                <p className="text-gray-600">
                  {edu.graduationDate.month} {edu.graduationDate.year}
                </p>
              </div>
              <p className="text-gray-600">{edu.schoolLocation}</p>
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
          {achievements.map((achievement, index) => (
            <div key={index} className="mb-6">
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
      </div>
    </div>
  );
};
