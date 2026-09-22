"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "mm-cookie-preferences";
const CHANGE_EVENT = "mm-cookie-preferences-change";
export const COOKIE_PREFERENCES_EVENT = "mm-open-cookie-preferences";

type Preferences = {
  essential: true;
  analytics: boolean;
};

let cachedRaw: string | null | undefined;
let cachedValue: Preferences | null = null;

function readPreferences(): Preferences | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  if (!raw) {
    cachedValue = null;
    return cachedValue;
  }
  try {
    const parsed = JSON.parse(raw) as Preferences;
    cachedValue = { essential: true, analytics: Boolean(parsed.analytics) };
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function persist(next: Preferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cachedRaw = undefined;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CookiePreferencesTrigger({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
    >
      Cookie preferences
    </button>
  );
}

export function CookieBanner() {
  const existing = useSyncExternalStore(subscribe, readPreferences, () => null);
  const [open, setOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);

  useEffect(() => {
    const openDialog = () => {
      setDraftAnalytics(readPreferences()?.analytics ?? false);
      setOpen(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openDialog);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, openDialog);
  }, []);

  if (existing !== null && !open) {
    return null;
  }

  return (
    <>
      {existing === null ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-slate">
              We use essential cookies to run this site. Optional analytics cookies
              stay off until you choose them. See the{" "}
              <Link href="/cookies" className="font-medium text-electric underline">
                cookie policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-11 px-4"
                onClick={() => persist({ essential: true, analytics: false })}
              >
                Essential only
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 px-4"
                onClick={() => {
                  setDraftAnalytics(false);
                  setOpen(true);
                }}
              >
                Preferences
              </Button>
              <Button
                type="button"
                className="h-11 px-4"
                onClick={() => persist({ essential: true, analytics: true })}
              >
                Accept optional
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie preferences</DialogTitle>
            <DialogDescription>
              Essential cookies are required for the site to function. Analytics
              cookies are optional and are not loaded unless you enable them.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong className="text-navy">Essential</strong>
                <br />
                Required for navigation, form security, and remembering this choice.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={draftAnalytics}
                onChange={(event) => setDraftAnalytics(event.target.checked)}
              />
              <span>
                <strong className="text-navy">Analytics</strong>
                <br />
                Optional measurement. No analytics script is bundled until a provider
                is connected and this option is enabled.
              </span>
            </label>
            <Button
              type="button"
              className="h-11"
              onClick={() => persist({ essential: true, analytics: draftAnalytics })}
            >
              Save preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
