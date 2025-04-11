import MobileSidebar from "./_components/mobile-sidebar";
import { Sidebar } from "./_components/sidebar";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[280px] lg:flex-col border-r border-border/40">
        <div className="h-full p-4">
          {session && <Sidebar session={session} />}
        </div>
      </div>

      <main className="mx-4 my-4 sm:mx-6 md:mx-8 lg:pl-[280px] transition-all duration-300">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
