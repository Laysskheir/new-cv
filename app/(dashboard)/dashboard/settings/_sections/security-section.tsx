"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import {
  LogOut,
  KeyRound,
  AlertCircle,
  TriangleAlert,
  Loader,
} from "lucide-react";
import { signOut, client as authClient } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { redirect } from "next/navigation";

export default function SecuritySection(props: { accounts: any[] }) {
  const { accounts } = props;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(false);
  const { toast } = useToast();

  // Check if user is using OAuth
  const isOAuthUser = !accounts.some((account) => account.provider === "email");

  // Get the provider name
  const providerName = accounts[0]?.provider || "Unknown";

  const handlePasswordChange = async () => {
    if (newPassword.length < 8) {
      toast({
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsChangingPassword(true);
      await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
      });
      toast({
        description: "Password updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setRevokeOtherSessions(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Failed to update password. Please check your current password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      toast({
        description: "Logged out successfully",
      });
      redirect("/");
    } catch (error) {
      toast({
        description: "Failed to logout",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          <CardTitle>Security</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your account security settings and sessions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Change Section */}
        {!isOAuthUser ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Password</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePasswordChange}
                disabled={
                  isChangingPassword || !currentPassword || !newPassword
                }
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </Button>
            </div>

            <div className="rounded-md border border-amber-500/50 px-4 py-3 text-amber-600">
              <p className="text-sm">
                <TriangleAlert
                  className="me-3 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Choose a strong password that's at least 8 characters long.
              </p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <PasswordInput
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="revoke-sessions"
                  checked={revokeOtherSessions}
                  onCheckedChange={(checked) =>
                    setRevokeOtherSessions(checked as boolean)
                  }
                />
                <Label
                  htmlFor="revoke-sessions"
                  className="text-sm font-normal"
                >
                  Sign out from other devices
                </Label>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-amber-500/50 px-4 py-3 text-amber-600">
            <p className="text-sm">
              <TriangleAlert
                className="me-3 -mt-0.5 inline-flex opacity-60"
                size={16}
                aria-hidden="true"
              />
              You signed in with{" "}
              <span className="font-bold">{providerName.toUpperCase()}</span>.
              Password management is not available for OAuth accounts.
            </p>
          </div>
        )}

        <Separator />

        {/* Session Management Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Active Session</h3>
              <p className="text-sm text-muted-foreground">
                Manage your current session and sign out if needed
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="gap-2"
            >
              {isLoggingOut ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
