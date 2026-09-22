"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Map & Merge Technologies</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "min-h-11 rounded-lg px-3 py-3 text-sm font-medium text-ink",
                isActive(pathname, item.href) && "bg-canvas text-navy",
              )}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-4 h-11 font-semibold">
            <Link href="/contact" onClick={() => setOpen(false)}>
              {siteConfig.cta.bookConsultation}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
