# Snad administration dashboard — selected direction 1

final result: passed

## Source and captured evidence

- Source visual truth: `/workspace/scratch/10dab1f5e471/generated_images/exec-be591d27-c03e-4262-8127-96d7762070c5.png`, first displayed generated option, selected by the user.
- Local implementation: `http://terminal.local:4173/qa-admin-dashboard.html` (ignored, dev-only fixture of the actual `AdminWorkspaceView`; illustrative rows and applicant names are never committed or deployed).
- Full-view evidence: `/workspace/scratch/snad-admin-comparison-final.jpg`.
- Focused comparison: `/workspace/scratch/snad-admin-focus-final.jpg`.
- Mobile evidence: `/workspace/scratch/snad-admin-mobile-final.jpg`.
- Source pixels and implementation CSS viewport: 1488 × 1056, density 1. Both rendered at the same 0.436828 scale in the full comparison screenshot (650 × 461 visible area per panel). Focused comparison uses unscaled 640 × 660 crops at x580/y390 of each original, so table typography and controls can be judged at native size. Browser captured host viewport: 1363 × 936.
- Mobile CSS frame: 390 × 844, usable document width 382; measured scrollWidth 382, no horizontal overflow.
- State: overview with four requests, pending/incomplete applicant examples. Production uses authenticated backend data and can therefore have fewer rows and truthful empty states.

## Comparison history and findings

1. Initial full comparison (`snad-admin-comparison-1.jpg`) showed P2 table metadata at 12px, weak title hierarchy and a search control consuming disproportionate width. Initial result blocked.
2. Increased metadata/status/body sizes to 14px, service titles to 16px/700, page heading to 48px and stat labels to 18px. Constrained request search to 190px and selectors to 150px with the primary review action at the opposite edge.
3. Recaptured and compared both final full view and focused native crops. Typography is readable, table hierarchy and spacing match the intended admin surface. No actionable P0/P1/P2 differences remain. A premature blank iframe screenshot was discarded; final evidence was captured after the UI rendered.

## Required fidelity surfaces

- **Fonts and typography:** existing Cairo font, explicit 14–16px table text and 48px desktop heading, semantic Arabic headings, readable wrapping, 32px mobile heading. Font weight adjusted after native comparison.
- **Spacing and layout:** right fixed navy 228px navigation, utility header, three operational counters, large request table with a narrower left applicant queue. Consistent 28px main margins, 20px metric gaps, restrained 7px surfaces and thin separators. Mobile drawer and table-as-cards preserve controls.
- **Colors and tokens:** navy #17384f, gold #b2934d, warm/blue/rose metric icon surfaces, restrained blue links and semantic state colors. Flat gold action avoids unnecessary decorative effects.
- **Images/assets:** supplied existing Brand component; standard Lucide scales/logo and line icons are reused consistently with the actual product. Applicant/profile icons are generic UI identity glyphs, not substituted photos; source itself uses generic person glyphs. No photographic, hero or custom raster assets occur in this screen, so no asset generation was required.
- **Copy/content:** dates and time use Asia/Dubai; counts are exact database counts, new requests are explicitly last seven days. Pending and incomplete lawyer files are distinguished. Real status labels replace illustrative mock wording. No fake revenue, growth, unread notification counts, approval or completed-request examples are introduced in production.

## Interaction verification

Browser-tested using the actual presentational component:

- Request detail dialog opens the correct number, title, status, timestamps, optional budget and attachment count; no missing-date fallback to creation time.
- Request-number search; clearing; combined category/status filters; unmatched search empty state.
- Header search opens the request section with the submitted query.
- Mobile drawer opens, navigates to requests and closes; mobile request detail dialog opens correctly.
- Populated overview and empty overview verified. Error state shows retry actions and em dashes instead of invented counts.
- Drawer uses accessible Radix focus behavior; controls have explicit labels and focus outlines. Escape closes utility popovers.
- Browser logs inspected: extension metadata transport errors only; no application-origin runtime errors in final local checks.

## Data and regression checks

- TypeScript, ESLint on changed source, Vite production build and git diff whitespace checks passed.
- Read-only Supabase schema/status verification found two real open legal_cases and 18 approved lawyer rows at inspection time. Live counters must follow actual records rather than these report snapshots.
- Requests are paginated at the server with exact counts and descending created_at/id ordering; filters/search are applied before range. Linked lawyer names use lawyers.user_id because case.lawyer_id references auth.users.id.
- Queries are enabled only with the existing authenticated admin state and keyed by admin ID. Auth/RLS policies and credentials are unchanged.
- Lawyer queue review links open the existing real lawyer management dialog by row ID; pending/incomplete filter includes both states. Overview refresh invalidates after lawyer data loads.
- Remaining legacy illustrative sections (clients/services/payments/articles/settings) are explicitly labeled as illustrative. Quick services and lawyer management retain their existing live integrations.
- Existing bundle-size and Browserslist-age warnings remain nonblocking.

## Test limits and follow-up

No real legal case, lawyer approval/rejection, payment, settings write, or customer record was modified for testing. Request details are read-only; assigning lawyers/changing case status is not added by this design task. Legacy illustrative sections require a separate data-integration task. Existing backend authorization policies were not audited or repaired in this UI change.

- [x] Resolve selected visual option.
- [x] Compare actual rendered full and focused views; fix P2 differences.
- [x] Verify mobile controls, empty/error states and primary read-only interactions.
- [x] Verify type/lint/build checks.
- [x] Keep fixtures/reference images excluded from git and remote production build.
