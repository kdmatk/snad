# Snad shared interface system

The approved layouts, logo and navy/gold identity remain the visual target. This update standardizes controls and feedback rather than introducing another page direction.

## Design plan
- Navy #17384f: primary text and workspace identity.
- Gold #bea062: primary accent, with navy text for readability.
- Gold ink #80632b: focus on light backgrounds and outline action text.
- Paper #ffffff; surface #f5f7fa; muted text #52677b.
- Cairo for Arabic interface text, Tajawal/system fallbacks. Form text is 16px; helper/state text 14px; table metadata at least 13px.
- Preserve right-hand navigation and each approved workspace composition. Use logical start/end alignment for bilingual content and RTL menus.
- Motion confirms an interaction; no new page entrance animations or card movement. Pointer-only press feedback takes 140ms; reduced motion removes movement. Keyboard activation receives immediate feedback.

The plan was reviewed against the legal-service context: retain existing restrained workspace colors and layouts, improve contrast and density, and avoid ornamental effects or a replacement visual identity.

## Sources applied
- https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md — deliberate visual hierarchy, real interface copy, restrained motion and self-critique.
- https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md — interaction feedback, trigger-aware popovers, keyboard behavior and reduced motion.
These are design references applied to this change; no runtime dependency was installed.

## Code review
| Before | After | Why |
| --- | --- | --- |
| Separate empty/loading/error markup in each workspace | EmptyState, LoadingState and FailureState | Consistent feedback and retry behavior |
| Empty request message after an initial failed load | Error with retry, without a misleading empty state | Distinguish a failed connection from zero requests |
| White text on some gold actions | Navy text on the shared gold surface | Text contrast exceeds 4.5:1 |
| 40px default controls and mixed form typography | 44px defaults, 16px fields, common border/focus tokens | Readability and usable targets on phones |
| Left-aligned table headings and implicit select direction | Logical start alignment and default RTL select root | Correct Arabic layout and keyboard direction |
| Popup scaling from center | Radix trigger transform origins | Keep motion attached to its control |
| Mixed focus and motion treatments | Visible focus on both light/navy surfaces, global reduced-motion support | Clear keyboard navigation and motion preferences |

## Component contract
- src/design-system.css contains shared brand/interaction tokens and workspace adapters. Page CSS retains layout ownership.
- Shared UI primitives expose sn-button, sn-control, sn-card, sn-table and popup markers. Caller utilities still control layout and explicit sizes.
- EmptyState provides a title, guidance and optional contextual action. It makes no network request.
- LoadingState announces progress and shows static placeholder lines. It never presents fabricated records.
- FailureState exposes the actual friendly error and optional disabled-while-busy retry action.
- Existing hooks remain responsible for data fetching. No database schema, approval, authentication or storage-policy changes are included.

## Verification
- TypeScript: tsc --noEmit -p tsconfig.app.json passed.
- Targeted ESLint passed with the existing buttonVariants Fast Refresh warning; no errors.
- Vite production build passed. Existing bundle-size and browserslist-age warnings remain.
- Actual exported client/lawyer/admin workspace views were exercised in dev-only fixtures with synthetic records. No user data was submitted.
- Client: error/retry returned to records; initial error suppresses empty state; search-empty guidance and clear-search action worked; loading state rendered.
- Lawyer: populated kanban/empty lanes and initial error rendered correctly.
- Admin: request table, filters and empty review panel inspected on desktop and phone.
- Shared select selected an Arabic option; dialog accepted focus, closed with Escape and restored trigger focus. Disabled action was exposed as disabled.
- Client phone navigation opened, selected requests and closed. All three phone body widths measured 382px with scrollWidth 382px inside 390px frames (native scrollbar consumes 8px), with no horizontal page overflow.
- Gold/navy and muted/white color pairs pass 4.5:1 text contrast. Reduced-motion CSS was inspected; physical-device behavior has not been separately tested.

The earlier lawyer-registration backend migration remains pending due to the separate Supabase connector write error. This visual update neither applies that migration nor claims successful real registration.
