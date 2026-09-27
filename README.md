# JO Enterprises Website

Next.js 14 + Prisma website for JO Enterprises.

## What was fixed in this revision

- Print Products no longer depends on a database query to render the public catalogue.
- Added the requested Print Products mega-menu with six product groups.
- Added anchors from the mega-menu to each product.
- Fixed the quote form WhatsApp flow:
  - WhatsApp tab is opened synchronously from the submit click.
  - The API response no longer falls through into an error after a successful submission.
  - A manual WhatsApp button remains available if the browser blocks the popup.
  - Meta WhatsApp Cloud API credentials are no longer required for the normal customer-to-business flow.
- Kept the enquiry in PostgreSQL for the lightweight CRM.
- Added a database migration that safely adds the `Inquiry.category` column if an older production database is missing it.
- Added a protected `/admin` CRM route using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- Updated the quotation category labels to:
  - Basic (Cost Effective)
  - Premium (Quality Matters)
  - Elite (Luxourious)
- Kept the optional reference image limit at 3 MB.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set a valid PostgreSQL `DATABASE_URL`.
3. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
4. Install dependencies:

```bash
npm install
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

6. Apply migrations:

```bash
npx prisma migrate deploy
```

7. Seed the print-product records:

```bash
npm run db:seed
```

8. Run:

```bash
npm run dev
```

## Production deployment

Push the project to the GitHub repository, then connect that repository to Vercel.

Recommended Vercel settings:

- Framework: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave default
- Node.js: use the version supported by your project/lockfile

Production environment variables:

- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

After the first production deployment, run the Prisma migrations against the production database before testing `/admin`:

```bash
npx prisma migrate deploy
npm run db:seed
```

Do not commit `.env`, `.env.local`, or production secrets.

## GoDaddy domain

In Vercel, open the project and go to Settings -> Domains. Add:

`joenterprises-printshop.co.in`

Also add the `www` version if you want it available:

`www.joenterprises-printshop.co.in`

Vercel will display the exact DNS records required for your project. If DNS is managed at GoDaddy, add those records in GoDaddy DNS. For an apex domain Vercel commonly uses an A record; for `www`, it uses a CNAME. Use the exact values Vercel displays for this project.

After DNS verification, Vercel provisions HTTPS automatically.

## Important

The original development ZIP contained a `.env` file. This corrected package intentionally excludes it. If the original credentials were ever exposed to anyone else, rotate the database and WhatsApp/API credentials before production use.
