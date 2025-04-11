import { getActiveSessions, getServerSession } from "@/lib/auth";
import UserCard from "./_sections/user-card";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession();
  const activeSessions = await getActiveSessions();

  if (!session) {
    throw redirect("/sign-in");
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col">
        <UserCard session={JSON.parse(JSON.stringify(session))} />
      </div>
    </div>
  );
}
