import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "new/cv",
    template: "%s | new/cv",
  },
  description: "Create professional resumes effortlessly with our intuitive website new/cv.",
  keywords: ["resume", "CV", "new/cv", "professional", "career"],
  authors: [{ name: "Laysskheir" }],
  creator: "Laysskheir",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "new/cv",
    title: "new/cv - Professional Resume Creator",
    description: "Create professional resumes effortlessly with our intuitive website new/cv.",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "new/cv - Professional Resume Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "new/cv - Professional Resume Creator",
    description: "Create professional resumes effortlessly with our intuitive website new/cv.",
    images: ["https://your-domain.com/twitter-image.jpg"],
    creator: "@YourTwitterHandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          " overflow-x-hidden antialiased "
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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