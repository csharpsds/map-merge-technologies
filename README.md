# Map & Merge Technologies

Corporate website for **Map & Merge Technologies**, a Philippines-based MuleSoft and enterprise integration consultancy.

Tagline: **Transforming Data. Connecting Systems.**

This is original Map & Merge brand work. It is not a copy of Cerena Solutions or ScaleFocus.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- shadcn/ui primitives
- Lucide React icons

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dev server binds to [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server on port 43127 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on port 43127 |

## Environment variables

All variables are optional. See `.env.example`.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap, and JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Display email (hidden when empty) |
| `NEXT_PUBLIC_CONTACT_PHONE` | Display phone (hidden when empty) |
| `NEXT_PUBLIC_CONTACT_STREET` | Display street (hidden when empty) |
| `NEXT_PUBLIC_CONTACT_CITY` | Display city (hidden when empty) |
| `NEXT_PUBLIC_LINKEDIN_URL` | Footer LinkedIn link (hidden when empty) |
| `CONTACT_WEBHOOK_URL` | Server-only destination for contact-form JSON |
| `CAREERS_WEBHOOK_URL` | Server-only destination for career applications (multipart, includes the CV). Falls back to `CONTACT_WEBHOOK_URL` when unset. |

Do not invent public email, phone, or office details in the UI. Add them only through this configuration.

## Contact form integration

The form posts to `POST /api/contact`.

1. Client-side validation runs first (required name, company, email, category, description, consent). Country is optional and uses an ISO 3166-1 searchable lookup.
2. A hidden `website` field is a honeypot.
3. If `CONTACT_WEBHOOK_URL` is unset, the API validates the payload and returns `delivered: false` without storing files. The page does not claim the inquiry was sent.
4. If the webhook is set, the API forwards JSON (without the honeypot) and only then reports that the inquiry was forwarded.

To connect a real destination later:

- Email: point the webhook at a provider such as Resend, Formspree, or an Azure Logic App.
- CRM: map the JSON fields into Salesforce or another system.
- Attachments: the unconfigured handler does not persist files.

## Careers

`/careers` is driven by `src/content/jobs.ts`.

- Leave `jobs` as `[]` when there are no vacancies. The page shows a “No open positions right now” state and does not invent roles.
- Add a real opening by pushing an object onto `jobs` with `slug`, `title`, `location`, `employmentType`, `summary`, and `description` paragraphs. That object becomes a card and a `/careers/<slug>` page.
- Do not use the slug `apply` — that path is the general application form.

The application form posts to `POST /api/careers` as multipart data (including the CV).

- If `CAREERS_WEBHOOK_URL` or `CONTACT_WEBHOOK_URL` is set, the API forwards the fields and CV file. It does not write CVs to public URLs or log file contents.
- If neither destination is set, the form shows an unavailable state and the API returns 503. The site never reports that an application was received unless a destination accepted it.

Country on both Contact and Careers uses `i18n-iso-countries` (ISO 3166-1 names and alpha-2 codes). There is no IP-based country prefill.

## Content editing

Page copy lives in typed files, not in the layouts:

- `src/content/site-config.ts` — name, tagline, footer nav, stats, CTAs, legal disclaimer, contact/social
- `src/content/nav.ts` — desktop mega-menu and mobile accordion groups (includes Careers)
- `src/content/services.ts`
- `src/content/solutions.ts`
- `src/content/industries.ts`
- `src/content/case-studies.ts`
- `src/content/articles.ts`
- `src/content/engagement-models.ts`
- `src/content/expertise.ts`
- `src/content/process.ts`
- `src/content/jobs.ts` — published vacancies only; empty by default
- `src/content/careers.ts` — careers page copy

Experience indicators are only the four supportable claims in `siteConfig.stats`. Do not add customer totals, certification counts, or partnership status unless they are verified.

Insights articles are local mock data shaped for a later CMS. Each article has sections, takeaways, and related-article matching by category.

Desktop navigation uses hover and keyboard-focus mega-menus. The hero diagram shifts slightly with the pointer and stays still when `prefers-reduced-motion` is set.

## Brand assets

- Wordmark: `public/brand/map-merge-logo.png`
- Icon: `public/brand/map-merge-icon.png`
- Favicon: `src/app/icon.png` (copied from the icon)

## Deployment

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Add contact and LinkedIn values only when they are real.
3. Set `CONTACT_WEBHOOK_URL` if contact inquiries should be forwarded.
4. Set `CAREERS_WEBHOOK_URL` (or reuse `CONTACT_WEBHOOK_URL`) before the careers form will accept applications.
5. Run `npm run build`.
6. Host with any Node-compatible platform that can run `next start`, or a provider with a Next.js adapter.

Have legal review the privacy, terms, and cookie pages before public launch. Those pages are working drafts and still contain configuration placeholders.

## Legal note

MuleSoft, Anypoint Platform, Salesforce, and related marks are trademarks of their respective owners. Map & Merge Technologies is not represented as an official partner unless explicitly stated.
