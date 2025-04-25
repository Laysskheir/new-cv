import { getResumeById } from "@/actions/resume/getResumeById";
import dynamic from "next/dynamic";
import { cache } from "react";

// Cache the resume fetch to prevent unnecessary refetches
const getCachedResume = cache(async (resumeId: string) => {
    return getResumeById(resumeId);
});

export default async function ResumeTitleProvider({
    resumeId,
    children,
}: {
    resumeId: string;
    children: React.ReactNode;
}) {
    let resumeTitle = "Untitled Resume";

    try {
        const result = await getCachedResume(resumeId);
        if (result.success && result.resume) {
            resumeTitle = result.resume.title;
        }
    } catch (error) {
        console.error("Error fetching resume:", error);
    }

    const DynamicComponentWithNoSSR = dynamic(
        () => import("@/components/layouts/navbar"),
        { ssr: false }
    );

    return (
        <>
            <DynamicComponentWithNoSSR resumeTitle={resumeTitle} />
            {children}
        </>
    );
} 