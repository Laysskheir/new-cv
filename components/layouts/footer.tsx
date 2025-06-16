import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Twitter, Mail, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="relative bg-background text-muted-foreground border-t border-border/50">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className=" px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
          {/* About Section */}
          <div>
            <h2 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {["Home", "Story", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-sm hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors duration-200" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h2 className="font-semibold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect
            </h2>
            <ul className="space-y-2">
              {[
                {
                  name: "LinkedIn",
                  icon: <Linkedin className="w-4 h-4" />,
                  href: "#",
                },
                {
                  name: "Twitter",
                  icon: <Twitter className="w-4 h-4" />,
                  href: "#",
                },
                {
                  name: "Email",
                  icon: <Mail className="w-4 h-4" />,
                  href: "#",
                },
                {
                  name: "GitHub",
                  icon: <Github className="w-4 h-4" />,
                  href: "#",
                },
              ].map((platform) => (
                <li key={platform.name}>
                  <Link
                    href={platform.href}
                    className="text-sm hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors duration-200" />
                    {platform.icon}
                    <span className="ml-2">{platform.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className=" font-semibold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Newsletter
            </h2>
            <p className="text-sm mb-4 leading-relaxed">
              Stay updated with our latest features and news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-background/50 border-border/50 focus:border-primary/50 transition-colors duration-200"
              />
              <Button type="submit" className="w-full sm:w-auto ">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-12 pt-8 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </div>
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h5
          className="text-primary/10 text-[120px] md:text-[300px] lg:text-[400px] leading-none text-center pointer-events-none mt-8 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {siteConfig.name}
        </motion.h5>
      </div>
    </footer>
  );
};

export default Footer;
