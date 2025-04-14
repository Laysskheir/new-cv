"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInState = {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string;
  isDatabaseError?: boolean;
};

export async function signInAction(
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: {
        email: errors.email?.[0],
        password: errors.password?.[0],
      },
      message: "Please correct the errors above.",
    };
  }

  try {
    const { email, password } = validatedFields.data;

    await auth.api.signInEmail({
      body: { email, password },
      headers: headers(),
    });

    return { message: "Sign-in successful!" };
  } catch (error: any) {
    console.error("Sign in error:", error);

    // Handle database connection error
    if (error?.code === "P1001") {
      return {
        message: "Unable to connect to the database. Please try again later.",
        isDatabaseError: true,
      };
    }

    // Handle account linking cases
    if (error?.body?.code === "ACCOUNT_LINKING_REQUIRED") {
      const provider = error.body.provider;
      return {
        errors: {
          email: `This email is registered with ${provider?.toUpperCase()}`,
          password: `Please sign in with ${provider?.toUpperCase()} or link your account in settings`,
        },
        message: `Sign in with ${provider?.toUpperCase()} or link your account in settings`,
      };
    }

    if (error?.body?.code === "USER_NOT_FOUND") {
      return {
        errors: {
          email: "This email is not registered",
        },
        message:
          "This email is not registered. Please check your email or sign up.",
      };
    }

    if (error?.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
      return {
        errors: {
          password: "Incorrect password",
        },
        message: "The password you entered is incorrect. Please try again.",
      };
    }

    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred during sign in. Please try again.",
    };
  }
}
