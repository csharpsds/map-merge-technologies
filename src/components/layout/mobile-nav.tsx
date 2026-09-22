"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { megaNav } from "@/content/nav";
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
          className="h-11 w-11 rounded-full lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(24rem,100vw)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Map & Merge Technologies</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4 pb-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex min-h-11 items-center rounded-lg px-2 text-sm font-medium",
              pathname === "/" ? "bg-canvas text-navy" : "text-ink",
            )}
          >
            Home
          </Link>
          <Accordion type="single" collapsible className="mt-2">
            {megaNav.map((panel) => (
              <AccordionItem key={panel.id} value={panel.id}>
                <AccordionTrigger className="px-2 text-sm text-navy">
                  {panel.label}
                </AccordionTrigger>
                <AccordionContent className="[&_a]:no-underline">
                  <div className="space-y-3 pb-2">
                    <Link
                      href={panel.href}
                      onClick={() => setOpen(false)}
                      className="block px-2 text-sm font-semibold text-electric"
                    >
                      Overview
                    </Link>
                    {panel.columns.flatMap((column) =>
                      column.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-lg px-2 py-2 text-sm",
                            isActive(pathname, link.href) ? "bg-canvas text-navy" : "text-ink",
                          )}
                        >
                          {link.label}
                        </Link>
                      )),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button asChild className="mt-4 h-11 w-full rounded-full font-semibold">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Talk to an Integration Expert
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
