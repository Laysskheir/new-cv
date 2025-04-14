"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name cannot exceed 50 characters")
      .regex(
        /^[a-zA-Z\s-']+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name cannot exceed 50 characters")
      .regex(
        /^[a-zA-Z\s-']+$/,
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email cannot exceed 100 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      .refine(
        (password) => !password.includes(" "),
        "Password cannot contain spaces"
      ),
    passwordConfirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type SignUpState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string;
  isDatabaseError?: boolean;
};

export async function signUpAction(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const validatedFields = signUpSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors above.",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        onboardingCompleted: false,
      },
      headers: headers(),
    });

    return {
      message:
        "Account created successfully!",
    };
  } catch (error: any) {
    console.error("Sign up error:", error);

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
          email: [
            `This email is already registered with ${provider?.toUpperCase()}`,
          ],
        },
        message: `Please sign in with ${provider?.toUpperCase()}`,
      };
    }

    if (error?.body?.code === "USER_ALREADY_EXISTS") {
      return {
        errors: {
          email: ["An account with this email already exists."],
        },
        message: "An account with this email already exists.",
      };
    }

    return {
      message:
        "An unexpected error occurred during sign up. Please try again later.",
    };
  }
}
