import { NextResponse } from "next/server";
import {
  hasCareerErrors,
  validateCareerPayload,
  type CareerPayload,
} from "@/lib/careers";
import { careersDeliveryConfigured, forwardCareersSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function cvMeta(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) return null;
  return { name: file.name, size: file.size, type: file.type };
}

export async function POST(request: Request) {
  if (!careersDeliveryConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message:
          "Applications cannot be delivered from this website yet. A destination has not been connected, so nothing was stored.",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const payload: CareerPayload = {
    fullName: readString(formData, "fullName"),
    email: readString(formData, "email"),
    country: readString(formData, "country"),
    countryCode: readString(formData, "countryCode"),
    roleInterest: readString(formData, "roleInterest"),
    message: readString(formData, "message"),
    consent: readString(formData, "consent") === "true",
    website: readString(formData, "website"),
  };

  const errors = validateCareerPayload(payload, cvMeta(formData.get("cv")));
  if (hasCareerErrors(errors)) {
    return NextResponse.json(
      { ok: false, delivered: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const result = await forwardCareersSubmission(formData);
  if (!result.delivered) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message:
          "The connected application service could not accept this request. The CV was not stored on this site.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: true,
    message: "Thank you. Your application was forwarded to the configured destination.",
  });
}
