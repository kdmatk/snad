# Cloudflare migration status — 2026-10-27

- Source: kdmatk/snad at b70aed09cba57aab304133334ef4efa725ec2dfa.
- Supabase: crdqvjbezdgjxqitwmns (snad), active and healthy.
- Account: 0983420e9f4d4af1a8b02fc71a8903df.
- Worker: snad-legal; deployment 336f11c89a7e4a3e9322011f745197d4.
- Public staging: https://snad-legal.mdyafalarabia.workers.dev/.
- Zone: 16a94c25151404c8231c75f43b3ba751, active on Cloudflare.
- Both snadlegal.org and www.snadlegal.org are attached to the Worker.
- Namecheap nameservers were changed and saved to deborah.ns.cloudflare.com and kareem.ns.cloudflare.com. Recursive caches may temporarily retain the old nameservers.
- Cloudflare activation completed at 2026-10-27T04:21:59.937040Z.
- Current registrar: Namecheap. The nameserver change was completed through an authenticated session.
- Five existing MX records and SPF were copied into Cloudflare.
- Namecheap showed no configured Email Redirect or Catch-All before the change. DNSSEC was off.

## Rollback / original web DNS

The registrar nameserver delegation was updated. The old DNS configuration remains available as a rollback reference. The original web records were:

| Name | Type | Value |
| --- | --- | --- |
| snadlegal.org | A | 216.198.79.1 |
| www.snadlegal.org | CNAME | 4cf5ac9df55514f4.vercel-dns-017.com |

Keep the old hosting and Lovable project until domain, authentication and email checks pass.

## Validation

Build, TypeScript and changed-file ESLint pass. Nine Worker checks pass (valid request,
method, role validation, request-size limit, origin check, rate limit, health, unknown API,
asset delegation). The public Cloudflare page and Supabase-backed list of 17 lawyers load
in the browser. The sign-in page loads; no real customer login or transaction was performed.
Workers AI answered an Arabic platform-services question successfully.

## Source and deployment

The GitHub App now has access to kdmatk/snad. Migration changes are stored in GitHub.
Cloudflare Workers Builds is connected to kdmatk/snad on branch `main`.
Automatic builds are enabled, with a registered build token and production trigger.
The first pipeline validation was started on 2026-10-27; deployment success must be checked in build history.
Use build command `npm run build` and deployment command `npx wrangler deploy`, with root `/`.
Supabase credentials and database content are unchanged.

The Supabase compatibility function was deployed as version 9 with JWT verification
kept enabled. A request through the existing Supabase endpoint returned HTTP 200
and an Arabic AI answer after the migration.

Cloudflare reports the zone active. Custom-domain HTTP verification is separate from zone activation;
the workers.dev address remains available as a fallback.
