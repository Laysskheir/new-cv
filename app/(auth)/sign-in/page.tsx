"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { customSignIn, signIn } from "@/lib/auth-client";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await customSignIn(email, password);
      toast({
        title: "Welcome!",
        description: "You have successfully signed in.",
      });
    } catch (error) {
      toast({
        title: "Sign-in failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <Logo showText={false} className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  placeholder="Password"
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
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
                className="w-full"
                onClick={async () => {
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/",
                  });
                }}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={async () =>
                  signIn.social({
                    provider: "github",
                    callbackURL: "/",
                  })
                }
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
            <div className="text-sm text-center">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Unlock Your Account</h2>
          <p className="text-xl mb-8">
            Sign in to access your personalized dashboard and explore all the
            features tailored to your needs.
          </p>
          <div className="flex items-center justify-center">
            <img
              src="https://github.com/shadcn.png"
              alt="Rick Blalock"
              className="h-12 w-12 rounded-full mr-4"
            />
            <div className="text-left">
              <p className="font-semibold">Rick Blalock</p>
              <p className="text-sm text-muted-foreground">
                Cofounder/CTO onestudy.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
