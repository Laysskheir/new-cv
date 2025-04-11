"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarSimple } from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";
import { motion } from "framer-motion";

const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 flex items-center justify-between p-4 pb-0 bg-background/80 backdrop-blur-sm border-b border-border/40 lg:hidden"
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="bg-background/50 hover:bg-background/80"
            >
              <SidebarSimple size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="focus-visible:outline-none p-0 w-[280px] sm:w-[320px]"
          >
            <SheetClose asChild className="absolute left-4 top-4">
              <Button
                size="icon"
                variant="ghost"
                className="bg-background/50 hover:bg-background/80"
              >
                <SidebarSimple size={20} />
              </Button>
            </SheetClose>
            <Sidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </motion.div>
    </div>
  );
};

export default MobileSidebar;
