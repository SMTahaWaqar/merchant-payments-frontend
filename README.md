# Merchant Payments Dashboard (Frontend)

A modern **Next.js 13 App Router** frontend for merchants to track orders, payouts, and webhook activity.  
**Deployed on Vercel** with HTTPS; API is proxied via a Next.js rewrite to an EC2 backend.

---

## 🌐 Live URLs
- **Frontend (Production)**: `https://merchant-payments-frontend.vercel.app/`  ← **replace with your actual Vercel URL**
- **API Proxy (from browser)**: `https://merchant-payments-frontend.vercel.app//_api/health`
- **Direct API (dev only)**: `http://52.77.238.249:3001/health`

> The browser **must** use the HTTPS proxy path `/_api/...` to avoid mixed content. Do **not** call the EC2 IP directly from the frontend.

---

## 🧩 What you can do
- View **Dashboard** with live KPIs, currency mix, and recent activity
- Manage **Orders** (filters, pagination, open drawer, confirm/fail)
- Create & track **Payouts**
- Test **Webhooks** and inspect deliveries
- Manage **API Key** (masked display + rotate)

---

## 🛠 Tech Stack
- **Framework:** Next.js 13 (App Router, TS)
- **UI:** Ant Design + CSS Modules (no inline styles)
- **Data:** SWR + Axios
- **Deploy:** Vercel
- **Proxy:** Next.js `rewrites()` → `/ _api` → EC2 API

---

## 📦 Getting Started (local)

### 1) Clone & install
```bash
git clone https://github.com/<your-username>/merchant-payments-frontend.git
cd merchant-payments-frontend
npm ci
```

### 2) Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL="/_api"
```

### 3) Next.js rewrite proxy
`next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/_api/:path*',
        destination: 'http://52.77.238.249:3001/:path*', // EC2 API
      },
    ];
  },
};
module.exports = nextConfig;
```

### 4) Run locally
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 🚢 Deploy to Vercel

1) Push this repo to GitHub.  
2) In Vercel → **New Project** → import repo.  
3) **Environment Variable** (Production / Preview / Development):
   ```env
   NEXT_PUBLIC_API_URL="/_api"
   ```
4) Deploy.  
5) Verify the proxy works:
   ```
   https://<YOUR_VERCEL_URL>.vercel.app/_api/health  →  { "ok": true }
   ```

If you change your EC2 IP, update `next.config.js` → `destination` and redeploy.

---

## 🧭 Navigation (pages & components)

```
app/
  layout.tsx         # theme providers (AntD + SWR) + globals
  page.tsx           # Dashboard
  orders/            # Orders (server wrapper + client component)
  payouts/           # Payouts table + actions
  settings/          # API Key card
  developer/         # Webhooks panel
components/
  AppShell/          # Sidebar + Topbar shell
  Orders/            # Filters, Table, Drawer
  Payouts/           # Table + modal
  Developer/         # Endpoint + deliveries + test
  StatusBadge/       # Status chips
  UI/Button/         # Gradient buttons
  UI/Pill/           # Color pills
lib/
  fetcher.ts         # axios baseURL + fetcher
  orders.ts          # types + SWR hook
  format.ts          # money/number/time helpers
```

---

## 🧰 Troubleshooting
- **Mixed content blocked**: ensure all calls use `/_api/...` (proxy), remove any `http://52.77.238.249:3001` in code/env.  
- **Orders page build error** (`useSearchParams`): the page uses a server wrapper + client component in `<Suspense>` to satisfy Next.js constraints.  
- **CORS**: browser calls Vercel → Vercel calls EC2; CORS is not hit by the browser in this setup.

---

## 📜 License
MIT
