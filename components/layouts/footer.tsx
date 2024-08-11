import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border px-4 md:px-6 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-primary font-semibold text-lg mb-4">About Us</h2>
          <p className="text-sm">
            {siteConfig.description}
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-primary font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "Story",  "Contact"].map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="text-sm hover:text-primary transition-colors duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h2 className="text-primary font-semibold text-lg mb-4">Connect</h2>
          <ul className="space-y-2">
            {[
              { name: "LinkedIn", icon: <Icons.linkedin className="w-4 h-4 mr-2" /> },
              { name: "Twitter", icon: <Icons.twitter className="w-4 h-4 mr-2" /> },
              { name: "Email", icon: <Icons.mail className="w-4 h-4 mr-2" /> },
            ].map((platform) => (
              <li key={platform.name}>
                <Link
                  href="#"
                  className="text-sm hover:text-primary transition-colors duration-200 flex items-center"
                >
                  {platform.icon}
                  {platform.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-primary font-semibold text-lg mb-4">Newsletter</h2>
          <p className="text-sm mb-2">Stay updated with our latest features and news.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
            />
            <Button
              type="submit"
              className="w-full sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

    
      <h5 className=" text-primary/10  text-[120px] md:text-[300px] lg:text-[400px] leading-none text-center pointer-events-none mt-8 overflow-hidden">
      {siteConfig.name}
      </h5>
    </footer>
  );
};

export default Footer;
