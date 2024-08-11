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
    <div className="p-4 text-sm space-y-[var(--section-spacing)] text-[length:var(--font-size)]">
      <header className="text-center mb-6 border-b pb-4">
        <h1 className="text-xl font-bold uppercase mb-1 leading-tight tracking-wide">{`${firstName} ${surname}`}</h1>
        <p className="text-muted-foreground text-sm">{profession}</p>
        <p className="text-muted-foreground text-sm mt-2">
          {phone} • {email} • {city}, {country} {postalCode}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Summary
        </h2>
        <p className="text-muted-foreground">{summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Skills
        </h2>
        <p className="text-muted-foreground">{skills.join(" • ")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Languages
        </h2>
        <p className="text-muted-foreground">
          {languages.map((lang, index) => (
            <span key={index}>
              {lang.name} - {lang.proficiency}
              {index < languages.length - 1 ? " • " : ""}
            </span>
          ))}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Experience
        </h2>
        {workHistory.map((job, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="flex justify-between">
              <h3 className="text-base font-semibold">{job.employer}</h3>
              <span className="text-muted-foreground text-sm">
                {job.location}
                {job.remote ? " (Remote)" : ""}
              </span>
            </div>
            <div className="flex justify-between italic text-muted-foreground text-sm">
              <span>{job.title}</span>
              <span>
                {job.startDate.month} {job.startDate.year} -{" "}
                {job.endDate.current
                  ? "Present"
                  : `${job.endDate.month} ${job.endDate.year}`}
              </span>
            </div>
            <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground space-y-1">
              {job.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Projects
        </h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <h3 className="text-base font-semibold">{project.name}</h3>
            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
            <p className="italic text-muted-foreground text-sm">
              Technologies: {project.technologies.join(", ")}
            </p>
            <a
              href={project.link}
              className="text-blue-600 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Link
            </a>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2 border-b pb-4">
            <div className="flex justify-between">
              <h3 className="text-base font-semibold">{edu.schoolName}</h3>
              <span className="text-muted-foreground text-sm">
                {edu.schoolLocation}
              </span>
            </div>
            <div className="flex justify-between italic text-muted-foreground text-sm">
              <span>
                {edu.degree} in {edu.fieldOfStudy}
              </span>
              <span>
                {edu.graduationDate.month} {edu.graduationDate.year}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-primary text-center pb-2 mb-2 uppercase tracking-wide">
          Achievements
        </h2>
        {achievements.map((achievement, index) => (
          <div key={index} className="mb-2 border-b pb-4">
            <div className="flex justify-between">
              <h3 className="text-base font-semibold">{achievement.title}</h3>
              <span className="text-muted-foreground text-sm">
                {achievement.date}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              {achievement.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};


