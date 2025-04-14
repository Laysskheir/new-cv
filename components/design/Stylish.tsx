import React from "react";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { TemplateProps } from "../../types/resume";

const Stylish: React.FC<TemplateProps> = ({
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
  customSections,
  languages,
}) => {
  return (
    <div className="bg-white w-full max-w-none m-0 p-8">
      {/* Header with elegant spacing */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{`${firstName} ${surname}`}</h1>
        <p className="text-xl text-gray-700 mb-6">{profession}</p>
        <div className="flex justify-center gap-6">
          <div className="flex items-center text-gray-700">
            <PhoneIcon className="w-4 h-4 mr-2" /> {phone}
          </div>
          <div className="flex items-center text-gray-700">
            <MailIcon className="w-4 h-4 mr-2" /> {email}
          </div>
          <div className="flex items-center text-gray-700">
            <MapPinIcon className="w-4 h-4 mr-2" /> {`${city}, ${country}`}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div className="space-y-8">
          <ProfileSummarySection summary={summary} />
          <WorkExperienceSection workHistory={workHistory} />
          <ProjectsSection projects={projects} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <EducationSection education={education} />
          <SkillsSection skills={skills} />
          <LanguagesSection languages={languages} />
          <AchievementsSection achievements={achievements} />
          {customSections && customSections.length > 0 && (
            <CustomSectionsSection customSections={customSections} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stylish;

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center mb-4">
    <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
      <span className="font-bold text-sm">{icon}</span>
    </div>
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
  </div>
);

const ProfileSummarySection = ({ summary }: { summary: string }) => (
  <section>
    <SectionTitle icon="P" title="Professional Summary" />
    <p className="text-gray-700 leading-relaxed">{summary}</p>
  </section>
);

const WorkExperienceSection = ({
  workHistory,
}: {
  workHistory: TemplateProps["workHistory"];
}) => (
  <section>
    <SectionTitle icon="W" title="Professional Experience" />
    <div className="space-y-6">
      {workHistory.map((work, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {work.title}
              </h3>
              <p className="text-gray-700">{work.employer}</p>
            </div>
            <p className="text-sm text-gray-600">
              {work.startDate.month} {work.startDate.year} -{" "}
              {work.endDate.current
                ? "Present"
                : `${work.endDate.month} ${work.endDate.year}`}
            </p>
          </div>
          <ul className="mt-3 space-y-2">
            {work.description.map((desc, descIndex) => (
              <li
                key={descIndex}
                className="text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0"
              >
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const EducationSection = ({
  education,
}: {
  education: TemplateProps["education"];
}) => (
  <section>
    <SectionTitle icon="E" title="Education" />
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
        >
          <div className="flex justify-between items-start">
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
        </div>
      ))}
    </div>
  </section>
);

const SkillsSection = ({ skills }: { skills: TemplateProps["skills"] }) => (
  <section>
    <SectionTitle icon="S" title="Skills" />
    <div className="grid grid-cols-2 gap-2">
      {skills.map((skill, index) => (
        <p key={index} className="text-gray-700">
          • {skill}
        </p>
      ))}
    </div>
  </section>
);

const LanguagesSection = ({
  languages,
}: {
  languages: TemplateProps["languages"];
}) => (
  <section>
    <SectionTitle icon="L" title="Languages" />
    <div className="grid grid-cols-2 gap-2">
      {languages.map((language, index) => (
        <p key={index} className="text-gray-700">
          {language.name}{" "}
          <span className="text-gray-600">({language.proficiency})</span>
        </p>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({
  projects,
}: {
  projects?: TemplateProps["projects"];
}) => {
  if (!projects?.length) return null;
  return (
    <section>
      <SectionTitle icon="P" title="Projects" />
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {project.name}
            </h3>
            <p className="text-gray-700 mb-2">{project.description}</p>
            {project.technologies && (
              <p className="text-sm text-gray-600">
                Technologies: {project.technologies.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const AchievementsSection = ({
  achievements,
}: {
  achievements: TemplateProps["achievements"];
}) => (
  <section>
    <SectionTitle icon="A" title="Achievements" />
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              {achievement.title}
            </h3>
            <p className="text-sm text-gray-600">{achievement.date}</p>
          </div>
          <p className="text-gray-700">{achievement.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const CustomSectionsSection = ({
  customSections,
}: {
  customSections: TemplateProps["customSections"];
}) => (
  <section>
    {customSections.map((section, index) => (
      <div key={index} className="mb-6 last:mb-0">
        <SectionTitle icon="C" title={section.title} />
        <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <p className="text-gray-700 mb-2">{section.description}</p>
          <p className="text-sm text-gray-600">
            {section.startDate.month} {section.startDate.year} -{" "}
            {section.endDate.current
              ? "Present"
              : `${section.endDate.month} ${section.endDate.year}`}
          </p>
        </div>
      </div>
    ))}
  </section>
);
