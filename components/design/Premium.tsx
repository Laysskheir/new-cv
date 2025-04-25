import React from 'react';
import { TemplateProps } from '@/types/resume';

const Premium: React.FC<TemplateProps> = ({
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
        <div className="max-w-[850px] mx-auto  text-black p-8 ">
            {/* Header Section */}
            <header className="flex items-start gap-6 mb-6">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{`${firstName} ${surname}`}</h1>
                    <p className="text-xl text-gray-600 mt-1">{profession}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <LocationIcon className="w-4 h-4" />
                            {city}, {country} {postalCode}
                        </span>
                        <span className="flex items-center gap-1">
                            <PhoneIcon className="w-4 h-4" />
                            {phone}
                        </span>
                        <span className="flex items-center gap-1">
                            <EmailIcon className="w-4 h-4" />
                            {email}
                        </span>
                    </div>
                </div>
            </header>

            {/* Summary Section */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Summary</h2>
                    <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                </section>
            )}

            {/* Experience Section */}
            {workHistory && workHistory.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Experience</h2>
                    {workHistory.map((work, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{work.title}</h3>
                                    <p className="text-gray-600">{work.employer}</p>
                                    <p className="text-gray-600">{work.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600">
                                        {work.startDate.month} {work.startDate.year} to{' '}
                                        {work.endDate.current
                                            ? 'Present'
                                            : `${work.endDate.month} ${work.endDate.year}`}
                                    </p>
                                </div>
                            </div>
                            {Array.isArray(work.description) && (
                                <ul className="list-disc list-inside mt-2 text-gray-700">
                                    {work.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {typeof work.description === 'string' && (
                                <p className="mt-2 text-gray-700">{work.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education Section */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{edu.schoolName}</h3>
                                    <p className="text-gray-600">{edu.degree}</p>
                                    <p className="text-gray-600">{edu.fieldOfStudy}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600">
                                        {edu.graduationDate.month} {edu.graduationDate.year}
                                    </p>
                                    <p className="text-gray-600">{edu.schoolLocation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements Section */}
            {achievements && achievements.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Achievements</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{achievement.title}</h3>
                                    <p className="text-gray-600">{achievement.description}</p>
                                </div>
                                <p className="text-gray-600">{achievement.date}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages Section */}
            {languages && languages.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Languages</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {languages.map((language, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="font-medium">{language.name}</span>
                                <span className="text-gray-600">{language.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// Icon components
const LocationIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export default Premium;
