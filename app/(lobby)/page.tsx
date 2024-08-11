import StartPage from "@/components/start-app";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Builder - Professional Resume Creator",
  description:
    "Create professional resumes effortlessly with our intuitive website builder.",
};

export default async function Page() {
  return <StartPage />;
}
