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
    <div className="bg-white text-black w-full max-w-none m-0 p-8 print:p-0 print:m-0">
      {/* Header with elegant spacing */}
      <header className="text-center mb-12 print:mb-8 print:pt-4" style={{ pageBreakInside: 'avoid' }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 print:text-3xl print:text-black">{`${firstName} ${surname}`}</h1>
        <p className="text-xl text-gray-700 mb-6 print:text-lg print:text-black">{profession}</p>
        <div className="flex justify-center gap-6 print:gap-4 print:text-sm">
          <div className="flex items-center text-gray-700 print:text-black">
            <PhoneIcon className="w-4 h-4 mr-2 print:w-3 print:h-3" /> {phone}
          </div>
          <div className="flex items-center text-gray-700 print:text-black">
            <MailIcon className="w-4 h-4 mr-2 print:w-3 print:h-3" /> {email}
          </div>
          <div className="flex items-center text-gray-700 print:text-black">
            <MapPinIcon className="w-4 h-4 mr-2 print:w-3 print:h-3" /> {`${city}, ${country}`}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 print:gap-x-8 print:gap-y-6">
        {/* Left Column */}
        <div className="space-y-8 print:space-y-6">
          <ProfileSummarySection summary={summary} />
          <WorkExperienceSection workHistory={workHistory} />
          <ProjectsSection projects={projects} />
        </div>

        {/* Right Column */}
        <div className="space-y-8 print:space-y-6">
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

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center mb-4 print:mb-3">
    <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 print:w-6 print:h-6 print:bg-black">
      <span className="font-bold text-sm print:text-xs">{icon}</span>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 print:text-lg print:text-black">{title}</h2>
  </div>
);

const ProfileSummarySection = ({ summary }: { summary: string }) => (
  <section style={{ pageBreakInside: 'avoid' }}>
    <SectionTitle icon="P" title="Professional Summary" />
    <p className="text-gray-700 leading-relaxed" style={{ color: '#374151', lineHeight: '1.625' }}>{summary}</p>
  </section>
);

const WorkExperienceSection = ({
  workHistory,
}: {
  workHistory: TemplateProps["workHistory"];
}) => (
  <section>
    <SectionTitle icon="W" title="Professional Experience" />
    <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {workHistory.map((work, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
          style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1.5rem', pageBreakInside: 'avoid' }}
        >
          <div className="flex justify-between items-start mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                {work.title}
              </h3>
              <p className="text-gray-700" style={{ color: '#374151' }}>{work.employer}</p>
            </div>
            <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4B5563' }}>
              {work.startDate.month} {work.startDate.year} -{" "}
              {work.endDate.current
                ? "Present"
                : `${work.endDate.month} ${work.endDate.year}`}
            </p>
          </div>
          <ul className="mt-3 space-y-2" style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {work.description.map((desc, descIndex) => (
              <li
                key={descIndex}
                className="text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0"
                style={{ color: '#374151', paddingLeft: '1rem', position: 'relative' }}
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
  <section style={{ pageBreakInside: 'avoid' }}>
    <SectionTitle icon="E" title="Education" />
    <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {education.map((edu, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem' }}
        >
          <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                {edu.degree}
              </h3>
              <p className="text-gray-700" style={{ color: '#374151' }}>{edu.schoolName}</p>
            </div>
            <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4B5563' }}>
              {edu.graduationDate.month} {edu.graduationDate.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SkillsSection = ({ skills }: { skills: TemplateProps["skills"] }) => (
  <section style={{ pageBreakInside: 'avoid' }}>
    <SectionTitle icon="S" title="Skills" />
    <div className="grid grid-cols-2 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
      {skills.map((skill, index) => (
        <p key={index} className="text-gray-700" style={{ color: '#374151' }}>
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
  <section style={{ pageBreakInside: 'avoid' }}>
    <SectionTitle icon="L" title="Languages" />
    <div className="grid grid-cols-2 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
      {languages.map((language, index) => (
        <p key={index} className="text-gray-700" style={{ color: '#374151' }}>
          {language.name}{" "}
          <span className="text-gray-600" style={{ color: '#4B5563' }}>({language.proficiency})</span>
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
    <section style={{ pageBreakInside: 'avoid' }}>
      <SectionTitle icon="P" title="Projects" />
      <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem' }}
          >
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
              {project.name}
            </h3>
            <p className="text-gray-700 mb-2" style={{ color: '#374151', marginBottom: '0.5rem' }}>{project.description}</p>
            {project.technologies && (
              <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4B5563' }}>
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
  <section style={{ pageBreakInside: 'avoid' }}>
    <SectionTitle icon="A" title="Achievements" />
    <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem' }}
        >
          <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
              {achievement.title}
            </h3>
            <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4B5563' }}>{achievement.date}</p>
          </div>
          <p className="text-gray-700" style={{ color: '#374151' }}>{achievement.description}</p>
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
  <section style={{ pageBreakInside: 'avoid' }}>
    {customSections.map((section, index) => (
      <div key={index} className="mb-6 last:mb-0" style={{ marginBottom: '1.5rem' }}>
        <SectionTitle icon="C" title={section.title} />
        <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0" style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem' }}>
          <p className="text-gray-700 mb-2" style={{ color: '#374151', marginBottom: '0.5rem' }}>{section.description}</p>
          <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4B5563' }}>
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

export default Stylish;
