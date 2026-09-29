# Digital Menu — Zero-Cost Stack

Next.js (hosted free on Vercel) + Supabase (free Postgres DB, Auth, and file storage).
The owner logs in himself and edits the menu — no code, no git push needed.

## 1. Create a free Supabase project
1. Go to https://supabase.com → New project (free tier).
2. Once created, go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
3. Go to **Storage** → Create bucket → name it `menu-images` → set it to **Public**.
4. Go to **Settings → API** → copy the `Project URL` and `anon public` key.

## 2. Configure the project
1. Copy `.env.local.example` to `.env.local` and paste in the values from step 1.4.
2. In `next.config.mjs`, the `*.supabase.co` pattern already matches any Supabase
   project, so no edit needed there.

## 3. Create the restaurant + the owner's login
Supabase Auth's magic-link login means the owner never sets a password.
1. In Supabase Dashboard → **Authentication → Users → Add user**, add the owner's email
   (or just have him visit `/admin/login` once — the row appears automatically).
2. In **Table Editor → restaurants**, insert one row:
   - `slug`: e.g. `orange` (this becomes the URL: `/en/menu/orange`)
   - `name`: e.g. `Orange`
   - `owner_id`: paste the owner's user id from the Authentication tab
3. That's it — the owner can now log in at `/admin/login` and only sees/edits
   his own restaurant's categories and products (enforced by the RLS policies
   in `schema.sql`, not just the UI).

## 4. Run it locally to test
```bash
npm install
npm run dev
```
Visit `http://localhost:3000/en/menu/orange` and `http://localhost:3000/admin/login`.

## 5. Deploy for free
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. Add the same two environment variables from `.env.local` in Vercel's project settings.
4. Deploy. You get a free `your-project.vercel.app` URL immediately.
5. (Optional) Point a custom domain at it — Vercel's side is free, you only pay
   the domain registrar (~$10–15/year), which is the only cost in this whole stack.

## What the owner can do himself
- Add/remove categories and products
- Upload product photos (auto-optimized by `next/image` on the public menu page)
- Toggle items as "available"/"hidden" instantly (e.g. sold out)
- Edit prices

## Notes
- Add an "Add Category" edit/delete UI the same way products were done, if needed —
  the dashboard currently supports adding categories and full CRUD on products.
- For Arabic name/description fields (`name_ar`, `description_ar`), extend the
  dashboard forms with extra inputs — the DB columns already exist in the schema.
