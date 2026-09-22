"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  return (
    <form
      className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setStatus("error");
          return;
        }
        setStatus("success");
        setEmail("");
      }}
    >
      <div>
        <Label htmlFor="newsletter-email" className="sr-only">
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          required
          className="h-11 bg-white"
          placeholder="Business email"
          value={email}
          aria-invalid={status === "error"}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
        />
      </div>
      <Button type="submit" className="h-11 px-5">
        Notify me
      </Button>
      {status === "success" ? (
        <p className="sm:col-span-2 text-sm text-navy" role="status">
          Saved locally as interest only. Connect an email provider before sending
          newsletters.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="sm:col-span-2 text-sm text-destructive" role="alert">
          Enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}
