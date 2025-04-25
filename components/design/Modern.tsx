import React from "react";
import { PhoneIcon, MailIcon, GlobeIcon, LocateIcon } from "lucide-react";
import { BaseTemplate, Section, ContactItem, DateRange } from "./BaseTemplate";
import { TemplateProps } from "@/types/resume";

const Modern: React.FC<TemplateProps> = ({
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
    <div className="bg-white w-full max-w-none m-0 p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Left Column - Contact & Skills */}
        <div className="col-span-4 bg-gray-50 p-8 border-r border-gray-200 h-full">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-gray-900">
              {firstName} {surname}
            </h1>
            <p className="text-gray-700 font-medium">{profession}</p>
          </header>

          <Section title="CONTACT" className="mb-8">
            <div className="space-y-2 text-gray-700">
              <ContactItem
                icon={<PhoneIcon className="w-4 h-4 text-gray-600" />}
              >
                {phone}
              </ContactItem>
              <ContactItem
                icon={<MailIcon className="w-4 h-4 text-gray-600" />}
              >
                {email}
              </ContactItem>
              <ContactItem
                icon={<LocateIcon className="w-4 h-4 text-gray-600" />}
              >
                {city}, {country}
              </ContactItem>
            </div>
          </Section>

          <Section title="SKILLS" className="mb-8">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700 block">
                  • {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="LANGUAGES" className="mb-8">
            <div className="space-y-1">
              {languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{language.name}</span>
                  <span className="text-gray-600">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right Column - Experience & Education */}
        <div className="col-span-8 p-8 bg-white">
          <Section title="WORK EXPERIENCE" className="mb-8">
            <div className="space-y-6">
              {workHistory.map((job, index) => (
                <div key={index} className="relative">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-700">
                      {job.employer}, {job.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {job.startDate.month} {job.startDate.year} -{" "}
                      {job.endDate.current
                        ? "Present"
                        : `${job.endDate.month} ${job.endDate.year}`}
                    </p>
                  </div>
                  <ul className="list-disc text-gray-700 pl-4 space-y-1">
                    {job.description.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="EDUCATION" className="mb-8">
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-700">{edu.schoolName}</p>
                  <p className="text-gray-600">
                    {edu.graduationDate.month} {edu.graduationDate.year}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="ACHIEVEMENTS">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.date}</p>
                  <p className="text-gray-700 mt-1">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Modern;
