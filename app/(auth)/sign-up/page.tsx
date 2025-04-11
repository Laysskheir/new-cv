"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { Spinner } from "@phosphor-icons/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFormState, useFormStatus } from "react-dom";
import { signUp, SignUpState } from "@/actions/signUp";
import { client } from "@/lib/auth-client";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner size={16} className="animate-spin" /> : "Sign up"}
    </Button>
  );
}

const initialState: SignUpState = {};

export default function SignUp() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="z-50 rounded-md rounded-t-none max-w-md">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Create a new account
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction}>
                <div className="grid gap-4">
                  {state?.message && (
                    <Alert variant={state.errors ? "destructive" : "success"}>
                      <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Max"
                        required
                      />
                      {state?.errors?.firstName && (
                        <p className="text-sm text-red-500">
                          {state.errors.firstName[0]}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Robinson"
                        required
                      />
                      {state?.errors?.lastName && (
                        <p className="text-sm text-red-500">
                          {state.errors.lastName[0]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {state?.errors?.email && (
                      <p className="text-sm text-red-500">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      required
                    />
                    {state?.errors?.password && (
                      <p className="text-sm text-red-500">
                        {state.errors.password[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="passwordConfirmation">
                      Confirm Password
                    </Label>
                    <PasswordInput
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      required
                    />
                    {state?.errors?.passwordConfirmation && (
                      <p className="text-sm text-red-500">
                        {state.errors.passwordConfirmation[0]}
                      </p>
                    )}
                  </div>

                  <SubmitButton />
                </div>
              </form>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    await client.signIn.social({
                      provider: "google",
                      callbackURL: "/dashboard/resumes",
                    });
                  }}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    await client.signIn.social({
                      provider: "github",
                      callbackURL: "/dashboard/resumes",
                    });
                  }}
                >
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="py-4">
              <div className="text-sm">
                <Link href="/sign-in" className="text-muted-foreground">
                  Already have an account?
                  <span className="ml-1 font-semibold text-primary hover:underline">
                    Sign in now
                  </span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Unlock Your Web3 Journey</h2>
          <p className="text-xl mb-8">
            Join our community to explore the latest blockchain technologies and
            innovations.
          </p>
          <div className="flex items-center justify-center">
            <img
              src="https://github.com/shadcn.png"
              alt="Rick Blalock"
              className="h-12 w-12 rounded-full mr-4"
            />
            <div className="text-left">
              <p className="font-semibold">Rick Blalock</p>
              <p className="text-sm text-gray-400">Cofounder/CTO onestudy.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
