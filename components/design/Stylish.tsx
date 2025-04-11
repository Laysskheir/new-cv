import React from 'react';
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
        <div className="p-4 space-y-[var(--section-spacing)] text-[length:var(--font-size)]">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold">{`${firstName} ${surname}`}</h1>
                <p className="text-lg text-gray-600">{profession}</p>
            </div>

            {/* Body Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Contact, Education, Skills, Languages */}
                <div className="space-y-8">
                    <ContactSection phone={phone} email={email} city={city} country={country} postalCode={postalCode} />
                    <EducationSection education={education} />
                    <SkillsSection skills={skills} />
                    <LanguagesSection languages={languages} />
                </div>

                {/* Right Column: Profile Summary, Work Experience */}
                <div className="space-y-8">
                    <ProfileSummarySection summary={summary} />
                    <WorkExperienceSection workHistory={workHistory} />
                    <AchievementsSection achievements={achievements} />
                    <CustomSectionsSection customSections={customSections} />
                </div>
            </div>
        </div>
    );
};

export default Stylish;

const ContactSection = ({ phone, email, city, country, postalCode }: { phone: string; email: string; city: string; country: string; postalCode: string }) => (
    <section>
        <SectionTitle icon="C" title="Contact" />
        <div className="space-y-2 text-sm">
            <div className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2" /> {phone}</div>
            <div className="flex items-center"><MailIcon className="w-4 h-4 mr-2" /> {email}</div>
            <div className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2" /> {`${city}, ${country}, ${postalCode}`}</div>
        </div>
    </section>
);

const EducationSection = ({ education }: { education: TemplateProps['education'] }) => (
    <section>
        <SectionTitle icon="E" title="Education" />
        {education.map((edu, index) => (
            <div key={index} className="mb-2">
                <h3 className="font-semibold">{edu.schoolName}</h3>
                <p className="text-sm">{edu.degree}</p>
                <p className="text-sm">{`${edu.graduationDate.month} ${edu.graduationDate.year}`}</p>
            </div>
        ))}
    </section>
);

const SkillsSection = ({ skills }: { skills: TemplateProps['skills'] }) => (
    <section>
        <SectionTitle icon="S" title="Skills" />
        <ul className="list-disc list-inside text-sm">
            {skills.map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
    </section>
);

const LanguagesSection = ({ languages }: { languages: TemplateProps['languages'] }) => (
    <section>
        <SectionTitle icon="L" title="Languages" />
        <ul className="list-disc list-inside text-sm">
            {languages.map((language, index) => (
                <li key={index}>{`${language.name} (${language.proficiency})`}</li> // Updated to render name and proficiency
            ))}
        </ul>
    </section>
);

const ProfileSummarySection = ({ summary }: { summary: string }) => (
    <section>
        <SectionTitle icon="P" title="Profile Summary" />
        <p className="text-sm">{summary}</p>
    </section>
);

const WorkExperienceSection = ({ workHistory }: { workHistory: TemplateProps['workHistory'] }) => (
    <section>
        <SectionTitle icon="W" title="Work Experience" />
        {workHistory.map((work, index) => (
            <div key={index} className="mb-4">
                <h3 className="font-semibold">{work.title}</h3>
                <p className="text-sm text-gray-600">{work.employer} ({work.startDate.month} {work.startDate.year} - {work.endDate.current ? "Present" : `${work.endDate.month} ${work.endDate.year}`})</p>
                <ul className="list-disc list-inside text-sm mt-2">
                    {work.description.map((desc, descIndex) => <li key={descIndex}>{desc}</li>)}
                </ul>
            </div>
        ))}
    </section>
);

const AchievementsSection = ({ achievements }: { achievements: TemplateProps['achievements'] }) => (
    <section>
        <SectionTitle icon="A" title="Achievements" />
        <ul className="list-disc list-inside text-sm">
            {achievements.map((achievement, index) => (
                <li key={index}>
                    <strong>{achievement.title}</strong>: {achievement.description} ({achievement.date})
                </li>
            ))}
        </ul>
    </section>
);

const CustomSectionsSection = ({ customSections }: { customSections: TemplateProps['customSections'] }) => (
    <section>
        {customSections.map((section, index) => (
            <div key={index} className="mb-2">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm">{section.description}</p>
                <p className="text-sm">{`${section.startDate.month} ${section.startDate.year} - ${section.endDate.current ? "Present" : `${section.endDate.month} ${section.endDate.year}`}`}</p>
            </div>
        ))}
    </section>
);

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
    <div className="flex items-center mb-4">
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="font-bold">{icon}</span>
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
    </div>
);
