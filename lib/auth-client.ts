//lib/auth-client.ts

import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_APP_URL!;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_APP_URL is required");
}

export const client = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL,
});

export const { signUp, signIn, signOut, useSession, user } = client;

// export const customSignIn = async (email: string, password: string) => {
//   try {
//     const result = await signIn.email({
//       email,
//       password,
//       callbackURL: "/",
//     });
//     return result;
//   } catch (error) {
//     console.error("Sign-in error:", error);
//     throw error;
//   }
// };
