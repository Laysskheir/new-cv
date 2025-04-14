import React from "react";
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  LocateIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  LanguagesIcon,
} from "lucide-react";
import { BaseTemplate, Section, ContactItem, DateRange } from "./BaseTemplate";
import { TemplateProps } from "@/types/resume";
import { cn } from "@/lib/utils";

const Professional: React.FC<TemplateProps> = ({
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gray-900">
          {firstName} {surname}
        </h1>
        <p className="text-xl text-gray-700 mb-4">{profession}</p>
        <p className="text-gray-700 max-w-2xl">{summary}</p>
      </div>

      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          <Section title="Contact">
            <div className="space-y-3">
              <ContactItem icon={<PhoneIcon className="w-4 h-4" />}>
                {phone}
              </ContactItem>
              <ContactItem icon={<MailIcon className="w-4 h-4" />}>
                {email}
              </ContactItem>
              <ContactItem icon={<GlobeIcon className="w-4 h-4" />}>
                {profession}
              </ContactItem>
              <ContactItem icon={<LocateIcon className="w-4 h-4" />}>
                {city}, {country}, {postalCode}
              </ContactItem>
            </div>
          </Section>

          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700 block">
                  • {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Languages">
            <div className="space-y-2">
              {languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{language.name}</span>
                  <span className="text-gray-600">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          <Section title="Work Experience">
            <div className="space-y-6">
              {workHistory.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-700">
                        {job.employer} | {job.location}
                      </p>
                    </div>
                    <DateRange
                      startDate={job.startDate}
                      endDate={job.endDate}
                    />
                  </div>
                  <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-2">
                    {job.description.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700">{edu.schoolName}</p>
                    </div>
                    <p className="text-gray-600">
                      {edu.graduationDate.month} {edu.graduationDate.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Achievements">
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-700">{achievement.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Professional;
