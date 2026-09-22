"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/content/site-config";
import {
  emptyContactPayload,
  hasContactErrors,
  validateContactPayload,
  type ContactFieldErrors,
  type ContactPayload,
} from "@/lib/contact";

const fieldClass = "h-11 min-h-11 text-base md:text-sm";

export function ContactForm({
  defaultCategory,
}: {
  defaultCategory?: string;
}) {
  const [values, setValues] = useState<ContactPayload>({
    ...emptyContactPayload(),
    inquiryCategory:
      defaultCategory &&
      siteConfig.inquiryCategories.includes(defaultCategory as never)
        ? defaultCategory
        : "",
  });
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function fieldError(id: keyof ContactFieldErrors) {
    const message = errors[id];
    if (!message) return null;
    return (
      <p id={`${id}-error`} className="mt-1 text-sm text-destructive" role="alert">
        {message}
      </p>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactPayload(
      values,
      file
        ? { name: file.name, size: file.size, type: file.type }
        : null,
    );
    setErrors(nextErrors);
    if (hasContactErrors(nextErrors)) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const body = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        body.append(key, String(value));
      });
      if (file) body.append("attachment", file);

      const response = await fetch("/api/contact", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setServerMessage(result.message ?? "The inquiry could not be sent.");
        return;
      }

      setStatus("success");
      setServerMessage(
        result.message ??
          "Thank you. Your inquiry was received by the local form handler.",
      );
      setValues(emptyContactPayload());
      setFile(null);
    } catch {
      setStatus("error");
      setServerMessage("The inquiry could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            className={`mt-2 ${fieldClass}`}
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            onChange={(event) => update("fullName", event.target.value)}
          />
          {fieldError("fullName")}
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
            className={`mt-2 ${fieldClass}`}
            value={values.company}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            onChange={(event) => update("company", event.target.value)}
          />
          {fieldError("company")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Business email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`mt-2 ${fieldClass}`}
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
          />
          {fieldError("email")}
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`mt-2 ${fieldClass}`}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            autoComplete="country-name"
            className={`mt-2 ${fieldClass}`}
            value={values.country}
            onChange={(event) => update("country", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="inquiryCategory">Service required</Label>
          <select
            id="inquiryCategory"
            name="inquiryCategory"
            required
            className="mt-2 h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={values.inquiryCategory}
            aria-invalid={Boolean(errors.inquiryCategory)}
            aria-describedby={
              errors.inquiryCategory ? "inquiryCategory-error" : undefined
            }
            onChange={(event) => update("inquiryCategory", event.target.value)}
          >
            <option value="">Select a category</option>
            {siteConfig.inquiryCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {fieldError("inquiryCategory")}
        </div>
      </div>

      <div>
        <Label htmlFor="projectDescription">Project description</Label>
        <Textarea
          id="projectDescription"
          name="projectDescription"
          required
          rows={6}
          className="mt-2 min-h-32"
          value={values.projectDescription}
          aria-invalid={Boolean(errors.projectDescription)}
          aria-describedby={
            errors.projectDescription ? "projectDescription-error" : undefined
          }
          onChange={(event) => update("projectDescription", event.target.value)}
        />
        {fieldError("projectDescription")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="preferredStartDate">Preferred start date</Label>
          <Input
            id="preferredStartDate"
            name="preferredStartDate"
            type="date"
            className={`mt-2 ${fieldClass}`}
            value={values.preferredStartDate}
            onChange={(event) => update("preferredStartDate", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="budgetRange">Estimated budget range</Label>
          <select
            id="budgetRange"
            name="budgetRange"
            className="mt-2 h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={values.budgetRange}
            onChange={(event) => update("budgetRange", event.target.value)}
          >
            <option value="">Optional</option>
            {siteConfig.budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {fieldError("budgetRange")}
        </div>
      </div>

      <div>
        <Label htmlFor="attachment">Optional attachment</Label>
        <Input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.txt,application/pdf,text/plain"
          className="mt-2 h-11"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          aria-describedby={errors.attachment ? "attachment-error" : "attachment-help"}
        />
        <p id="attachment-help" className="mt-1 text-xs text-slate">
          PDF, DOC, DOCX, or TXT up to 5 MB. Files are not stored by the default mock
          handler.
        </p>
        {fieldError("attachment")}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={values.consent}
          onCheckedChange={(checked) => update("consent", checked === true)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <Label htmlFor="consent" className="text-sm leading-6 font-normal text-ink">
          I agree that Map & Merge Technologies may use this information to respond
          to my inquiry. See the{" "}
          <a href="/privacy" className="whitespace-nowrap font-medium text-electric underline">
            privacy policy
          </a>
          .
        </Label>
      </div>
      {fieldError("consent")}

      {status === "success" ? (
        <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-navy" role="status">
          {serverMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {serverMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        className="h-11 min-h-11 px-6 font-semibold"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending inquiry…" : "Send inquiry"}
      </Button>
    </form>
  );
}
