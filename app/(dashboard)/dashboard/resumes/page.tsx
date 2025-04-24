
import { getServerSession } from "@/lib/auth";
import { getAllResumes } from "@/actions/resume/getAllResumes";
import { Suspense } from "react";
import { ResumeView } from "./_components/resume-view";
export default async function ResumesPage() {
  const session = await getServerSession();

  if (!session || !session.user?.id) {
    return <div>Please log in to view your resumes.</div>;
  }

  const { success, resumes, error } = await getAllResumes(session.user.id);

  if (!success) {
    return <div>Error fetching resumes: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ResumeView initialResumes={resumes || []} />
      </Suspense>
    </div>
  );
}
