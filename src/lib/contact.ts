import { siteConfig } from "@/content/site-config";

export type ContactPayload = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  inquiryCategory: string;
  projectDescription: string;
  preferredStartDate: string;
  budgetRange: string;
  consent: boolean;
  website: string;
  attachmentName?: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactPayload | "attachment", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export const contactFieldHelp = {
  required: "This field is required.",
  email: "Enter a business email address.",
  description: "Please describe the work in at least 20 characters.",
  consent: "Consent is required before we can receive this inquiry.",
  attachment:
    "Attachments must be PDF, DOC, DOCX, or TXT and smaller than 5 MB.",
  spam: "The submission could not be sent.",
};

export function validateContactPayload(
  payload: ContactPayload,
  attachment?: { name: string; size: number; type: string } | null,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (payload.website.trim()) {
    errors.website = contactFieldHelp.spam;
  }
  if (payload.fullName.trim().length < 2) {
    errors.fullName = contactFieldHelp.required;
  }
  if (payload.company.trim().length < 2) {
    errors.company = contactFieldHelp.required;
  }
  if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = contactFieldHelp.email;
  }
  if (!siteConfig.inquiryCategories.includes(payload.inquiryCategory as never)) {
    errors.inquiryCategory = "Select an inquiry category.";
  }
  if (payload.projectDescription.trim().length < 20) {
    errors.projectDescription = contactFieldHelp.description;
  }
  if (!payload.consent) {
    errors.consent = contactFieldHelp.consent;
  }
  if (
    payload.budgetRange &&
    !siteConfig.budgetRanges.includes(payload.budgetRange as never)
  ) {
    errors.budgetRange = "Select a listed budget range or leave this blank.";
  }
  if (attachment) {
    const typeOk =
      ALLOWED_ATTACHMENT_TYPES.includes(attachment.type) ||
      /\.(pdf|doc|docx|txt)$/i.test(attachment.name);
    if (!typeOk || attachment.size > MAX_ATTACHMENT_BYTES) {
      errors.attachment = contactFieldHelp.attachment;
    }
  }

  return errors;
}

export function hasContactErrors(errors: ContactFieldErrors) {
  return Object.keys(errors).length > 0;
}

export function emptyContactPayload(): ContactPayload {
  return {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    inquiryCategory: "",
    projectDescription: "",
    preferredStartDate: "",
    budgetRange: "",
    consent: false,
    website: "",
  };
}
