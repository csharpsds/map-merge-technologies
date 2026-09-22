"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/content/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-electric focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <Image
            src={siteConfig.brand.logo}
            alt="Map & Merge Technologies"
            width={220}
            height={64}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <Button asChild className="hidden h-11 min-h-11 shrink-0 rounded-full px-4 text-[13px] font-semibold lg:inline-flex">
            <Link href="/contact">Talk to an Integration Expert</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
