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
    <BaseTemplate>
      <header className="border-b pb-4 mb-6">
        <h1 className="text-xl font-bold mb-1 leading-tight tracking-wide">
          {firstName} {surname}
        </h1>
        <p className="text-muted-foreground text-sm">{profession}</p>
        <p className="text-muted-foreground text-sm mt-2">{summary}</p>
      </header>

      <Section title="Contact">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
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

      <Section title="Work Experience">
        <div className="space-y-6">
          {workHistory.map((job, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-base font-semibold">{job.title}</h3>
              <p className="text-muted-foreground text-sm">
                {job.employer} | {job.location}
              </p>
              <DateRange startDate={job.startDate} endDate={job.endDate} />
              <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground space-y-1">
                {job.description.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div>
          {education.map((edu, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-base font-semibold">{edu.degree}</h3>
              <p className="text-muted-foreground text-sm">
                {edu.schoolName} | {edu.graduationDate.month}{" "}
                {edu.graduationDate.year}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Achievements">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-base font-semibold">{achievement.title}</h3>
              <p className="text-muted-foreground text-sm">
                {achievement.date}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <ul className="grid grid-cols-2 gap-2 text-sm list-disc pl-6">
          {skills.map((skill, index) => (
            <li key={index} className="mt-1">
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Languages">
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {languages.map((language, index) => (
            <p key={index}>
              {language.name} - {language.proficiency}
            </p>
          ))}
        </div>
      </Section>
    </BaseTemplate>
  );
};

export default ElegantClassic;
