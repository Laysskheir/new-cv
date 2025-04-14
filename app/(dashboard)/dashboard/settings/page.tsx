import { getActiveSessions, getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountSection from "./_sections/account-section";
import SecuritySection from "./_sections/security-section";
import DangerZone from "./_sections/danger-zone";
import { Separator } from "@/components/ui/separator";
import { client as authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session) {
    throw redirect("/sign-in");
  }

  // Get accounts with session token
  const accountsResponse = await authClient.listAccounts({
    fetchOptions: {
      headers: {
        Cookie: headers().get("cookie") || "",
      },
    },
  });

  const accounts = accountsResponse.data || [];

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set account preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:max-w-3xl">
        <AccountSection session={JSON.parse(JSON.stringify(session))} />
        <SecuritySection accounts={accounts} />
        <DangerZone accounts={accounts} />
      </div>
    </div>
  );
}
