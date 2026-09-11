# PWA Setup Notes — Issue 13

## Service Worker Scope
- Scoped to `/join` route ONLY
- The presenter route (`/present`) does NOT need offline caching
- Adding SW to the presenter can cause stale-chunk bugs mid-lecture

## TODO: vite-plugin-pwa
Install and configure once the build pipeline is stabilized:

```bash
pnpm --filter @pairly/web add -D vite-plugin-pwa
```

```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

VitePWA({
  registerType: 'autoUpdate',
  scope: '/join/',
  includeAssets: ['favicon.svg', 'icons/*.png'],
  manifest: false, // We use public/manifest.webmanifest directly
  workbox: {
    navigateFallback: '/join',
    navigateFallbackAllowlist: [/^\/join/],
    // Do NOT cache presenter routes
    navigateFallbackDenylist: [/^\/present/, /^\/dashboard/],
  },
})
```

## Icons
- `public/favicon.svg` — serif "P" monogram, scalable
- PNG rasterization (192, 512, maskable-512) deferred to build step
- For now the SVG favicon works in modern browsers

## Issue 34: theme-color
- `<meta name="theme-color" content="#0A0A0C">` is set in index.html
- The audience PIN screen uses --surface-3 (#222229) background for digits
- The PWA status bar (using #0A0A0C) reads acceptably against this
- If needed later, add per-route `<meta name="theme-color">` updates

## Issue 35: Safari fullscreen + Wake Lock
- Test Present mode on Safari specifically
- Known quirk: Wake Lock releases on fullscreen toggle
- Fallback: "keep this tab focused" reminder if Wake Lock fails
