import { NextResponse } from "next/server";
import {
  hasContactErrors,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";

export const runtime = "nodejs";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload: ContactPayload = {
    fullName: readString(formData, "fullName"),
    company: readString(formData, "company"),
    email: readString(formData, "email"),
    phone: readString(formData, "phone"),
    country: readString(formData, "country"),
    inquiryCategory: readString(formData, "inquiryCategory"),
    projectDescription: readString(formData, "projectDescription"),
    preferredStartDate: readString(formData, "preferredStartDate"),
    budgetRange: readString(formData, "budgetRange"),
    consent: readString(formData, "consent") === "true",
    website: readString(formData, "website"),
  };

  const attachment = formData.get("attachment");
  const file =
    attachment instanceof File && attachment.size > 0
      ? { name: attachment.name, size: attachment.size, type: attachment.type }
      : null;

  const errors = validateContactPayload(payload, file);
  if (hasContactErrors(errors)) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        website: undefined,
        attachmentName: file?.name ?? null,
      }),
    });
    if (!forwarded.ok) {
      return NextResponse.json(
        { ok: false, message: "The connected inquiry service could not accept this request." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      ok: true,
      message: "Thank you. Your inquiry was forwarded to the configured destination.",
    });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. This environment is using the mock handler, so the inquiry was validated and not stored. Connect CONTACT_WEBHOOK_URL to send it to email, an API, or a CRM.",
  });
}
