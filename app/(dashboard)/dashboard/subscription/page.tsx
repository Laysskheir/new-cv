"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { client } from '@/lib/auth-client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, Loader, Crown, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const SubscriptionPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [showCancelSuccess, setShowCancelSuccess] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState<{
        id?: string;
        status?: string;
        currentPeriodEnd?: string;
        cancelAtPeriodEnd?: boolean;
    } | null>(null);

    // Check current subscription status when component mounts
    useEffect(() => {
        async function checkSubscription() {
            try {
                setIsInitializing(true);
                const { data: subscriptions } = await client.subscription.list();

                // Check if user has pro subscription
                const proSubscription = subscriptions?.find(
                    sub => sub.plan === "pro" && (sub.status === "active" || sub.status === "trialing")
                );

                if (proSubscription) {
                    setCurrentPlan('pro');
                    setSubscriptionDetails({
                        id: proSubscription.id,
                        status: proSubscription.status,
                        currentPeriodEnd: proSubscription.periodEnd
                            ? new Date(proSubscription.periodEnd).toLocaleDateString()
                            : undefined,
                        cancelAtPeriodEnd: proSubscription.cancelAtPeriodEnd || false
                    });
                } else {
                    setCurrentPlan('free');
                }
            } catch (error) {
                console.error('Error checking subscription:', error);
                setCurrentPlan('free'); // Default to free
            } finally {
                setIsInitializing(false);
            }
        }

        checkSubscription();
    }, []);

    // Check for downgrade success parameter
    useEffect(() => {
        const downgraded = searchParams.get('downgraded') === 'true';
        if (downgraded) {
            setShowCancelSuccess(true);
            router.replace('/dashboard/subscription');
            toast({
                title: "Subscription Canceled",
                description: "Your subscription has been canceled. You will be downgraded to the free plan at the end of your billing period.",
                variant: "default",
            });
        }
    }, [searchParams, router]);

    const handleUpgrade = async (plan: string) => {
        try {
            setIsLoading(true);
            const { error } = await client.subscription.upgrade({
                plan,
                successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/resumes?upgraded=true`,
                cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
            });

            if (error) {
                console.error('Subscription error:', error);
                toast({
                    title: "Subscription Error",
                    description: error.message || "There was an error processing your subscription.",
                    variant: "destructive",
                });
            }
        } catch (err: any) {
            console.error('Error upgrading subscription:', err);
            toast({
                title: "Error",
                description: err.message || "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            setIsLoading(true);

            // Direct approach to cancel subscription using the subscription ID
            if (subscriptionDetails?.id) {
                const response = await fetch('/api/subscription/cancel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscriptionId: subscriptionDetails.id
                    }),
                });

                if (response.ok) {
                    setShowCancelSuccess(true);
                    toast({
                        title: "Subscription Canceled",
                        description: "Your subscription has been canceled. You'll be downgraded to the free plan at the end of your billing period.",
                        variant: "default",
                    });

                    // Refresh subscription status
                    setTimeout(() => {
                        window.location.href = '/dashboard/subscription';
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to cancel subscription');
                }
            } else {
                throw new Error('No active subscription found to cancel');
            }
        } catch (err: any) {
            console.error('Error canceling subscription:', err);
            toast({
                title: "Cancellation Error",
                description: err.message || "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRestoreSubscription = async () => {
        try {
            setIsLoading(true);

            // Use the subscription ID to restore the subscription
            if (subscriptionDetails?.id) {
                const response = await fetch('/api/subscription/restore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscriptionId: subscriptionDetails.id
                    }),
                });

                if (response.ok) {
                    toast({
                        title: "Subscription Restored",
                        description: "Your Pro subscription has been restored and will continue to renew.",
                        variant: "default",
                    });

                    // Refresh subscription status
                    setTimeout(() => {
                        window.location.href = '/dashboard/subscription';
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to restore subscription');
                }
            } else {
                throw new Error('No subscription found to restore');
            }
        } catch (err: any) {
            console.error('Error restoring subscription:', err);
            toast({
                title: "Restoration Error",
                description: err.message || "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        { name: "Resumes", free: "3", pro: "Unlimited" },
        { name: "Templates", free: "Basic Only", pro: "All Premium" },
        { name: "AI Resume Suggestions", free: "Limited", pro: "Advanced" },
        { name: "Export Formats", free: "PDF", pro: "PDF, DOCX, TXT" },
        { name: "Custom Sections", free: "No", pro: "Yes" },
        { name: "Support", free: "Email", pro: "Priority" },
    ];

    if (isInitializing) {
        return (
            <div className="container mx-auto p-4 py-8 flex justify-center items-center h-64">
                <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 py-12 space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Choose Your Plan</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Your Subscription Plan
                </h1>
                <p className="text-base text-muted-foreground max-w-xl mx-auto">
                    Choose the plan that works best for your career goals. Upgrade anytime to unlock premium features.
                </p>
                <Separator className="mt-8 mx-auto w-1/4" />
            </div>

            {/* Status Alerts */}
            <div className="space-y-4 max-w-3xl mx-auto">
                {showCancelSuccess && (
                    <Alert className="bg-warning/5 border-warning/20 animate-in slide-in-from-top duration-500">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <AlertTitle className="text-warning font-medium">Subscription Canceled</AlertTitle>
                        <AlertDescription className="text-warning/90">
                            Your Pro subscription has been canceled. You'll continue to have access to Pro features until the end of your current billing period.
                        </AlertDescription>
                    </Alert>
                )}

                {currentPlan === 'pro' && (
                    <Alert className={`animate-in slide-in-from-top duration-500 ${subscriptionDetails?.cancelAtPeriodEnd
                        ? 'bg-warning/5 border-warning/20'
                        : 'bg-success/5 border-success/20'
                        }`}>
                        <Crown className={`h-4 w-4 ${subscriptionDetails?.cancelAtPeriodEnd ? 'text-warning' : 'text-success'
                            }`} />
                        <AlertTitle className={subscriptionDetails?.cancelAtPeriodEnd ? 'text-warning' : 'text-success'}>
                            {subscriptionDetails?.cancelAtPeriodEnd
                                ? "Your Pro Plan is scheduled to end"
                                : "You're on the Pro Plan!"}
                        </AlertTitle>
                        <AlertDescription className={subscriptionDetails?.cancelAtPeriodEnd ? 'text-warning/90' : 'text-success/90'}>
                            {subscriptionDetails?.cancelAtPeriodEnd
                                ? `Your subscription has been canceled. You'll continue to have access to Pro features until ${subscriptionDetails.currentPeriodEnd}, after which you'll be downgraded to the Free plan.`
                                : "You have access to all premium features including unlimited resumes, premium templates, and advanced AI suggestions."}
                            {!subscriptionDetails?.cancelAtPeriodEnd && subscriptionDetails?.currentPeriodEnd && (
                                <span className="block mt-2 text-sm font-medium">
                                    Your subscription {subscriptionDetails.status === 'trialing' ? 'trial' : 'renewal'} date: <strong>{subscriptionDetails.currentPeriodEnd}</strong>
                                </span>
                            )}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Free Plan Card */}
                <Card
                    className={`w-full transition-all duration-300 hover:shadow-lg
                    ${currentPlan === 'free'
                            ? 'border-primary/50 shadow-lg ring-1 ring-primary/50 scale-[1.02]'
                            : 'hover:border-primary/30 hover:scale-[1.01]'
                        }`}
                >
                    {currentPlan === 'free' && (
                        <div className="absolute -top-1 -right-1">
                            <div className="relative">
                                <Badge className="m-2 relative text-xs bg-primary/90 hover:bg-primary/90">
                                    Current Plan
                                </Badge>
                            </div>
                        </div>
                    )}

                    <CardHeader className={`${currentPlan === 'free' ? 'bg-primary/5' : ''} pb-3`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-bold">Free Plan</CardTitle>
                                {currentPlan === 'free' && (
                                    <span className="text-primary bg-primary/10 p-1 rounded-full">
                                        <Check className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                        </div>
                        <CardDescription className="text-sm mt-1">Get started with basic features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">$0</span>
                            <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm">3 Resumes</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm">Basic Templates</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm">PDF Export</span>
                            </li>
                            <li className="flex items-start text-muted-foreground">
                                <X className="mr-3 h-4 w-4 shrink-0 mt-0.5" />
                                <span className="text-sm">Premium Features</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {currentPlan === 'free' ? (
                            <Button
                                className="w-full text-sm h-10"
                                variant="outline"
                                disabled={true}
                            >
                                Current Plan
                            </Button>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full text-sm h-10"
                                        variant={subscriptionDetails?.cancelAtPeriodEnd ? "outline" : "outline"}
                                        disabled={subscriptionDetails?.cancelAtPeriodEnd}
                                    >
                                        {subscriptionDetails?.cancelAtPeriodEnd ? "Downgrade Pending" : "Downgrade to Free"}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg">Downgrade to Free Plan</DialogTitle>
                                        <DialogDescription className="text-sm">
                                            Are you sure you want to downgrade to the Free plan?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <p className="text-sm font-medium">When you downgrade:</p>
                                        <ul className="text-sm space-y-2 list-disc pl-5">
                                            <li>Your Pro subscription will remain active until the end of your current billing period</li>
                                            <li>After your billing period ends, you'll be switched to the Free plan</li>
                                            <li>You'll be limited to 3 resumes on the Free plan</li>
                                            <li>If you have more than 3 resumes, you'll need to delete some to create new ones</li>
                                        </ul>
                                    </div>
                                    <DialogFooter className="flex sm:justify-between gap-3">
                                        <DialogClose asChild>
                                            <Button variant="outline" className="mt-2 sm:mt-0 flex-1 h-10">
                                                Keep Pro Plan
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            variant="destructive"
                                            onClick={handleCancelSubscription}
                                            disabled={isLoading}
                                            className="flex-1 h-10"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : "Downgrade to Free"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </CardFooter>
                </Card>

                {/* Pro Plan Card */}
                <Card
                    className={`w-full relative overflow-hidden transition-all duration-300 hover:shadow-lg
                    ${currentPlan === 'pro' && !subscriptionDetails?.cancelAtPeriodEnd
                            ? 'border-success/50 shadow-lg ring-1 ring-success/50 scale-[1.02]'
                            : currentPlan === 'pro' && subscriptionDetails?.cancelAtPeriodEnd
                                ? 'border-warning/50 shadow-lg ring-1 ring-warning/50 scale-[1.02]'
                                : 'hover:border-primary/30 hover:scale-[1.01]'}`}
                >
                    {currentPlan === 'pro' && !subscriptionDetails?.cancelAtPeriodEnd && (
                        <div className="absolute -top-1 -right-1">
                            <div className="relative">
                                <Badge className="m-2 relative text-xs bg-success/90 hover:bg-success/90">
                                    <Crown className="h-3 w-3 mr-1" /> Active
                                </Badge>
                            </div>
                        </div>
                    )}

                    {currentPlan === 'pro' && subscriptionDetails?.cancelAtPeriodEnd && (
                        <div className="absolute -top-1 -right-1">
                            <div className="relative">
                                <Badge className="m-2 relative text-xs bg-warning/90 hover:bg-warning/90">
                                    Ending Soon
                                </Badge>
                            </div>
                        </div>
                    )}

                    {currentPlan !== 'pro' && (
                        <div className="absolute -top-1 -right-1">
                            <div className="relative">
                                <Badge className="m-2 relative text-xs bg-primary/90 hover:bg-primary/90">
                                    <Sparkles className="h-3 w-3 mr-1" /> Recommended
                                </Badge>
                            </div>
                        </div>
                    )}

                    <CardHeader className={`${currentPlan === 'pro' && !subscriptionDetails?.cancelAtPeriodEnd
                        ? 'bg-success/5'
                        : currentPlan === 'pro' && subscriptionDetails?.cancelAtPeriodEnd
                            ? 'bg-warning/5'
                            : 'bg-primary/5'
                        } border-b pb-3`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-bold">Pro Plan</CardTitle>
                                {currentPlan === 'pro' && !subscriptionDetails?.cancelAtPeriodEnd && (
                                    <span className="text-success bg-success/10 p-1 rounded-full">
                                        <Crown className="h-4 w-4" />
                                    </span>
                                )}
                                {currentPlan === 'pro' && subscriptionDetails?.cancelAtPeriodEnd && (
                                    <span className="text-warning bg-warning/10 p-1 rounded-full">
                                        <AlertTriangle className="h-4 w-4" />
                                    </span>
                                )}
                                {currentPlan !== 'pro' && (
                                    <span className="text-primary bg-primary/10 p-1 rounded-full">
                                        <Sparkles className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                        </div>
                        <CardDescription className="text-sm mt-1">Unlock all premium features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">$20</span>
                            <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">Unlimited Resumes</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">All Premium Templates</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">Advanced AI Suggestions</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="mr-3 h-4 w-4 text-success shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">Priority Support</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {currentPlan === 'pro' ? (
                            subscriptionDetails?.cancelAtPeriodEnd ? (
                                <div className="w-full">
                                    <Button
                                        className="w-full text-sm h-10"
                                        variant="default"
                                        onClick={() => handleRestoreSubscription()}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : "Resume Subscription"}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground mt-2">
                                        Your subscription will end on {subscriptionDetails.currentPeriodEnd}
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full grid grid-cols-2 gap-3">
                                    <Button
                                        className="text-sm h-10"
                                        variant="outline"
                                        onClick={() => router.push('/dashboard/settings')}
                                    >
                                        Manage Account
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="text-sm h-10"
                                                variant="outline"
                                                disabled={isLoading}
                                            >
                                                Cancel Plan
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg">Cancel Pro Subscription</DialogTitle>
                                                <DialogDescription className="text-sm">
                                                    Are you sure you want to cancel your Pro subscription?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <p className="text-sm font-medium">When you cancel:</p>
                                                <ul className="text-sm space-y-2 list-disc pl-5">
                                                    <li>Your subscription will remain active until the end of your current billing period</li>
                                                    <li>You'll continue to have access to all Pro features until then</li>
                                                    <li>You will automatically be downgraded to the Free plan afterward</li>
                                                    <li>You may lose access to some of your resumes if you exceed the Free plan limit</li>
                                                </ul>
                                            </div>
                                            <DialogFooter className="flex sm:justify-between gap-3">
                                                <DialogClose asChild>
                                                    <Button variant="outline" className="mt-2 sm:mt-0 flex-1 h-10">
                                                        Keep Subscription
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleCancelSubscription}
                                                    disabled={isLoading}
                                                    className="flex-1 h-10"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : "Cancel Subscription"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )
                        ) : (
                            <Button
                                className="w-full text-sm h-10"
                                onClick={() => handleUpgrade('pro')}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : "Upgrade to Pro"}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>

            {/* Feature Comparison */}
            <div className="mt-16 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Compare Plans</h2>
                    <p className="text-sm text-muted-foreground">See what each plan offers to make the right choice</p>
                </div>
                <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-1/3 font-medium text-sm">Feature</TableHead>
                                <TableHead className="font-medium text-sm">Free</TableHead>
                                <TableHead className="font-medium text-sm">Pro</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {features.map((feature, index) => (
                                <TableRow
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-card" : "bg-muted/20"
                                        } hover:bg-muted/30 transition-colors`}
                                >
                                    <TableCell className="font-medium text-sm">{feature.name}</TableCell>
                                    <TableCell className="text-sm">
                                        {feature.free === "No" ? (
                                            <X className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            feature.free
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {feature.pro === "Yes" ? (
                                            <Check className="h-4 w-4 text-success" />
                                        ) : (
                                            <span className="text-primary font-medium">{feature.pro}</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Help Section */}
            <div className="mt-16 text-center max-w-2xl mx-auto">
                <div className="bg-muted/20 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">Need Help Deciding?</h2>
                    <p className="text-sm text-muted-foreground mb-4">Our team is here to help you choose the right plan for your needs</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push('/contact')}
                        className="h-9 px-4"
                    >
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;