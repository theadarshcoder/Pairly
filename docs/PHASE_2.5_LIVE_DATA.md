# Phase 2.5: Live Data Pipeline — Issue 3

This phase must be completed **before** any high-frequency slide type is built.

## Problem

High-frequency data (10 Hz socket frames from 300+ students) must never touch React state.
If it does, the React tree re-renders 10× per second, causing jank and dropped frames.

## Architecture

```
Socket → bindLive(socket) → live buffer → rAF loop → canvas/SVG paint
                                   ↑                       ↑
                          Non-reactive singleton      useLiveCanvas hook
                          (no React, no Zustand)      (no setState ever)
```

## Modules

### `lib/liveBuffer.ts`
- Non-reactive singleton: `export const live = { rev: 0, hotspots, edges, sortDist, ... }`
- `bindLive(socket)`: validates incoming frames with shared Zod schema, writes to `live`, increments `live.rev`
- **Rule**: This module must never import React or Zustand

### `lib/useLiveCanvas.ts`
- Hook that runs a `requestAnimationFrame` loop
- Each frame: compares `live.rev` to a local `seen` ref
- If unchanged → returns early (zero work)
- If changed → calls `paint(ctx, live, dt)` callback
- Cleans up rAF on unmount
- **Rule**: The paint callback paints directly to canvas — no React elements involved

### `lib/ease.ts` (Issue 20)
- `easeOutCubic(t)` and friends
- Used inside rAF loops for canvas-only transitions (e.g., heatmap alpha fade-in)
- **Rule**: Do NOT use Framer Motion for canvas content. Framer animates React elements, not pixels.

### `lib/useThrottled.ts` (Issue 21)
- `useThrottled(value, intervalMs)` — samples a value at ~1 Hz
- Used for participant counter debouncing
- The digit-roll animation restarts only on the 1 Hz update, not every socket frame

## Integration Points

1. **Mocked socket in dev**: writes into `liveBuffer`, NOT Zustand
2. **Presenter components**: `useLiveCanvas` with slide-specific paint functions
3. **Socket bridge**: `bindLive(socket)` called alongside existing Zustand bridge
4. **Zod validation**: incoming frames validated with `SlideFrameSchema.safeParse`; invalid frames dropped silently

## Verification

- [ ] `live.rev` increments on every valid frame
- [ ] Canvas paints only when `rev` changes (no wasted frames)
- [ ] React DevTools shows zero re-renders on high-frequency frames
- [ ] `useThrottled` limits participant count updates to ~1 Hz
