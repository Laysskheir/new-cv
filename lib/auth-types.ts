import type { auth } from "./auth";

export type Session = typeof auth.$Infer.Session & {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    onboardingCompleted: boolean;
  };
};



