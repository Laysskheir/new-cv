"use client";

import React from "react";
import {
  FadersHorizontal,
  ReadCvLogo,
  HouseSimple,
  CreditCard,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Session } from "@/lib/auth-types";

import { ModeToggle } from "@/components/darkmode/mode-toggle";
import { useState, useEffect } from "react";

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_12px] shadow-primary",
      className
    )}
  />
);

type SidebarItem = {
  path: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, icon, onClick }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(path);
      onClick?.();
    }
  };

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-auto justify-start px-4 py-2.5 transition-all duration-200 group text-sm",
        "hover:bg-primary/10 hover:text-primary",
        isActive && "bg-primary/20 text-primary font-medium"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
    >
      <Link href={path}>
        <div className="mr-3">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
        <span>{name}</span>
        {isActive && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
  session: Session;
};

export const Sidebar = ({ setOpen, session }: SidebarProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: "Resumes",
      icon: <ReadCvLogo />,
    },
    {
      path: "/dashboard/settings",
      name: "Settings",
      icon: <FadersHorizontal />,
    },
    {
      path: "/dashboard/subscription",
      name: "Subscription",
      icon: <CreditCard />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-full flex-col gap-y-4 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className="flex h-full flex-col gap-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "
    >
      <div className="flex items-center px-4 pt-3">
        <Button asChild size="icon" variant="ghost" className="size-8 p-0">
          <Logo showText={false} className="mx-auto hidden lg:block" />
        </Button>
      </div>

      <Separator className="my-2" />

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            onClick={() => setOpen?.(false)}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="size-8 border border-primary">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="text-sm">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                Hi, {session?.user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <div className="px-3 pb-3">
            <ModeToggle />
          </div>
        </div>

        <Separator className="my-2" />
        <div className="px-3 pb-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            Licensed under <span className="font-extrabold underline">MIT</span>
          </p>
          <p className="text-xs text-muted-foreground">
            By the community, for the community
          </p>
          <p className="text-xs text-muted-foreground ">
            A passion project by{" "}
            <Link
              href="https://github.com/laysskheir"
              className="font-extrabold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.author}
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            {siteConfig.name} v1.0.0
          </p>
        </div>
      </div>
    </motion.div>
  );
};
