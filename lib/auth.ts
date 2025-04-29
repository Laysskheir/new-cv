//lib/auth.ts

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const auth = betterAuth({
  appName: siteConfig.name,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    nextCookies(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "free",
            priceId: process.env.STRIPE_PRICE_FREE!,
            limits: { resumes: 3 },
          },
          {
            name: "pro",
            priceId: process.env.STRIPE_PRICE_PRO!,
            limits: { resumes: 99 },
          },
        ],
        requireEmailVerification: true,
        onEvent: async (event: any) => {
          console.log(`Processing Stripe event: ${event.type}`);
          // Add specific handling for subscription events if needed
        },
      },
    }),
  ],
  minPasswordLength: 8,
  maxPasswordLength: 128,
  autoSignIn: true,
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github", "email-password"],
    allowDifferentEmails: false,
  },
  user: {
    additionalFields: {
      onboardingCompleted: {
        type: "boolean",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  onAPIError: {
    errorURL: "/auth/error",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/github`,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
});

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return session;
}

export async function getActiveSessions() {
  const activeSessions = await auth.api.listSessions({
    headers: headers(),
  });
  return activeSessions;
}
