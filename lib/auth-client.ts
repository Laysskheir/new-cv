//lib/auth-client.ts

import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { stripeClient } from "@better-auth/stripe/client";
const baseURL = process.env.NEXT_PUBLIC_APP_URL!;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_APP_URL is required");
}

export const client = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
  ],
  baseURL,
});

export const { signUp, signIn, signOut, useSession } = client;

export const useUser = () => {
  const session = useSession();
  return session?.data?.user;
};
