# APM-WMS

APM-WMS is a web-based warehouse management starter application.

Implemented scope:
- Item Master
- Goods Receipt Creation and Processing
- Inventory table
- Location Master
- Sales Order Creation and Processing

## Supabase setup

This project is prepared for Supabase using the official `@supabase/supabase-js` client.

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add your project URL and publishable key.
4. Open the Supabase SQL Editor and run `supabase/schema.sql`.
5. Install dependencies and start the app.

Environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The `Item Master` page already reads from Supabase when the environment variables and `items` table are available. If Supabase is not configured yet, it falls back to mock data.

## Open in VS Code

```bash
code "C:\Akshay\Projects\APM-WMS"
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project structure

- `app/page.tsx` dashboard
- `app/items/page.tsx` item master with Supabase read integration
- `app/goods-receipts/page.tsx` goods receipt creation and processing
- `app/inventory/page.tsx` inventory table
- `app/locations/page.tsx` location master
- `app/sales-orders/page.tsx` sales order creation and processing
- `lib/mock-data.ts` starter warehouse data
- `lib/warehouse-service.ts` data access layer
- `lib/supabase/server.ts` server-side Supabase client
- `lib/supabase/types.ts` database types
- `supabase/schema.sql` schema and seed data
- `.vscode/launch.json` VS Code debugging setup

## Suggested next steps

- Add insert and update actions for all modules
- Add Supabase Auth and role-based access
- Replace remaining mock tables with live Supabase reads
- Add transaction logic between receipts, inventory, and sales orders
