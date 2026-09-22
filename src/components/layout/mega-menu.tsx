"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PreviewFlow } from "@/components/preview-flow";
import { megaNav, type MegaLink, type MegaPanel } from "@/content/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MegaMenu() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [preview, setPreview] = useState<MegaLink["preview"]>("map");
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const openPanel = megaNav.find((panel) => panel.id === openId) ?? null;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function openPanelAt(panel: MegaPanel) {
    setOpenId(panel.id);
    setPreview(panel.columns[0]?.links[0]?.preview ?? "map");
  }

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      onMouseLeave={() => setOpenId(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpenId(null);
        }
      }}
    >
      <div className="flex items-center gap-1">
        {megaNav.map((panel) => {
          const open = openId === panel.id;
          return (
            <button
              key={panel.id}
              type="button"
              className={cn(
                "inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-[13px] font-medium text-slate hover:bg-canvas hover:text-navy",
                (open || isActive(pathname, panel.href)) && "bg-canvas text-navy",
              )}
              aria-expanded={open}
              aria-controls={`${baseId}-panel`}
              onMouseEnter={() => openPanelAt(panel)}
              onFocus={() => openPanelAt(panel)}
              onClick={() => setOpenId(open ? null : panel.id)}
            >
              {panel.label}
              <ChevronDown
                className={cn("size-3.5 transition-transform", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
      <div
        id={`${baseId}-panel`}
        hidden={!openPanel}
        className="absolute top-full left-1/2 z-50 w-[min(56rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
        onMouseEnter={() => openId && setOpenId(openId)}
        onMouseLeave={() => setOpenId(null)}
      >
        {openPanel ? (
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl ring-1 ring-navy/5">
            <div className="grid gap-0 lg:grid-cols-[1fr_16rem]">
              <div className="grid gap-8 p-6 sm:grid-cols-2">
                {openPanel.columns.map((column) => (
                  <div key={column.heading}>
                    <p className="text-xs font-semibold tracking-[0.16em] text-slate uppercase">
                      {column.heading}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-xl px-3 py-2.5 hover:bg-canvas focus-visible:bg-canvas"
                            onMouseEnter={() => setPreview(link.preview)}
                            onFocus={() => setPreview(link.preview)}
                            onClick={() => setOpenId(null)}
                          >
                            <span className="text-sm font-semibold text-navy">{link.label}</span>
                            <span className="mt-0.5 block text-xs leading-5 text-slate">
                              {link.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-line bg-canvas p-5 lg:border-t-0 lg:border-l">
                <PreviewFlow scene={preview} />
                <p className="mt-4 text-sm font-semibold text-navy">{openPanel.feature.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate">{openPanel.feature.body}</p>
                <Link
                  href={openPanel.feature.href}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-electric"
                  onClick={() => setOpenId(null)}
                >
                  {openPanel.feature.cta}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
