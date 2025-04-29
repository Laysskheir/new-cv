import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Stripe from "stripe";
import { headers } from "next/headers";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Keep the original version that matches the type definitions
});

export async function POST(req: NextRequest) {
  try {
    // Get the current user session with headers
    const session = await auth.api.getSession({
      headers: headers(),
    });

    // Debug log to check session
    console.log("Session user ID:", session?.user?.id);

    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    const { customerId } = body;

    // Debug log customer ID
    console.log("Customer ID received:", customerId);

    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 }
      );
    }

    try {
      // Validate the customer exists in Stripe first
      const customer = await stripe.customers.retrieve(customerId);
      console.log("Customer exists in Stripe:", customer.id);

      // Create a billing portal session
      console.log("Creating billing portal session for customer:", customerId);
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
      });

      console.log("Portal session created, URL:", portalSession.url);

      // Return the URL to redirect to
      return NextResponse.json({ url: portalSession.url }, { status: 200 });
    } catch (stripeError: any) {
      console.error("Stripe API error:", stripeError);

      if (stripeError.type === "StripeInvalidRequestError") {
        return NextResponse.json(
          { message: "Invalid Stripe customer ID", error: stripeError.message },
          { status: 400 }
        );
      }

      throw stripeError; // Re-throw for general error handling
    }
  } catch (error: any) {
    console.error("Error creating billing portal session:", error);

    // Check if it's a Stripe error
    const errorMessage = error.type?.includes("Stripe")
      ? `Stripe error: ${error.message}`
      : "An error occurred while creating the billing portal session";

    return NextResponse.json(
      {
        message: errorMessage,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
