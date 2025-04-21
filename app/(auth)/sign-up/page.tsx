"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader,
  AlertCircle,
  ArrowRight,
  Shield,
  Check,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { signUpAction } from "@/actions/signUp";
import { signIn } from "@/lib/auth-client";
import CustomAlert from "@/components/ui/custom-alert";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState = {
  errors: {},
  message: "",
  isDatabaseError: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Sign up"
      )}
    </Button>
  );
}

export default function SignUp() {
  const [state, formAction] = useFormState(signUpAction, initialState);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (!state.errors && !state.isDatabaseError) {
        toast({
          title: "Success",
          description: state.message,
          duration: 1500,
        });
        router.push("/dashboard/resumes");
      } else if (!state.isDatabaseError) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, router]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="w-full space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create a new account
              </CardTitle>
              <CardDescription className="flex items-center">
                Already have an account?
                <Link
                  href="/sign-in"
                  className="font-medium ml-1 text-primary hover:underline transition-colors flex items-center"
                >
                  Sign in now <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardDescription>
              <CardDescription className="text-muted-foreground">
                {state.errors && Object.keys(state.errors).length > 0 && (
                  <CustomAlert message="Please correct the errors below" />
                )}
                {state.isDatabaseError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{state.message}</AlertDescription>
                  </Alert>
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className={cn(
                      state.errors?.firstName && "border-destructive"
                    )}
                    disabled={
                      !!(state.message && !state.errors) ||
                      state.isDatabaseError
                    }
                  />
                  {state.errors?.firstName && (
                    <p className="text-sm text-destructive">
                      {state.errors.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className={cn(
                      state.errors?.lastName && "border-destructive"
                    )}
                    disabled={
                      !!(state.message && !state.errors) ||
                      state.isDatabaseError
                    }
                  />
                  {state.errors?.lastName && (
                    <p className="text-sm text-destructive">
                      {state.errors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className={cn(state.errors?.email && "border-destructive")}
                  disabled={
                    !!(state.message && !state.errors) || state.isDatabaseError
                  }
                />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
              <PasswordStrengthIndicator
                password={password}
                setPassword={setPassword}
                error={state.errors?.password?.[0]}
                disabled={
                  !!(state.message && !state.errors) || state.isDatabaseError
                }
                name="password"
                placeholder="Enter your password"
              />
              <div className="space-y-2">
                <Label
                  htmlFor="passwordConfirmation"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <PasswordInput
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  className={cn(
                    state.errors?.passwordConfirmation && "border-destructive"
                  )}
                  disabled={
                    !!(state.message && !state.errors) || state.isDatabaseError
                  }
                />
                {state.errors?.passwordConfirmation && (
                  <p className="text-sm text-destructive">
                    {state.errors.passwordConfirmation[0]}
                  </p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                variant="outline"
                className="w-full hover:bg-muted transition-colors"
                disabled={
                  !!(state.message && !state.errors) ||
                  isGoogleLoading ||
                  state.isDatabaseError
                }
                onClick={async () => {
                  setIsGoogleLoading(true);
                  try {
                    await signIn.social({
                      provider: "google",
                      callbackURL: "/dashboard/resumes",
                    });
                  } finally {
                    setIsGoogleLoading(false);
                  }
                }}
              >
                {isGoogleLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.google className="mr-2 h-4 w-4" />
                )}
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full hover:bg-muted transition-colors"
                disabled={
                  !!(state.message && !state.errors) ||
                  isGithubLoading ||
                  state.isDatabaseError
                }
                onClick={async () => {
                  setIsGithubLoading(true);
                  try {
                    await signIn.social({
                      provider: "github",
                      callbackURL: "/dashboard/resumes",
                    });
                  } finally {
                    setIsGithubLoading(false);
                  }
                }}
              >
                {isGithubLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                )}
                GitHub
              </Button>
            </div>
            <div className="text-sm text-center">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div className="max-w-md text-center space-y-8 p-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Start Your Journey
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Create an account to access all features and start building your
              professional profile.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure, Fast, and Reliable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
