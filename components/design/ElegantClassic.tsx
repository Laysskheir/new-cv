import React from "react";
import { PhoneIcon, MailIcon, GlobeIcon, LocateIcon } from "lucide-react";
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
      <div className="max-w-2xl mx-auto px-4 space-y-[var(--section-spacing)] text-[length:var(--font-size)]">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-xl font-bold mb-1 leading-tight tracking-wide">
            {firstName} {surname}
          </h1>
          <p className="text-muted-foreground text-sm">{profession}</p>
          <p className="text-muted-foreground text-sm mt-2">{summary}</p>
        </header>

        <section className="mb-6">
          <h2 className="font-semibold mb-2 uppercase tracking-wide">
            Contact
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-4 h-4" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-4 h-4" />
              <span>{profession}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocateIcon className="w-4 h-4" />
              <span>
                {city}, {country}, {postalCode}
              </span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-2 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-6">
            {workHistory.map((job, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-base font-semibold">{job.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {job.employer} | {job.location} | {job.startDate.month}{" "}
                  {job.startDate.year} -{" "}
                  {job.endDate.current
                    ? "Present"
                    : `${job.endDate.month} ${job.endDate.year}`}
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground space-y-1">
                  {job.description.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-4 uppercase tracking-wide">Education</h2>
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
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-2 uppercase tracking-wide">
            Achievements
          </h2>
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
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-4 uppercase tracking-wide">Skills</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm list-disc pl-6">
            {skills.map((skill, index) => (
              <li key={index} className="mt-1">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-4 uppercase tracking-wide">Languages</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {languages.map((language, index) => (
              <p key={index}>
                {language.name} - {language.proficiency}
              </p>
            ))}
          </div>
        </section>
      </div>
  );
};



export default ElegantClassic;