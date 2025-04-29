import React from "react";
import { TemplateProps } from "../../types/resume";
import { cn } from "@/lib/utils";

const Minimal: React.FC<TemplateProps> = ({
    firstName,
    surname,
    profession,
    city,
    country,
    phone,
    email,
    workHistory,
    education,
    projects,
    skills,
    summary,
}) => {
    return (
        <div className="w-full max-w-none m-0 p-8 text-black bg-white" >
            {/* Header */}
            <header className="mb-8 border-b pb-4" style={{ pageBreakInside: 'avoid' }}>
                <h1 className="text-2xl font-semibold mb-2">{`${firstName} ${surname}`}</h1>
                <p className="text-gray-600 mb-4">{profession}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                    <span>{phone}</span>
                    <span>•</span>
                    <span>{email}</span>
                    <span>•</span>
                    <span>{`${city}, ${country}`}</span>
                </div>
            </header>

            {/* Professional Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm mr-2">1</span>
                        Professional Summary
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{summary}</p>
                </section>
            )}

            {/* Professional Experience */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm mr-2">2</span>
                    Professional Experience
                </h2>
                <div className="space-y-6">
                    {workHistory.map((work, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold">{work.title}</h3>
                                    <p className="text-gray-600">{work.employer}</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {work.startDate.month} {work.startDate.year} - {" "}
                                    {work.endDate.current ? "Present" : `${work.endDate.month} ${work.endDate.year}`}
                                </p>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                {work.description.map((desc, descIndex) => (
                                    <li key={descIndex}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm mr-2">3</span>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div key={index} className="border-b pb-4 last:border-0">
                                <h3 className="font-semibold mb-2">{project.name}</h3>
                                <p className="text-gray-600 mb-2">{project.description}</p>
                                {project.technologies && (
                                    <p className="text-sm text-gray-500">
                                        Technologies: {project.technologies.join(", ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm mr-2">4</span>
                    Education
                </h2>
                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <div key={index} className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.schoolName}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                                {edu.graduationDate.month} {edu.graduationDate.year}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm mr-2">5</span>
                    Skills
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, index) => (
                        <div key={index} className="text-gray-600">
                            • {skill}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Minimal; 