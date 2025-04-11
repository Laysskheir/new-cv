"use server";

import { auth } from "@/lib/auth";
import { client } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { headers } from "next/headers";
import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: z.string(),
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
};

export async function signUp(
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
      },
      headers: headers(),
    });

    return { message: "Account created successfully!" };
  } catch (error) {
    console.error("Sign up error:", error);
    if (error instanceof Error) {
      if (
        error.message.includes(
          "Unique constraint failed on the fields: (`email`)"
        )
      ) {
        return { message: "An account with this email already exists." };
      }
    }
    return { message: "An error occurred during sign up. Please try again." };
  }
}
