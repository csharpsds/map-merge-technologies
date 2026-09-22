import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesTrigger } from "@/components/cookie-banner";
import { configuredContactEntries, siteConfig } from "@/content/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const contactEntries = configuredContactEntries();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Image
            src={siteConfig.brand.logo}
            alt="Map & Merge Technologies"
            width={200}
            height={44}
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm font-medium text-cyan">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Philippines-based MuleSoft and enterprise integration consulting for
            organizations that need secure, reusable connections between applications
            and data.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerServices.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Company
          </h2>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerCompany.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Insights
          </h2>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerInsights.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium text-white">Start a conversation</p>
          <Link
            href="/contact"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-cyan hover:text-white"
          >
            {siteConfig.cta.bookConsultation}
          </Link>
          {contactEntries.length > 0 ? (
            <ul className="mt-4 space-y-1 text-sm text-white/70">
              {contactEntries.map((entry) => (
                <li key={entry.label}>
                  {entry.href ? (
                    <a href={entry.href} className="hover:text-white">
                      {entry.value}
                    </a>
                  ) : (
                    entry.value
                  )}
                </li>
              ))}
            </ul>
          ) : null}
          {siteConfig.social.linkedin ? (
            <a
              href={siteConfig.social.linkedin}
              className="mt-3 inline-block text-sm text-white/70 hover:text-white"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs leading-5 text-white/55 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms and Conditions
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
            <CookiePreferencesTrigger className="text-left hover:text-white" />
          </div>
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.legalDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
