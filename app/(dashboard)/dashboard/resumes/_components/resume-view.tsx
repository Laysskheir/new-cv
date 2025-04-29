"use client";

import { useState, useEffect } from "react";
import { GridView } from "./grid";
import { ListView } from "./list";
import { ViewToggle } from "./view-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle2, Crown, AlertTriangle, Clock } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { getSubscriptionLimits } from "@/lib/client-subscription";
import { client } from "@/lib/auth-client";

export function ResumeView({ initialResumes }: { initialResumes: any[] }) {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [resumes, setResumes] = useState(initialResumes);
    const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [subscriptionData, setSubscriptionData] = useState<{
        isPro: boolean;
        limit: number;
        usedCount: number;
        cancelAtPeriodEnd?: boolean;
        periodEnd?: string;
    } | null>(null);

    // Handle upgrade success notification
    useEffect(() => {
        const fromUpgrade = searchParams.get('upgraded') === 'true';

        if (fromUpgrade) {
            setShowUpgradeSuccess(true);
            // Remove the query param to prevent showing the message on refresh
            router.replace('/dashboard/resumes');
            // Show a toast
            toast({
                title: "Subscription Upgraded!",
                description: "You now have access to unlimited resumes and premium features.",
                variant: "default",
            });
        }
    }, [searchParams, router]);

    useEffect(() => {
        // Fetch subscription data
        async function fetchSubscriptionData() {
            try {
                const limits = await getSubscriptionLimits();

                // Check for cancelation status
                let cancelAtPeriodEnd = false;
                let periodEnd = undefined;

                if (limits.isPro) {
                    // Get detailed subscription data
                    const { data: subscriptions } = await client.subscription.list();
                    const activeSubscription = subscriptions?.find(
                        sub => sub.plan === "pro" && (sub.status === "active" || sub.status === "trialing")
                    );

                    if (activeSubscription) {
                        cancelAtPeriodEnd = activeSubscription.cancelAtPeriodEnd || false;
                        periodEnd = activeSubscription.periodEnd
                            ? new Date(activeSubscription.periodEnd).toLocaleDateString()
                            : undefined;
                    }
                }

                // Set subscription data
                setSubscriptionData({
                    isPro: limits.isPro,
                    limit: limits.limit,
                    usedCount: limits.resumeCount,
                    cancelAtPeriodEnd,
                    periodEnd
                });
            } catch (error) {
                console.error("Error fetching subscription:", error);
                // Default to free limits if error
                setSubscriptionData({
                    isPro: false,
                    limit: 3,
                    usedCount: resumes.length
                });
            }
        }

        fetchSubscriptionData();
    }, [resumes]);

    return (
        <div className="space-y-6">
            {showUpgradeSuccess && (
                <Alert className="bg-success border-success">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <AlertTitle className="text-success">Subscription Upgraded Successfully!</AlertTitle>
                    <AlertDescription className="text-success">
                        Your account has been upgraded to Pro. You now have access to unlimited resumes and premium features.
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Resumes</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {subscriptionData && (
                        subscriptionData.isPro ? (
                            subscriptionData.cancelAtPeriodEnd ? (
                                <div className="flex items-center text-sm text-warning bg-warning px-3 py-1 rounded-full">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-warning" />
                                    <span>Pro Plan - Ending {subscriptionData.periodEnd}</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-sm text-success bg-success px-3 py-1 rounded-full">
                                    <Crown className="h-3.5 w-3.5 mr-1 text-success" />
                                    <span>Pro Plan - Unlimited Resumes</span>
                                </div>
                            )
                        ) : (
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {subscriptionData.usedCount}/{subscriptionData.limit} Resumes
                                    </span>
                                    <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                                        <Link href="/dashboard/subscription">
                                            <Sparkles className="h-3.5 w-3.5 mr-1" />
                                            Upgrade
                                        </Link>
                                    </Button>
                                </div>
                                <Progress
                                    value={(subscriptionData.usedCount / subscriptionData.limit) * 100}
                                    className="h-1.5 w-40"
                                />
                            </div>
                        )
                    )}
                    <ViewToggle view={view} onChange={setView} />
                </div>
            </div>

            {view === "grid" ? (
                <GridView resumes={resumes} />
            ) : (
                <ListView resumes={resumes} />
            )}
        </div>
    );
}

