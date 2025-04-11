import React from "react";
import { TemplateProps } from "../../types/resume";
import { PhoneIcon, MailIcon, GlobeIcon, LocateIcon } from "lucide-react";

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
}) => (
  <div className="h-auto text-sm flex space-y-[var(--section-spacing)] text-[length:var(--font-size)]">
    <div className="w-1/3 bg-[var(--accent)] text-secondary p-8">
      <h1 className="text-xl font-bold mb-4">{`${firstName} ${surname}`}</h1>
      <p className="mb-8 text-secondary/95">{profession}</p>

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">SKILLS</h2>
      <ul className="mb-8 space-y-1 text-secondary/95">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        LANGUAGES
      </h2>
      <ul className="mb-8 space-y-1 text-secondary/95">
        {languages.map((lang, index) => (
          <li key={index}>{`${lang.name} - ${lang.proficiency}`}</li>
        ))}
      </ul>
    </div>

    <div className="w-2/3 p-8">
      <div className="mb-8 text-muted-foreground">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <LocateIcon className="w-4 h-4" />
          <span>{`${city}, ${country}`}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        RESUME PROFILE
      </h2>
      <p className="mb-8 text-muted-foreground">{summary}</p>

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        KEY ACHIEVEMENTS
      </h2>
      {/* Add key achievements content here */}

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        EXPERIENCE
      </h2>
      {workHistory.map((job, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h3 className="font-bold">{job.title}</h3>
          <p className="italic text-muted-foreground">{job.employer}</p>
          <p className="text-muted-foreground">{`${job.startDate.month} ${
            job.startDate.year
          } - ${
            job.endDate.current
              ? "Present"
              : `${job.endDate.month} ${job.endDate.year}`
          }`}</p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            {Array.isArray(job.description) ? (
              job.description.map((desc: string, idx: number) => (
                <li key={idx}>{desc}</li>
              ))
            ) : (
              <li>{job.description}</li>
            )}
          </ul>
        </div>
      ))}

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        EDUCATION
      </h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <h3 className="font-bold">{edu.degree}</h3>
          <p className="text-muted-foreground">{edu.schoolName}</p>
          <p className="text-muted-foreground">{`${edu.graduationDate.month} ${edu.graduationDate.year}`}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
        PROJECTS
      </h2>
      {projects.map((project, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h3 className="font-bold">{project.name}</h3>
          <p className="text-muted-foreground">{project.description}</p>
          <p className="italic text-muted-foreground">
            Technologies: {project.technologies.join(", ")}
          </p>
          <a
            href={project.link}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Link
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Polished;
