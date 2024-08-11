"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Appearance from "../appearance";

// Icons can be imported or defined
import { MessageSquare, Heart, Twitter, Users } from "lucide-react";
import { Card } from "../ui/card";
import Logo from "../logo";
import { Icons } from "../icons";

export function AppMenu({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-lg p-8">
        <div className="py-2">
          <Appearance />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MenuCard
            icon={<Icons.chat />}
            title="Send feedback"
            description="Shape your experience"
          />
          <MenuCard
            icon={<Icons.heartBold />}
            title="What's new"
            description="Learn about latest updates"
          />
          <MenuCard
            icon={<Icons.twitter />}
            title="Follow Twitter"
            description="Stay tuned about Shots"
          />
          <MenuCard
            icon={<Icons.linkedin />}
            title="Connect on LinkedIn"
            description="Expand your professional network"
          />
        </div>
        <DialogFooter className="mt-4 justify-center">
          <ShotsFooter />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MenuCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-start  p-4 ">
      <div className="flex w-5 h-5 items-center justify-center mb-2 text-primary">
        {icon}
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
}

function ShotsFooter() {
  return (
    <div className="flex items-center justify-between w-full pt-4 border-t">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="text-muted-foreground text-xs text-right">
        By LayssKheir
      </div>
    </div>
  );
}
