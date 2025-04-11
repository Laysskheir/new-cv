"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signIn(
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors above.",
    };
  }

  try {
    const { email, password } = validatedFields.data;

    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: headers(),
    });
    return {
      message: "Sign-in successful!",
    };
  } catch (error) {
    console.error("Sign up error:", error);

    return {
      message:
        error instanceof Error ? error.message : "An error occurred during sign in. Please try again.",
    };
  }
}
