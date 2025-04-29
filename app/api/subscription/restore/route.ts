import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Update with your Stripe API version
});

export async function POST(req: NextRequest) {
  try {
    // Get the current user session with headers
    const session = await auth.api.getSession({
      headers: headers(),
    });

    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { message: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Fetch the subscription from our database
    const subscription = await prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
        referenceId: session.user.id,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    // Check if subscription is marked for cancellation
    if (!subscription.cancelAtPeriodEnd) {
      return NextResponse.json(
        { message: "Subscription is not scheduled for cancellation" },
        { status: 400 }
      );
    }

    // If we have a Stripe subscription ID, restore it in Stripe
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: false,
      });
    }

    // Update our database to remove the cancellation
    await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        cancelAtPeriodEnd: false,
      },
    });

    return NextResponse.json(
      { message: "Subscription restored successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error restoring subscription:", error);

    return NextResponse.json(
      {
        message: "An error occurred while restoring the subscription",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
