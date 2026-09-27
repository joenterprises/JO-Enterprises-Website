# JO Enterprises — Quote + Lightweight CRM

## What was repaired

1. `/print-products` no longer becomes empty when the production Product table is empty/unavailable.
   It uses the PostgreSQL catalogue when available and a built-in catalogue fallback otherwise.
2. Quote submission now saves the enquiry and then navigates directly to:
   `https://wa.me/919445573457`
   with the enquiry details pre-filled.
3. The previous submission flow had a control-flow bug: after a successful response it could fall through to `throw`, which changed the UI to an error state.
4. `/admin` is now a small CRM with login, enquiry search, status filtering, status changes and one-click WhatsApp follow-up.
5. The uploaded `.env` file was deliberately removed from this package.

## Vercel environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL` = your Prisma PostgreSQL connection string
- `ADMIN_PASSWORD` = a strong private password for `/admin`

The browser-based WhatsApp flow does not require WhatsApp Cloud API credentials.

## Database

The existing Prisma PostgreSQL schema already contains `Inquiry.status`, so no schema change is required for the CRM status pipeline.

If the Product table is empty, the public print-products page still works because it has a fallback catalogue. You may optionally seed the database:

```bash
npm run db:seed
```

Run this only when `DATABASE_URL` points to the intended PostgreSQL database.

## Important security step

The original uploaded project contained environment secrets. Rotate/revoke the exposed database/Prisma and WhatsApp credentials in their respective services, then set fresh values in Vercel.

## Deployment

1. Replace the project files with this repaired version.
2. Set `DATABASE_URL` and `ADMIN_PASSWORD` in Vercel.
3. Redeploy.
4. Open `/print-products` and confirm the catalogue is visible.
5. Submit a quote and confirm WhatsApp opens with the reference number.
6. Open `/admin/login`, sign in, and test status changes.

The reference image selected in the quote form cannot be physically attached to a `wa.me` URL. The customer is instructed to attach the selected image manually in the opened WhatsApp chat. If automatic image delivery is required, the next step is adding object storage (for example Vercel Blob/S3) and WhatsApp Cloud API media handling.
