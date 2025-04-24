import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative w-10 h-10">
        <Image
          src={siteConfig.logo.light}
          alt={siteConfig.logo.alt}
          fill
          className="object-contain dark:hidden"
          priority
        />
        <Image
          src={siteConfig.logo.dark}
          alt={siteConfig.logo.alt}
          fill
          className="object-contain hidden dark:block"
          priority
        />
      </div>
      {showText && (
        <span className={cn("font-semibold text-lg hidden sm:inline-block", className)}>
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
