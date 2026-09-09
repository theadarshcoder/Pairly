# Pairly — Architecture & Project Structure

## 1. High-Level Architecture

```
┌──────────────────────────────┐         ┌──────────────────────────────┐
│         PRESENTER (Desktop)   │         │        AUDIENCE (Mobile)      │
│  - Heavy viz (D3, SVG, heat-  │         │  - Minimal bundle, instant    │
│    maps), route: /presenter   │         │    load, route: /join         │
│  - Lazy-loaded chunk          │         │  - Tap/swipe only             │
└───────────────┬────────────────┘         └───────────────┬────────────────┘
                │  WebSocket (Socket.IO)                    │  WebSocket
                └───────────────────┬────────────────────────┘
                                    ▼
                    ┌───────────────────────────────┐
                    │        NODE.JS SERVER           │
                    │  ┌───────────────────────────┐ │
                    │  │  Socket.IO Gateway         │ │  ← rooms, auth, events
                    │  ├───────────────────────────┤ │
                    │  │  In-Memory Aggregation     │ │  ← buffers votes/taps,
                    │  │  Buffer (per-room)         │ │    flushes @ 10 FPS
                    │  ├───────────────────────────┤ │
                    │  │  Fastify REST API          │ │  ← auth, sessions,
                    │  │                             │ │    syllabus upload
                    │  ├───────────────────────────┤ │
                    │  │  AI Pipeline (Claude API +  │ │  ← syllabus → structured
                    │  │  Zod validation)           │ │    slide JSON
                    │  └───────────────────────────┘ │
                    └───────────────┬─────────────────┘
                                    │  (write only at session end)
                                    ▼
                    ┌───────────────────────────────┐
                    │   MongoDB (sessions, slides,    │
                    │   concept-tags, analytics)      │
                    └───────────────────────────────┘
```

**Data flow for a live interaction (e.g. Spatial Hotspot):**
1. Student taps image on `/join` → coordinates emitted over socket.
2. Server normalizes X/Y, pushes into that room's in-memory buffer.
3. Every 100ms (10 FPS), server flushes the buffer as one aggregated payload to the room.
4. Presenter's socket listener receives the payload, D3 recomputes heatmap density, Framer Motion animates the transition.
5. Nothing touches MongoDB until the session ends — then one bulk write persists the final aggregated state + raw interaction log for analytics.

This is the same shape as Mentimeter's own historical stack (React + Node + Redis + D3) minus Redis, because at your scale (rooms of dozens to a few hundred, single server instance) an in-process buffer does the same job with zero extra infra. Redis becomes worth it the moment you need **multiple server instances** behind a load balancer — see §4.

---

## 2. Monorepo Structure (Turborepo + pnpm workspaces)

A monorepo pays off here because your frontend, backend, and AI pipeline all share Zod schemas — you want one source of truth for "what a Network Matching slide looks like," not three copies drifting apart.

```
pairly/
├── apps/
│   ├── web/                      # React frontend (single app, dual routes)
│   └── server/                   # Node.js backend
├── packages/
│   ├── schemas/                  # Shared Zod schemas + inferred TS types
│   ├── config-eslint/            # Shared lint config
│   └── config-tsconfig/          # Shared tsconfig base
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

Why one `apps/web` instead of separate presenter/audience apps: they share auth, socket connection logic, and design tokens. Splitting into two apps would duplicate all of that. Instead, **route-based code splitting** keeps the audience bundle tiny — see below.

---

## 3. `apps/web` — Frontend Structure (feature-based, not type-based)

Avoid the classic `components/`, `hooks/`, `utils/` top-level split — it scales badly past a few features because everything related to "Network Matching" ends up scattered across five folders. Group by feature instead:

```
apps/web/
├── src/
│   ├── app/
│   │   ├── router.tsx                 # /presenter and /join routes, React.lazy split here
│   │   └── App.tsx
│   │
│   ├── routes/
│   │   ├── presenter/
│   │   │   ├── PresenterPage.tsx      # entry point, lazy-loaded chunk
│   │   │   └── PresenterLayout.tsx
│   │   └── join/
│   │       ├── JoinPage.tsx           # kept deliberately minimal, no D3/heavy libs
│   │       └── JoinLayout.tsx
│   │
│   ├── features/
│   │   ├── network-matching/
│   │   │   ├── PresenterGraph.tsx     # D3 force-layout bipartite graph (presenter-only)
│   │   │   ├── AudienceMatcher.tsx    # tap-to-connect UI (audience-only)
│   │   │   ├── useNetworkMatching.ts  # socket event hooks for this feature
│   │   │   └── types.ts               # re-exports from packages/schemas
│   │   ├── spatial-hotspot/
│   │   │   ├── PresenterHeatmap.tsx
│   │   │   ├── AudienceTapTarget.tsx
│   │   │   └── useSpatialHotspot.ts
│   │   ├── sequential-sorting/
│   │   │   ├── PresenterInversionView.tsx
│   │   │   ├── AudienceDragSort.tsx
│   │   │   └── useSequentialSorting.ts
│   │   ├── peer-review-swarm/
│   │   │   ├── PresenterTopAnswers.tsx
│   │   │   ├── AudienceGradeCards.tsx
│   │   │   └── usePeerReview.ts
│   │   ├── qna-dedup/
│   │   │   ├── PresenterQuestionFeed.tsx
│   │   │   ├── AudienceAskBox.tsx
│   │   │   └── useQnaDedup.ts
│   │   └── concept-decay/
│   │       └── DecayDashboard.tsx     # instructor-facing analytics, not live-session
│   │
│   ├── stores/
│   │   ├── connectionStore.ts         # Zustand: socket status, room id, latency
│   │   ├── sessionStore.ts            # Zustand: current slide, slide queue
│   │   └── authStore.ts
│   │
│   ├── lib/
│   │   ├── socket.ts                  # single Socket.IO client instance + typed emit/on wrappers
│   │   ├── api.ts                     # REST client (session CRUD, syllabus upload)
│   │   └── animations.ts              # shared Framer Motion variants (vote-drop spring, etc.)
│   │
│   ├── components/                    # ONLY truly generic, feature-agnostic UI
│   │   ├── ui/                        # Button, Modal, Toast — dumb, reusable
│   │   └── layout/
│   │
│   └── styles/
│       └── tailwind.css
├── vite.config.ts
└── package.json
```

**Bundle-splitting rule that actually enforces your "hyper-minimalist audience view" requirement:** in `router.tsx`, load presenter routes via `React.lazy(() => import('../routes/presenter/PresenterPage'))`. D3, the heatmap renderer, and the network-graph code only ever end up in the presenter chunk — a student's phone on `/join` never downloads them. This is the mechanism, not just a folder convention; without the `React.lazy` boundary at exactly this seam, Vite will happily bundle D3 into the shared chunk and your audience bundle bloats anyway.

---

## 4. `apps/server` — Backend Structure (layered by responsibility)

```
apps/server/
├── src/
│   ├── sockets/
│   │   ├── index.ts                   # Socket.IO server init, middleware (auth, rate-limit)
│   │   ├── rooms.ts                   # join/leave room logic
│   │   ├── handlers/
│   │   │   ├── networkMatching.handler.ts
│   │   │   ├── spatialHotspot.handler.ts
│   │   │   ├── sequentialSorting.handler.ts
│   │   │   ├── peerReview.handler.ts
│   │   │   └── qnaDedup.handler.ts
│   │   └── buffer/
│   │       ├── AggregationBuffer.ts   # per-room in-memory buffer, class-based
│   │       └── throttleEmitter.ts     # setInterval @ 100ms, flushes buffer → room
│   │
│   ├── routes/                        # Fastify REST routes
│   │   ├── auth.routes.ts
│   │   ├── sessions.routes.ts
│   │   ├── syllabus.routes.ts         # upload endpoint → triggers AI pipeline
│   │   └── analytics.routes.ts        # concept-decay queries
│   │
│   ├── services/
│   │   ├── session.service.ts         # session lifecycle, end-of-session persistence
│   │   ├── qnaDedup.service.ts        # embedding + nearest-neighbor clustering
│   │   ├── conceptDecay.service.ts    # rollup logic, reads tagged historical data
│   │   └── ai/
│   │       ├── syllabusParser.ts      # calls Claude API with structured output schema
│   │       └── slideGenerator.ts      # maps LLM output → Zod-validated slide JSON
│   │
│   ├── models/                        # Mongoose schemas
│   │   ├── Session.model.ts
│   │   ├── Slide.model.ts
│   │   ├── ConceptTag.model.ts        # first-class collection, not embedded metadata
│   │   └── User.model.ts
│   │
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   │
│   └── server.ts                      # Fastify + Socket.IO bootstrap
├── package.json
```

**Where Redis would slot in later (don't build this yet):** if you outgrow one server instance, `AggregationBuffer` moves from an in-process `Map` to Redis, and you add the Socket.IO Redis adapter in `sockets/index.ts` so rooms stay consistent across instances. Structuring the buffer as its own class now means that swap touches one file, not your whole event system.

---

## 5. `packages/schemas` — The Shared Contract

This is the piece that keeps AI output, socket payloads, and MongoDB documents from drifting apart:

```
packages/schemas/
├── src/
│   ├── slides/
│   │   ├── networkMatching.schema.ts   # Zod schema + z.infer type
│   │   ├── spatialHotspot.schema.ts
│   │   └── sequentialSorting.schema.ts
│   ├── socketEvents.schema.ts          # every socket event payload, both directions
│   ├── ai/
│   │   └── syllabusOutput.schema.ts    # what the LLM must return — same schema
│   │                                    # used for the Claude structured-output call
│   │                                    # AND the post-response Zod re-validation
│   └── index.ts
```

Both `apps/web` and `apps/server` import from `@pairly/schemas` — a slide type defined once, used for form validation on the frontend, socket payload validation on the backend, and the AI pipeline's output contract, all from the same file.

---

## 6a. Room Roles & Socket Auth

Every socket connection must carry a role, established at connection/auth time — never inferred client-side:

```
role: 'host' | 'participant'
```

- `host` (presenter): the only role permitted to emit `slide:advance`, `session:end`, `session:start`, or any event that mutates session/slide state.
- `participant` (audience): permitted only to emit interaction events (`hotspot:tap`, `match:connect`, `sort:submit`, `review:grade`, `question:ask`) scoped to the room they've joined.
- Enforce this server-side in `sockets/index.ts` middleware, on every handler — not just by hiding UI on the client. A participant's client should never be trusted to self-report as host.

## 6b. Explicit Build Constraints (do not deviate from these)

These are deliberate, load-tested-against-actual-scale decisions, not omissions — an agent or IDE should not "improve" on them unprompted:

- **No Redis.** The in-memory `AggregationBuffer` (per-room, per-process) is sufficient for the target load (rooms of dozens to a few hundred participants, single server instance). Redis is an explicitly deferred upgrade — see §3 — not a day-one dependency.
- **No uWebSockets.js.** Socket.IO's throughput ceiling is far above this app's actual per-room message rate. Do not swap transports for raw throughput reasons.
- **No separate presenter/audience apps.** One Vite/React app, split via `React.lazy` at the route boundary. Do not scaffold two frontend projects.
- **MongoDB writes only at session end**, via a single bulk `insertMany`/`bulkWrite` — never per-interaction writes during a live session.

## 7. IDE setup notes

- Add path aliases (`@pairly/schemas`, `@/features/*`) in both `tsconfig.json` and `vite.config.ts` so imports stay short — your IDE's auto-import will resolve these correctly once the base config is in place.
- Turborepo's `turbo.json` should define a `dev` pipeline that runs `apps/web` and `apps/server` concurrently with `persistent: true`, so one `pnpm dev` at the root boots both.
- Put a `.env.example` in both `apps/web` and `apps/server` — you'll need `VITE_SOCKET_URL` on the frontend and `MONGO_URI` / `ANTHROPIC_API_KEY` on the backend.
