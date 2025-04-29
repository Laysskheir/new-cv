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
import axios from "axios";

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

            {/* New Subscription Section */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Subscription Management</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your subscription plan and billing details
              </p>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/dashboard/subscription"}
                >
                  View Subscription
                </Button>

                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      // First, check active subscriptions
                      const { data: subscriptions } = await authClient.subscription.list();
                      console.log("Subscriptions:", subscriptions); // Debug logging

                      // Find active subscription
                      const activeSubscription = subscriptions?.find(
                        sub => (sub.status === "active" || sub.status === "trialing")
                      );

                      console.log("Active subscription:", activeSubscription); // Debug logging

                      if (activeSubscription) {
                        // Check for customer ID
                        const customerId = activeSubscription.stripeCustomerId;

                        if (customerId) {
                          console.log("Found customer ID:", customerId); // Debug logging

                          try {
                            const response = await axios.post('/api/subscription/portal', { customerId });
                            console.log("Portal response:", response.data); // Debug logging

                            if (response.data.url) {
                              window.location.href = response.data.url;
                            } else {
                              throw new Error('No portal URL returned');
                            }
                          } catch (apiError: any) {
                            console.error("API error:", apiError.response?.data || apiError.message);
                            throw new Error(apiError.response?.data?.message || apiError.message || 'Failed to access billing portal');
                          }
                        } else {
                          toast({
                            description: "No billing information found. Going to subscription page instead.",
                            duration: 3000,
                          });
                          // Redirect to subscription page
                          setTimeout(() => {
                            window.location.href = "/dashboard/subscription";
                          }, 1500);
                        }
                      } else {
                        toast({
                          description: "No active subscription found. Redirecting to subscription page.",
                          duration: 3000,
                        });
                        // Redirect to subscription page
                        setTimeout(() => {
                          window.location.href = "/dashboard/subscription";
                        }, 1500);
                      }
                    } catch (error: any) {
                      console.error("Billing portal error:", error); // Full error logging

                      toast({
                        variant: "destructive",
                        description: `Billing error: ${error.message || "Could not access billing information. Please try again."}`,
                        duration: 5000,
                      });
                    }
                  }}
                >
                  Manage Billing Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
