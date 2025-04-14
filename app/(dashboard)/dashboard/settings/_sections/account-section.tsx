"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "@/lib/auth-types";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Check, X, CheckIcon, XIcon } from "lucide-react";
import { client as authClient } from "@/lib/auth-client";

export default function AccountSection({
  session,
}: {
  session: Session | null;
}) {
  const [name, setName] = useState(session?.user.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await authClient.updateUser({
        name,
      });
      setIsEditing(false);
      toast({
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Account</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account information
            </p>
          </div>
          <Button
            variant={isEditing ? "ghost" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isUpdating}
          >
            {isEditing ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Pencil className="h-4 w-4 mr-2" />
            )}
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session?.user.image || ""} />
              <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Label>Profile Picture</Label>
              <Input
                value={session?.user.image || ""}
                readOnly
                className="max-w-[350px]"
                disabled
              />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-[350px]"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button size="sm" onClick={handleSave} disabled={isUpdating}>
                    <Check className="h-4 w-4 mr-2" />
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  value={session?.user.email}
                  readOnly
                  className="max-w-[350px]"
                />
                <div className="flex items-center gap-1.5">
                  {session?.user.emailVerified ? (
                    <div className="flex items-center gap-1 px-2 py-1">
                      <CheckIcon
                        className="text-emerald-500"
                        size={12}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-emerald-500">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-50 dark:bg-red-950/20">
                      <XIcon
                        className="text-red-500"
                        size={12}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-red-500/text-emerald-500">
                        Unverified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
