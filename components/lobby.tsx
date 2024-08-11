
import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FilePenIcon, ImportIcon, LayoutTemplateIcon, ListRestartIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <ListRestartIcon className="h-6 w-6 text-foreground" />
          <span className="sr-only">Resume Builder</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            Templates
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left text-primary-foreground">
              <h1 className="text-5xl font-bold tracking-tight">Create a Professional Resume in Minutes</h1>
              <p className="text-xl">
                Our resume builder makes it easy to craft a standout resume that showcases your skills and experience.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link
                  href="/onboarding"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </div>
            </div>
            <img
              src="https://ui.shadcn.com/placeholder.svg"
              width="600"
              height="400"
              alt="Resume Builder"
              className="rounded-xl shadow-xl"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                  Powerful Resume Building Tools
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume builder offers a wide range of features to help you create a professional and eye-catching
                  resume.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <div className="grid gap-4 bg-card p-6 rounded-xl shadow-xl">
                <LayoutTemplateIcon className="h-12 w-12 text-foreground" />
                <h3 className="text-xl font-bold text-foreground">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from our library of professionally designed resume templates to make your resume stand out.
                </p>
              </div>
              <div className="grid gap-4 bg-card p-6 rounded-xl shadow-xl">
                <FilePenIcon className="h-12 w-12 text-foreground" />
                <h3 className="text-xl font-bold text-foreground">Intuitive Editing</h3>
                <p className="text-muted-foreground">
                  Our easy-to-use editor makes it simple to customize your resume with your own content and style.
                </p>
              </div>
              <div className="grid gap-4 bg-card p-6 rounded-xl shadow-xl">
                <ImportIcon className="h-12 w-12 text-foreground" />
                <h3 className="text-xl font-bold text-foreground">Seamless Exporting</h3>
                <p className="text-muted-foreground">
                  Once your resume is ready, export it in multiple formats to share with potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                  Trusted by Professionals
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume builder has helped thousands of people land their dream jobs. See what our users have to
                  say.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="bg-card p-6 shadow-xl">
                  <CardHeader>
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-lg font-medium leading-relaxed">
                      "I was able to create a professional-looking resume in\n just a few minutes. Highly recommended!"
                    </blockquote>
                    <cite className="mt-4 block text-sm text-muted-foreground not-italic">
                      - John Doe, Software Engineer
                    </cite>
                  </CardContent>
                </Card>
                <Card className="bg-card p-6 shadow-xl">
                  <CardHeader>
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-lg font-medium leading-relaxed">
                      "The resume templates are so well-designed and easy to\n customize. I'm really impressed!"
                    </blockquote>
                    <cite className="mt-4 block text-sm text-muted-foreground not-italic">
                      - Sarah Miller, Marketing Manager
                    </cite>
                  </CardContent>
                </Card>
                <Card className="bg-card p-6 shadow-xl">
                  <CardHeader>
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-lg font-medium leading-relaxed">
                      "I was able to create a resume that really showcased my\n skills and experience. Highly
                      recommended!"
                    </blockquote>
                    <cite className="mt-4 block text-sm text-muted-foreground not-italic">
                      - Tom Wilson, Project Manager
                    </cite>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Get Started Today</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create a professional resume in minutes with our easy-to-use resume builder. Sign up for free and
                  start crafting your dream resume today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up for Free
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">&copy; 2024 Resume Builder. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-foreground"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
