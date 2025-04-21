import { ScrollArea } from "@/components/ui/scroll-area";
import { GridView } from "./_components/grid";
import { getServerSession } from "@/lib/auth";
import { getAllResumes } from "@/actions/resume/getAllResumes";

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
    <>
      <title>Resumes</title>

      <div className="space-y-4">
        <GridView resumes={resumes || []} />
      </div>
    </>
  );
}
