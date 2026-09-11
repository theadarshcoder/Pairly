# State Architecture — Issue 4

## Decision: Zustand for Slow State Only

The existing codebase already uses **Zustand** for all client state. This is correct and we keep it.

### Slow State (≤ 2 Hz) → Zustand
| Store | Data | Update Frequency |
|-------|------|-----------------|
| `useSessionStore` | Session snapshot, current slide, slide index, participant count | On slide change, session events (~0.1 Hz) |
| `useParticipantStore` | Participant ID, role, nickname | On join (~once) |
| `useConnectionStore` | Connection status, socket ID, room code, latency | On connect/disconnect (~0.01 Hz) |
| `usePeerReviewStore` | Assigned cards, phase, graded card IDs | On phase change, grade submit (~0.1 Hz) |
| `useHotspotStore` | **DEPRECATED** — migrate to `liveBuffer` | Was 10 Hz — violation |

### High-Frequency Data (10 Hz) → `liveBuffer.ts` (Non-Reactive)

**Explicitly forbidden**: 10 Hz socket data must NEVER enter React state.

| Data | Source | Target |
|------|--------|--------|
| Hotspot density grid (2500 floats) | `hotspot:batch` | `live.hotspots` |
| Network matching edges | `match:update` | `live.edges` |
| Sorting distributions | `sort:update` | `live.sortDist` |
| Review aggregate scores | `review:update` | `live.reviewSummaries` |
| Q&A clusters | `qna:update` | `live.qnaClusters` |

### How It Works

```
                     ┌──────────────┐
  Socket frames ────→│  liveBuffer  │──→ rAF loop ──→ Canvas/SVG paint
  (10 Hz)            │  (non-React) │    (useLiveCanvas)
                     └──────────────┘

                     ┌──────────────┐
  Socket events ────→│   Zustand    │──→ React re-render ──→ DOM
  (≤ 2 Hz)           │  (reactive)  │
                     └──────────────┘
```

### Migration Plan

1. `useHotspotStore.setBatch()` currently receives 10 Hz frames — this must be migrated to `liveBuffer.bindLive()`.
2. `PresenterHeatmap` must switch from reading Zustand to reading `live.hotspots` via `useLiveCanvas`.
3. Audience components (tap targets, drag sort) emit events but do NOT consume high-frequency data — they stay on Zustand for local UI state (tap count, submission status).

### Rules

- **No `useState` or `useStore` for anything updating > 2 Hz.**
- **No Context for high-frequency data** — Context triggers re-renders on every consumer.
- **Participant count**: comes from Zustand (slow state) but is throttled to 1 Hz via `useThrottled` (Issue 21).
- **Socket bridge** (`socketBridge.ts`): continues to dispatch slow events to Zustand stores. High-frequency frames are handled by `bindLive()` separately.
