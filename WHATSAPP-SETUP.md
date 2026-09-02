# WhatsApp enquiry setup

The quote form now:
1. Saves the enquiry (including Budget) to Prisma.
2. If WhatsApp Cloud API is configured, sends an automatic WhatsApp template notification to +91 94455 73457.
3. If Cloud API is not configured, shows a "Continue on WhatsApp" fallback with the enquiry pre-filled; the customer must press Send.

## Required server environment variables

Set these on your hosting platform (not in client code):

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_TEMPLATE_NAME`
- `WHATSAPP_TEMPLATE_LANGUAGE` (default `en_US`)
- `WHATSAPP_GRAPH_VERSION` (default `v23.0`)

The approved WhatsApp template must have 8 body variables in this order:

1. name
2. phone
3. email
4. product / service
5. quantity / size
6. budget
7. requirements
8. reference

Example template body:

New quotation enquiry - JO Enterprises
Reference: {{8}}
Name: {{1}}
Phone: {{2}}
Email: {{3}}
Product: {{4}}
Quantity: {{5}}
Budget: {{6}}
Requirements: {{7}}

Important: WhatsApp Cloud API requires an approved template for business-initiated messages. A `wa.me` URL cannot silently send a message; it only opens WhatsApp for the customer to press Send.

## Prisma

Because `budget` was added to `Inquiry`, run the normal database migration/push for your deployment:

`npx prisma db push`

or use your normal production migration workflow.
