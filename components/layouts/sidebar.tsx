"use client";
import React from "react";
import Link from "next/link";
import {
  Bell,
  ChartBarDecreasing,
  DownloadCloud,
  Home,
  Layers3Icon,
  LineChart,
  Menu,
  MessageCircleCode,
  Package,
  Package2,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import html2pdf from "html2pdf.js";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppMenu } from "../modals/app-menu";
import { TemplatesPopper } from "../modals/templates-popper";
import Logo from "../logo";

export default function Sidebar() {
  const handleDownload = () => {
    const element = document.getElementById("resume");
    if (element) {
      html2pdf().from(element).save("resume.pdf");
    }
  };

  return (
    <div>
      <div className="hidden  bg-muted/40 md:block">
        <div className="flex h-[80vh] flex-col gap-2">
          <Card className="flex h-14 items-center bg-destructivejustify-between border-b  px-4 lg:h-[60px] lg:px-6">
            <Logo />
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <MessageCircleCode className="h-4 w-4" />
                <span className="sr-only">Send Feedback</span>
              </Button>
              <AppMenu>
                <Layers3Icon className="h-4 w-4" />
              </AppMenu>
              <span className="sr-only">App Menu</span>
            </div>
          </Card>
          <Card className="flex flex-col h-full">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <TemplatesPopper>
                <ChartBarDecreasing className="h-4 w-4" />
                Templates
              </TemplatesPopper>
            </nav>
            <div className="flex-grow"></div>
            <div className="flex items-center m-2 gap-2">
              <Button className="flex-1" onClick={handleDownload}>
                <DownloadCloud className="w-5 h-5 mr-2" />
                <div className="flex text-xs flex-col text-start">
                  <p>Download</p>
                  <p className="text-[10px]">x1 PDF</p>
                </div>
              </Button>
              <Button size="icon">
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
