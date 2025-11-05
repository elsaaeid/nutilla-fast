# Nutilla Fast

>A small Next.js e-commerce demo for selling Nutella-style products. Includes product management (admin), a persistent cart with anonymous-user support, and PayPal checkout integration.

## Contents
- Project: Next.js (Pages router)
- API: Next.js API routes backed by MongoDB (Mongoose)
- Client state: Redux Toolkit (cart slice)
- Image uploads: Cloudinary (unsigned preset used in UI)
- Payments: PayPal JS SDK (sandbox support via NEXT_PUBLIC_PAYPAL_CLIENT_ID)

## Used technologies
- Next.js (React) — SSR / API routes / routing
- React 18
- Redux Toolkit — client-side cart state
- Mongoose + MongoDB (Atlas recommended for production)
- Axios — HTTP client
- Cloudinary — image hosting / uploads (client-side unsigned preset)
- @paypal/react-paypal-js — PayPal integration
- bcryptjs — password hashing (auth helpers)
- react-icons — UI icons
- CSS Modules — component-scoped styles

## Features
- Admin product creation, edit and delete (protected)
- Product listing and details pages
- Add to cart for anonymous and logged-in users
- Anonymous cart persisted to server and localStorage; merged into user cart on login
- Quantity controls, remove & clear cart
- PayPal checkout integration (sandbox by default)

## Getting started (local development)
1. Clone the repo and install dependencies

```powershell
git clone <your-repo-url>
cd nutilla-fast
npm install
```

2. Create a `.env.local` in the project root with the required environment variables (example):

```
MONGO_URL=<your-mongo-connection-string>
TOKEN=<dev-admin-token>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=sb
# Optional Cloudinary unsigned preset values if used in UI
# CLOUDINARY_CLOUD_NAME=dzbi59kmu
# CLOUDINARY_UPLOAD_PRESET=jwukjk1g
```

3. Run in development

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
npm run start
```

## Environment variables
- `MONGO_URL` — MongoDB connection string (required for API routes)
- `TOKEN` — development admin token used by server APIs (or use DB user role 'admin')
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` — PayPal client id (use `sb` for sandbox)
- Cloudinary config (if using server-signed uploads in future)

## API routes of interest
- `GET /api/products` — list products
- `POST /api/products` — create product (admin)
- `GET|PUT|DELETE /api/products/[id]` — product CRUD (PUT/DELETE protected)
- `GET|POST /api/cart` — get or persist cart; supports anonymous cartId and merging on login
- `POST /api/login`, `POST /api/register`, `GET /api/me` — simple auth endpoints (dev cookie/token based)

## Deploying to Vercel (quick)
1. Push repository to GitHub/GitLab/Bitbucket
2. Import the repo in Vercel and choose Next.js
3. Add Environment Variables in Vercel dashboard (MONGO_URL, TOKEN, NEXT_PUBLIC_PAYPAL_CLIENT_ID, etc.)
4. Deploy — Vercel builds and serves the app; check serverless logs for runtime errors

See the project `README` or Vercel docs for more details.

## Project structure (high level)
- `pages/` — Next.js pages and API routes
	- `pages/api/` — server API routes
- `components/` — shared React components (Navbar, ProductCard, Add, Cart)
- `models/` — Mongoose models (Product, Cart, User)
- `redux/` — Redux store and slices
- `util/` — helpers (db connect)
- `styles/` — CSS modules and global styles

## Notes & Recommendations
- In production, replace the dev cookie/token auth with proper sessions or JWTs.
- Consider using signed Cloudinary uploads or a server-side upload flow for better security.
- Add server-side merge tests and more robust validation before production usage.

## License
This repository does not include a license file. Add one if you intend to publish this project.

---
If you want, I can add a short `vercel.json` and a GitHub Actions workflow to run the build on PRs — tell me which you'd prefer next.
