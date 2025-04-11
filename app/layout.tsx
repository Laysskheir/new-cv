import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";

export const chillaxFont = localFont({
  src: "../public/fonts/chillax/Chillax-Regular.woff2",
  variable: "--font-chillax",
});

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "new/cv",
    template: "%s | new/cv",
  },
  description:
    "Create professional resumes effortlessly with our intuitive website new/cv.",
  keywords: ["resume", "CV", "new/cv", "professional", "career"],
  authors: [{ name: "Laysskheir" }],
  creator: "Laysskheir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn("overflow-x-hidden antialiased", chillaxFont.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
