export function contactDestination() {
  return process.env.CONTACT_WEBHOOK_URL?.trim() || "";
}

export function careersDestination() {
  return process.env.CAREERS_WEBHOOK_URL?.trim() || contactDestination();
}

export function contactDeliveryConfigured() {
  return Boolean(contactDestination());
}

export function careersDeliveryConfigured() {
  return Boolean(careersDestination());
}

const CAREER_FORWARD_FIELDS = [
  "fullName",
  "email",
  "country",
  "countryCode",
  "roleInterest",
  "message",
  "consent",
] as const;

export async function forwardCareersSubmission(formData: FormData) {
  const destination = careersDestination();
  if (!destination) {
    return { delivered: false as const, reason: "unconfigured" as const };
  }

  const outbound = new FormData();
  for (const field of CAREER_FORWARD_FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") outbound.append(field, value);
  }

  const cv = formData.get("cv");
  if (cv instanceof File && cv.size > 0) {
    outbound.append("cv", cv, cv.name);
    outbound.append("cvName", cv.name);
    outbound.append("cvType", cv.type);
    outbound.append("cvSize", String(cv.size));
  }
  outbound.append("source", "map-merge-careers");

  try {
    const response = await fetch(destination, {
      method: "POST",
      body: outbound,
    });
    if (!response.ok) {
      return { delivered: false as const, reason: "destination" as const };
    }
    return { delivered: true as const };
  } catch {
    return { delivered: false as const, reason: "destination" as const };
  }
}

export async function forwardContactSubmission(payload: Record<string, unknown>) {
  const destination = contactDestination();
  if (!destination) {
    return { delivered: false as const, reason: "unconfigured" as const };
  }

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return { delivered: false as const, reason: "destination" as const };
    }
    return { delivered: true as const };
  } catch {
    return { delivered: false as const, reason: "destination" as const };
  }
}
