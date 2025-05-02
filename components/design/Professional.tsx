import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
} from "lucide-react";
import { TemplateProps } from "@/types/resume";
import { cn } from "@/lib/utils";
import { LayoutRenderer } from "./BaseTemplate";
import { SectionType } from "@/state/layout-store";

// Local components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <h2 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3 text-gray-900">
      {title}
    </h2>
    <div>{children}</div>
  </div>
);

const ContactItem = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <div className="text-gray-500">{icon}</div>
    <span className="text-gray-700">{children}</span>
  </div>
);

const Professional: React.FC<TemplateProps> = (props) => {
  const {
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
  } = props;

  // Function to render each section based on type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "personalDetails":
        return (
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-1 text-gray-900">
              {firstName} {surname}
            </h1>
            <p className="text-xl text-gray-700 mb-3">{profession}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <ContactItem icon={<Phone className="w-4 h-4" />}>
                {phone}
              </ContactItem>
              <ContactItem icon={<Mail className="w-4 h-4" />}>
                {email}
              </ContactItem>
              <ContactItem icon={<Globe className="w-4 h-4" />}>
                {profession}
              </ContactItem>
              <ContactItem icon={<MapPin className="w-4 h-4" />}>
                {city}, {country}{postalCode ? `, ${postalCode}` : ''}
              </ContactItem>
            </div>
          </div>
        );

      case "summary":
        return summary ? (
          <Section title="Professional Summary">
            <p className="text-gray-700">{summary}</p>
          </Section>
        ) : null;

      case "workHistory":
        return workHistory && workHistory.length > 0 ? (
          <Section title="Work Experience">
            <div className="space-y-5">
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
                    <p className="text-gray-600">
                      {job.startDate.month} {job.startDate.year} - {" "}
                      {job.endDate.current ? "Present" : `${job.endDate.month} ${job.endDate.year}`}
                    </p>
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
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <Section title="Education">
            <div className="space-y-4">
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
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700 block">
                  • {skill}
                </span>
              ))}
            </div>
          </Section>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <Section title="Languages">
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{language.name}</span>
                  <span className="text-gray-600">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </Section>
        ) : null;

      case "achievements":
        return achievements && achievements.length > 0 ? (
          <Section title="Achievements">
            <div className="space-y-4">
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
        ) : null;

      default:
        return null;
    }
  };

  return (
    <LayoutRenderer data={props}>
      {({ mainSections, sidebarSections }) => (
        <div className="text-black bg-white w-full max-w-[750px] mx-auto p-8">
          {/* Always render personal details at the top */}
          {renderSection("personalDetails")}

          {/* Single column layout - all sections in order */}
          <div className="flex flex-col gap-2">
            {/* Main sections first (excluding personalDetails) */}
            {mainSections
              .filter((section: SectionType) => section !== "personalDetails")
              .map((section: SectionType) => (
                <div key={section}>
                  {renderSection(section)}
                </div>
              ))}

            {/* Sidebar sections after main sections */}
            {sidebarSections.map((section: SectionType) => (
              <div key={section}>
                {renderSection(section)}
              </div>
            ))}
          </div>
        </div>
      )}
    </LayoutRenderer>
  );
};

export default Professional;
