import React from "react";
import { PhoneIcon, MailIcon, GlobeIcon, LocateIcon } from "lucide-react";
import { BaseTemplate, Section, ContactItem, DateRange } from "./BaseTemplate";
import { TemplateProps } from "@/types/resume";

const ElegantClassic: React.FC<TemplateProps> = ({
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
}) => {
  return (
    <BaseTemplate className="bg-white w-full max-w-none m-0 p-8">
      {/* Elegant Header with subtle border */}
      <header className="text-center border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          {firstName} {surname}
        </h1>
        <p className="text-xl text-gray-700 mb-4">{profession}</p>
        <div className="flex justify-center gap-6 text-gray-700 text-sm">
          <div className="flex items-center">
            <PhoneIcon className="w-4 h-4 mr-2 text-gray-600" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center">
            <MailIcon className="w-4 h-4 mr-2 text-gray-600" />
            <span>{email}</span>
          </div>
          <div className="flex items-center">
            <LocateIcon className="w-4 h-4 mr-2 text-gray-600" />
            <span>{`${city}, ${country}`}</span>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <Section title="Professional Summary" className="mb-8">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </Section>

      {/* Work Experience - Most important section first */}
      <Section title="Professional Experience" className="mb-8">
        <div className="space-y-6">
          {workHistory?.map((job, index) => (
            <div key={index} className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-700">{job.employer}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {job.startDate.month} {job.startDate.year} -{" "}
                  {job.endDate.current
                    ? "Present"
                    : `${job.endDate.month} ${job.endDate.year}`}
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-2">{job.location}</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {job.description.map((responsibility, idx) => (
                  <li key={idx} className="text-sm">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education" className="mb-8">
        <div className="space-y-4">
          {education?.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-gray-700">{edu.schoolName}</p>
              </div>
              <p className="text-sm text-gray-600">
                {edu.graduationDate.month} {edu.graduationDate.year}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills - Two column layout for better scanning */}
      <Section title="Skills" className="mb-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {skills.map((skill, index) => (
            <p key={index} className="text-sm text-gray-700">
              • {skill}
            </p>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title="Languages" className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {languages.map((language, index) => (
            <p key={index} className="text-sm text-gray-700">
              {language.name} -{" "}
              <span className="text-gray-600">{language.proficiency}</span>
            </p>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section title="Achievements" className="mb-8">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">{achievement.date}</p>
              </div>
              <p className="text-sm text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </BaseTemplate>
  );
};

export default ElegantClassic;
