import { isCountryCode } from "@/lib/countries";
import { jobInterestOptions } from "@/content/jobs";

export type CareerPayload = {
  fullName: string;
  email: string;
  country: string;
  countryCode: string;
  roleInterest: string;
  message: string;
  consent: boolean;
  website: string;
};

export type CareerFieldErrors = Partial<Record<keyof CareerPayload | "cv", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CAREER_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
export const CAREER_CV_MAX_BYTES = 5 * 1024 * 1024;
export const careerCvAccept =
  ".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
export const careerCvHelp =
  "PDF, DOC, DOCX, or TXT up to 5 MB. The file is forwarded only when a delivery destination is configured. It is not published or stored on this site.";

export function emptyCareerPayload(): CareerPayload {
  return {
    fullName: "",
    email: "",
    country: "",
    countryCode: "",
    roleInterest: "",
    message: "",
    consent: false,
    website: "",
  };
}

export function validateCareerPayload(
  payload: CareerPayload,
  cv?: { name: string; size: number; type: string } | null,
): CareerFieldErrors {
  const errors: CareerFieldErrors = {};
  if (payload.website.trim()) {
    errors.website = "The submission could not be sent.";
  }
  if (payload.fullName.trim().length < 2) {
    errors.fullName = "This field is required.";
  }
  if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = "Enter an email address.";
  }
  if (!isCountryCode(payload.countryCode) || !payload.country.trim()) {
    errors.country = "Select a country from the list.";
  }
  if (!jobInterestOptions().includes(payload.roleInterest)) {
    errors.roleInterest = "Select a role or area of interest.";
  }
  if (payload.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters.";
  }
  if (!payload.consent) {
    errors.consent = "Consent is required before we can send an application.";
  }
  if (!cv) {
    errors.cv = "Attach a CV in PDF, DOC, DOCX, or TXT format.";
  } else {
    const typeOk =
      CAREER_CV_TYPES.includes(cv.type) || /\.(pdf|doc|docx|txt)$/i.test(cv.name);
    if (!typeOk || cv.size > CAREER_CV_MAX_BYTES) {
      errors.cv = "CVs must be PDF, DOC, DOCX, or TXT and smaller than 5 MB.";
    }
  }
  return errors;
}

export function hasCareerErrors(errors: CareerFieldErrors) {
  return Object.keys(errors).length > 0;
}
