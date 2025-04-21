"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, Trash2 } from "lucide-react";
import { client as authClient } from "@/lib/auth-client";
import { PasswordInput } from "@/components/ui/password-input";

export default function DangerZone(props: { accounts: any[] }) {
  const { accounts } = props;
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Check if user is using OAuth
  const isOAuthUser = !accounts.some((account) => account.provider === "email");

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "delete") {
      toast({
        description: "Please type 'delete' to confirm",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      if (isOAuthUser) {
        // For OAuth users, we don't need a password
        await authClient.deleteUser({
          callbackURL: "/",
        });
      } else {
        // For email/password users, require password
        await authClient.deleteUser({
          password,
          callbackURL: "/",
        });
      }
      toast({
        description:
          "Account deletion process initiated. Check your email for confirmation.",
      });
    } catch (error) {
      toast({
        description: isOAuthUser
          ? "Failed to delete account. Please try again."
          : "Failed to delete account. Please check your password.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isOAuthUser && (
          <div className="space-y-2">
            <Label htmlFor="delete-password">
              Enter your password to confirm
            </Label>
            <PasswordInput
              id="delete-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="max-w-[350px]"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="delete-confirmation">
            Type <span className="font-mono font-medium">delete</span> to
            confirm
          </Label>
          <Input
            id="delete-confirmation"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="Type 'delete' to confirm"
            className="max-w-[350px]"
          />
        </div>
        <Button
          variant="destructive"
          className="gap-2"
          onClick={handleDeleteAccount}
          disabled={
            deleteConfirmation !== "delete" ||
            (!isOAuthUser && !password) ||
            isDeleting
          }
        >
          <Trash2 className="h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      </CardContent>
    </Card>
  );
}
