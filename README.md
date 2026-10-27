# سند — منصة الخدمات القانونية

React + Vite frontend with Supabase project `crdqvjbezdgjxqitwmns`.
Hosting: Cloudflare Workers Static Assets. Production domain: https://snadlegal.org.
Worker address: https://snad-legal.mdyafalarabia.workers.dev.

## Development and deployment

```sh
npm ci
npm run dev
npm run deploy
```

`npm run deploy` builds `dist/` and deploys using the authenticated Cloudflare account.
The deployment configuration is in `wrangler.jsonc`. The root directory is this repository root.
Cloudflare Builds can use build command `npm run build` and deploy command `npx wrangler deploy`.
Do not commit Cloudflare API tokens; use the Cloudflare dashboard or authenticated Wrangler.

## Backend

Supabase continues to provide authentication, database and storage; no data migration is needed.
`/api/health` reports Worker availability. `/api/customer-support` uses Workers AI with a per-IP
limit of 10 requests per minute. The existing support component is not mounted in the current
application layout; this migration does not add UI. Its API is ready independently of Lovable.
The Supabase `ai-customer-support` function (version 9) is a compatibility proxy to this Worker, and preserves the legacy endpoint without a Lovable API key.

## Domain cutover

The Cloudflare zone must be active before custom domains can finish certificate provisioning.
Assigned authoritative nameservers:

- deborah.ns.cloudflare.com
- kareem.ns.cloudflare.com

The nameserver change was saved in Namecheap. There were no configured email forwards.
Existing MX and SPF records were copied; zone activation and custom-domain HTTPS are pending.
Keep the original hosting available until the domain and login flows have been checked.
