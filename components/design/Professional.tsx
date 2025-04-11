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
    <BaseTemplate className="bg-white">
      {/* Header with accent bar */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
        <div className="pl-6">
          <h1 className="text-3xl font-bold mb-1">
            {firstName} <span className="text-primary">{surname}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4">{profession}</p>
          <p className="text-muted-foreground max-w-2xl">{summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          <Section title="Contact" className="bg-muted/30 p-4 rounded-lg">
            <div className="space-y-3">
              <ContactItem
                icon={<PhoneIcon className="w-4 h-4 text-primary" />}
              >
                {phone}
              </ContactItem>
              <ContactItem icon={<MailIcon className="w-4 h-4 text-primary" />}>
                {email}
              </ContactItem>
              <ContactItem
                icon={<GlobeIcon className="w-4 h-4 text-primary" />}
              >
                {profession}
              </ContactItem>
              <ContactItem
                icon={<LocateIcon className="w-4 h-4 text-primary" />}
              >
                {city}, {country}, {postalCode}
              </ContactItem>
            </div>
          </Section>

          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Languages">
            <div className="space-y-2">
              {languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {language.proficiency}
                  </span>
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
                <div
                  key={index}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-primary font-medium">
                        {job.employer} | {job.location}
                      </p>
                    </div>
                    <DateRange
                      startDate={job.startDate}
                      endDate={job.endDate}
                    />
                  </div>
                  <ul className="list-disc pl-6 mt-3 text-muted-foreground space-y-2">
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
                <div
                  key={index}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-primary font-medium">
                        {edu.schoolName}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm">
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
                <div
                  key={index}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {achievement.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
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
