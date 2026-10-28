# Snad — approved identity 1

Approved on 28 October 2026. The user selected the first of four displayed identity concepts: navy/gold balanced scales on a classical pillar, pointed gold finial, angular Arabic سند lettering, and spaced serif SNAD lettering.

## Production assets

- `public/brand/snad-logo-color-v1.webp`: colored horizontal lockup on transparent background, 640×320.
- `public/brand/snad-logo-on-navy-v1.webp`: white/gold horizontal lockup on navy background, 640×320.
- `public/brand/snad-social-v1.jpg`: matching sharing image, 1200×600.
- `public/brand/snad-icon-64-v1.png`: browser icon, 64×64.
- `public/brand/snad-icon-180-v1.png`: Apple touch icon, 180×180.

Palette: navy #17384F, muted gold #B2934D, white. These are raster production assets derived with built-in Image Gen from the chosen visual. No vector master is claimed. Sharp was used only to resize and encode the generated assets for web delivery; the artwork was not redrawn or traced.

## Prompt record

1. Use the first selected identity only; preserve scales/pillar and custom Arabic lettering, rearrange as a horizontal lockup with emblem on the right and wordmark on the left, SNAD below; true transparent background.
2. For the navy variant, preserve the same horizontal geometry, reverse navy portions to white and keep gold, on a navy background. A noisy transparent white intermediate was rejected and is not shipped.
3. For the browser icon, retain only the selected scale/pillar emblem, centered white/gold on navy, without lettering.

## Integration and verification

The shared Brand component keeps its existing accessible home link and uses the selected image. CSS selects the appropriate variant for public header/footer, client/lawyer sidebars and admin sidebar. It constrains the display frame rather than stretching the source artwork. Unrelated pages, authentication, business data, and approval actions are unchanged.

Browser review: desktop public header, light surface, client/lawyer sidebar context and administration sidebar context; mobile home at 390×844 with measured document width and scrollWidth both 382. Both image variants load, no emblem or wordmark clipping, and public navigation to Quick Services and the logo's return-to-home link work. Browser logs show no application-origin errors. TypeScript, changed-file ESLint and Vite build passed. Existing bundle-size and Browserslist-age warnings remain. Sharing metadata points to the new JPEG and icon URLs; third-party social caches were not refreshed as part of this task.
