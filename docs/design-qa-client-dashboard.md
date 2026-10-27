# Snad client dashboard — selected design 1

Source visual truth: `/workspace/scratch/10dab1f5e471/generated_images/exec-2a0381de-bf8b-4eb3-ba5b-cd35f647c521.png` (1488 × 1056 pixels).
Implementation: browser-rendered React dashboard, `http://terminal.local:4173/client-dashboard`.
Same-state comparison: isolated, git-ignored development entry renders the actual `ClientDashboardView` with two illustrative requests and a confirmed future consultation; no customer records read or created for this fixture. This entry is not imported into the production application or committed.
Viewport: desktop iframe 1488 × 1056 CSS pixels, density 1; source displayed at the same dimensions without scaling. Mobile iframe 390 × 844 CSS pixels (382px content width plus scrollbar). Full comparison capture is 2990 × 2016 pixels including source, implementation, labels and mobile artboard.

## Findings and comparison history

1. Initial combined browser capture: `/workspace/scratch/snad-client-comparison-1.jpg`.
   - P2: table text and metadata noticeably undersized relative to the source. Increased table typography to 15px, metadata to 12px and restored clearer status/link weights.
   - P2: mobile desktop-table scrolling concealed request status in the initial view. Changed mobile rows to two-column cards with service, lawyer, status, date and details visible together.
   - P2: closed off-canvas mobile sidebar remained available to keyboard/accessibility navigation. Added visibility gating when closed.
   - P3: active sidebar edge placed on the wrong side. Moved it to the left, matching the visual source.
2. Revised combined capture: `/workspace/scratch/snad-client-comparison-2.jpg`.
3. Final combined source + browser evidence: `/workspace/scratch/snad-client-comparison-final.jpg`.
   Focused source/implementation table-and-appointment comparison: `/workspace/scratch/snad-client-focused.jpg`.
   Earlier findings resolved. No actionable P0/P1/P2 visual issues remain.

## Required fidelity surfaces

- Typography: Cairo retained; navy 800-weight heading, 15px table data and 12px supporting metadata reviewed in the focused comparison. Minor natural raster-versus-browser font differences accepted.
- Spacing/layout: fixed right navy sidebar, pale toolbar, welcome/action row, gold-tinted action banner, left request table and right appointment/update column preserved. Single-column mobile view uses cards and an off-canvas navigation menu. Mobile content/scroll widths both 382px; no horizontal page overflow.
- Colors/tokens: navy #17384f, muted gold #b2934d, warm action background, blue appointment tint and amber/green status labels reviewed. Focus outlines remain visible.
- Images/icons: supplied existing Brand retained and outline Lucide icons reused. The source contains no photographic assets requiring generation; initials intentionally avoid attributing generated portraits to lawyers.
- Copy: heading and section labels follow the selected design. Real account data, absolute dates, actual case numbers, current state and device timezone replace illustrative source content. Latest update describes recorded state, without inventing an activity event or an unread count.

## Production data behavior

- Requests filter legal_cases.client_id by auth user ID; lawyer display resolves lawyer.user_id rather than an invalid join.
- Consultations filter by clients.id, after resolving clients.user_id. No automatic client creation on dashboard read.
- No scheduled_at column exists. Only explicitly scheduled/confirmed consultations with future started_at can appear as upcoming; created_at is never used as a meeting time. No new scheduling backend is claimed.
- Profile reads authenticated email; editing updates allowlisted own user-profile fields.
- Existing private case-files upload/download support is connected in the request dialog. Up to three allowed files, maximum 10MB each; ownership checked and errors visible. No production files were transferred during QA.
- Existing database RLS policies are unchanged. This implementation does not constitute the separate access-control remediation previously identified.

## Browser interactions checked

- Real signed-out dashboard: guest action banner, truthful empty requests/appointments, profile sign-in state.
- Illustrative populated view: document-action opens matching request details; attachment upload disabled before selection; close works.
- Search by SN-1042 filters to one request. Unknown search displays a resettable empty state.
- Upcoming appointment opens its detail dialog with status, lawyer, method, time, request creation date and duration.
- Mobile menu opens, selecting requests changes the section and closes the menu; all key request data remains visible in the card layout.
- Browser console checked on actual preview and comparison tabs: no application-origin errors; extension metadata transport errors excluded.
- TypeScript app check, changed-file ESLint and production Vite build passed. Existing bundle-size and Browserslist age warnings remain.
- Pure data assertions passed: future-confirmed filtering, chronological sorting, rejecting missing/invalid dates, case number display and waiting-document labels.

## Limits and follow-up polish

Authenticated profile save, private upload/download and real client transactions were not executed against production customer data. Populated visual evidence is explicitly illustrative. P3: refine icon variations and display initials after final real-data review; no additional design approval is needed for this implementation.

final result: passed
