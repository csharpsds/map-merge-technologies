"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CountrySelect } from "@/components/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { careersContent } from "@/content/careers";
import { defaultCareerInterest, jobInterestOptions } from "@/content/jobs";
import {
  CAREER_CV_MAX_BYTES,
  careerCvAccept,
  careerCvHelp,
  emptyCareerPayload,
  hasCareerErrors,
  validateCareerPayload,
  type CareerFieldErrors,
  type CareerPayload,
} from "@/lib/careers";

const fieldClass = "h-11 min-h-11 text-base md:text-sm";

export function CareerApplicationForm({
  defaultInterest,
  acceptingApplications,
  heading,
}: {
  defaultInterest?: string;
  acceptingApplications: boolean;
  heading?: string;
}) {
  const interests = jobInterestOptions();
  const [values, setValues] = useState<CareerPayload>({
    ...emptyCareerPayload(),
    roleInterest: defaultCareerInterest(defaultInterest),
  });
  const [errors, setErrors] = useState<CareerFieldErrors>({});
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update<K extends keyof CareerPayload>(key: K, value: CareerPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function fieldError(id: keyof CareerFieldErrors) {
    const message = errors[id];
    if (!message) return null;
    return (
      <p id={`${id}-error`} className="mt-1 text-sm text-destructive" role="alert">
        {message}
      </p>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acceptingApplications) {
      setStatus("error");
      setServerMessage(careersContent.apply.unavailableBody);
      return;
    }

    const nextErrors = validateCareerPayload(
      values,
      cv ? { name: cv.name, size: cv.size, type: cv.type } : null,
    );
    setErrors(nextErrors);
    if (hasCareerErrors(nextErrors)) {
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
      if (cv) body.append("cv", cv);

      const response = await fetch("/api/careers", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as {
        message?: string;
        delivered?: boolean;
      };

      if (!response.ok || !result.delivered) {
        setStatus("error");
        setServerMessage(
          result.message ??
            "The application could not be delivered. No copy was stored on this site.",
        );
        return;
      }

      setStatus("success");
      setServerMessage(
        result.message ?? "Thank you. Your application was forwarded to the configured destination.",
      );
      setValues({
        ...emptyCareerPayload(),
        roleInterest: defaultCareerInterest(defaultInterest),
      });
      setCv(null);
      setErrors({});
    } catch {
      setStatus("error");
      setServerMessage(
        "The application could not be sent. Your CV was not stored on this site.",
      );
    }
  }

  if (!acceptingApplications) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-canvas px-5 py-6">
        <h3 className="text-lg font-semibold text-navy">
          {careersContent.apply.unavailableTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate">{careersContent.apply.unavailableBody}</p>
        <p className="mt-3 text-sm leading-6 text-slate">{careersContent.apply.expectedFields}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {heading ? <h3 className="text-lg font-semibold text-navy">{heading}</h3> : null}

      <div className="hidden" aria-hidden="true">
        <Label htmlFor="career-website">Website</Label>
        <Input
          id="career-website"
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
          <Label htmlFor="email">Email</Label>
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="country">Country</Label>
          <div className="mt-2">
            <CountrySelect
              id="country"
              countryName={values.country}
              countryCode={values.countryCode}
              required
              error={errors.country}
              onChange={(country) => {
                setValues((current) => ({
                  ...current,
                  country: country?.name ?? "",
                  countryCode: country?.code ?? "",
                }));
              }}
            />
          </div>
          {fieldError("country")}
        </div>
        <div>
          <Label htmlFor="roleInterest">Role or area of interest</Label>
          <select
            id="roleInterest"
            name="roleInterest"
            required
            className="mt-2 h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={values.roleInterest}
            aria-invalid={Boolean(errors.roleInterest)}
            aria-describedby={errors.roleInterest ? "roleInterest-error" : undefined}
            onChange={(event) => update("roleInterest", event.target.value)}
          >
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          {fieldError("roleInterest")}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Short message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 min-h-32"
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {fieldError("message")}
      </div>

      <div>
        <Label htmlFor="cv">CV</Label>
        <Input
          id="cv"
          name="cv"
          type="file"
          required
          accept={careerCvAccept}
          className="mt-2 h-11"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            if (file && file.size > CAREER_CV_MAX_BYTES) {
              setCv(null);
              event.target.value = "";
              setErrors((current) => ({
                ...current,
                cv: "CVs must be PDF, DOC, DOCX, or TXT and smaller than 5 MB.",
              }));
              return;
            }
            setCv(file);
            setErrors((current) => {
              const next = { ...current };
              delete next.cv;
              return next;
            });
          }}
          aria-invalid={Boolean(errors.cv)}
          aria-describedby={errors.cv ? "cv-error" : "cv-help"}
        />
        <p id="cv-help" className="mt-1 text-xs text-slate">
          {careerCvHelp}
        </p>
        {cv ? <p className="mt-1 text-xs text-ink">{cv.name}</p> : null}
        {fieldError("cv")}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="career-consent"
          checked={values.consent}
          onCheckedChange={(checked) => update("consent", checked === true)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <Label htmlFor="career-consent" className="text-sm leading-6 font-normal text-ink">
          I agree that Map & Merge Technologies may use this information to consider my
          application. See the{" "}
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
        {status === "loading" ? "Sending application…" : "Send application"}
      </Button>
    </form>
  );
}
