# Lawyer registration — selected direction 2

final result: blocked for complete backend release; visual implementation passed

## Visual reference and evidence
Selected source: generated_images/exec-c9799325-7912-42f7-b681-13ca4776c283.png (1488 × 1056).
Full comparison: /workspace/scratch/snad-register-comparison-final.jpg.
Focused comparison: /workspace/scratch/snad-register-focus-final.jpg.
Source and actual implementation rendered at identical 1488 × 1056 CSS viewports, scale 0.436828 in full comparison; native crops in focused comparison. Mobile inspected at 390 × 844.

P2 initial CTA clipping was resolved by tightening desktop field and upload spacing. Final full and focused comparisons show the CTA inside the viewport, matching navy right rail, form hierarchy, gold actions, single license upload and three-step structure. Flat navy rail omits decorative source wave (P3). Mobile switches to compact horizontal stepper and one-column fields.

## Checks
TypeScript, targeted ESLint and Vite production build passed. Existing bundle-size and outdated browserslist warnings remain.
Ten pure validation checks passed: required file, empty file, maximum 5MB boundary, oversized file, invalid extension/MIME, valid contact fields, zero years experience, required experience, invalid email.
Browser fixture verified missing-field errors and focus, professional field input, PDF attachment, review summary, previous/next preserving data and attachment, keyboard consent and simulated success. Fixture uses a stub submit only; no actual applicant or license was created. All QA HTML, sample data and reference images are excluded from git and remote deployment.

## Material release limitation
Supabase migration 20261028122931_lawyer_registration_license.sql is PREPARED BUT NOT APPLIED. Mutation connector returns Invalid or expired requestState; read calls work. No successful write or end-to-end backend verification was obtained. The new private bucket, column, policies and registration save cannot be assumed available.
Public UI probes required schema readiness and disables final submission with a truthful temporary-unavailability message until schema is installed. This prevents a false confirmation. Do not describe this UI deployment as working real registration.
After restoring the Supabase connection, apply the reviewed migration, verify ownership/storage policies and authenticated submit/admin signed-link retrieval, then enable normal backend availability through the readiness check.
