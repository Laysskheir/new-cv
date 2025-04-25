"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Loader,
  Lock,
  Users,
} from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

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
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signInAction } from "@/actions/signIn";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import CustomAlert from "@/components/ui/custom-alert";

const initialState = {
  errors: {},
  message: "",
  isDatabaseError: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [state, formAction] = useFormState(signInAction, initialState);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.errors && !state.isDatabaseError) {
      toast({
        title: "Success",
        description: state.message,
        duration: 1500,
      });
      router.replace("/dashboard/resumes");
    } else if (state.message && (state.errors || state.isDatabaseError)) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="w-full space-y-1">
              <CardTitle className="text-2xl font-bold">
                Sign in to your account
              </CardTitle>
              <CardDescription className="flex items-center">
                Don't have an account?
                <Link
                  href="/sign-up"
                  className="font-medium ml-1 text-primary hover:underline transition-colors flex items-center"
                >
                  Create one now <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardDescription>
              <CardDescription className="text-muted-foreground">
                {state.errors && Object.keys(state.errors).length > 0 && (
                  <CustomAlert message="Please correct the errors below" />
                )}
                {state.isDatabaseError && (
                  <CustomAlert message={state.message} />
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action={formAction}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className={cn(state.errors?.email && "border-destructive")}
                />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">
                    {state.errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={cn(state.errors?.password && "border-destructive")}
                />
                {state.errors?.password && (
                  <p className="text-sm text-destructive">
                    {state.errors.password}
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
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
                disabled={!!(state.message && !state.errors) || isGoogleLoading}
                onClick={async () => {
                  setIsGoogleLoading(true);
                  try {
                    await signIn.social({
                      provider: "google",
                      callbackURL: "/",
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
                disabled={!!(state.message && !state.errors) || isGithubLoading}
                onClick={async () => {
                  setIsGithubLoading(true);
                  try {
                    await signIn.social(
                      {
                        provider: "github",
                        callbackURL: "/",
                      },
                      {
                        onRequest(context) { },
                        onError(context) { },
                        onSuccess() { },
                      }
                    );
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
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
              Welcome Back
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sign in to continue your journey and access your professional
              profile.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Icons.settings className="h-5 w-5 text-primary-foreground" />
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
