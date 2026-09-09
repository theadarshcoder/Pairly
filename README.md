<div align="center">

# 🎓 Pairly

**Turn passive lectures into live, interactive experiences.**

When a presenter uploads a syllabus, Pairly instantly transforms it into structured interactive slide types — network matching, spatial hotspot heatmaps, sequential sorting, peer review swarms, and live Q&A deduplication — all powered by a real-time WebSocket engine and an AI pipeline, with zero per-interaction database writes during live sessions.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/)
[![MIT License](https://img.shields.io/badge/License-MIT-22C55E)](./LICENSE)

</div>

---

## Why Pairly

Modern lectures suffer a fundamental engagement gap: students sit passively while instructors broadcast. Traditional polling tools (Mentimeter, Slido, Kahoot) treat interaction as an afterthought — multiple choice questions tacked onto slides. Pairly is built from first principles around **interaction as the primary content delivery mechanism**.

The problems Pairly solves:

- **Passive Knowledge Transfer**: Students absorb material far more effectively through active recall and peer interaction than through passive note-taking during lectures.
- **No Structured Feedback Loop**: Instructors rarely know in real-time which concepts are misunderstood until the exam — weeks too late.
- **Heavy Presenter Bundles on Student Devices**: Existing tools either send every asset to every device, or maintain separate apps with duplicated auth/state logic.
- **AI Output Drift**: Without a shared schema contract, the AI pipeline's output, the WebSocket payload, and the database document gradually diverge and require painful reconciliation.

Pairly's answer:

- **Route-Based Bundle Splitting**: Students on `/join` download a hyper-minimal bundle. Presenters on `/presenter` get the full D3/heatmap visualizations. Same codebase, `React.lazy` boundary enforces the split at build time.
- **10 FPS In-Memory Aggregation**: Every tap, match, and sort is buffered in-process. The presenter's D3 canvas gets a single flushed payload 10 times per second — no per-interaction MongoDB writes during live sessions.
- **One Zod Schema, Three Consumers**: The AI pipeline output contract, the socket payload validator, and the MongoDB document all derive from the same `@pairly/schemas` package. A field added once propagates everywhere via TypeScript inference.
- **Concept Decay Analytics**: After sessions end, interaction data is tagged to curriculum concepts and tracked over cohorts to surface which topics decay fastest in student memory.

---

## Architecture

```
┌──────────────────────────────┐         ┌──────────────────────────────┐
│         PRESENTER (Desktop)   │         │        AUDIENCE (Mobile)      │
│  - Heavy viz (D3, SVG,        │         │  - Minimal bundle, instant    │
│    heatmaps), route /presenter│         │    load, route /join          │
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
                    │  │  AI Pipeline (Claude API + │ │  ← syllabus → structured
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

**Data flow for a live Spatial Hotspot interaction:**
1. Student taps image on `/join` → normalized `x`, `y` coordinates emitted over WebSocket.
2. Server pushes coordinates into the room's in-memory buffer (no DB write).
3. Every 100ms (10 FPS), server flushes the buffer as one aggregated payload to the presenter.
4. Presenter's D3 canvas receives the batch, recomputes heatmap density, Framer Motion animates the transition.
5. At session end — one bulk `insertMany` persists the final aggregated state and raw interaction log to MongoDB.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Monorepo** | [Turborepo](https://turbo.build/) + [pnpm Workspaces](https://pnpm.io/workspaces) |
| **Schema & Validation** | [Zod 3.23](https://zod.dev/) + TypeScript 5.5 strict inference |
| **Frontend** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/), React Router |
| **Visualization** | [D3.js](https://d3js.org/) (presenter-only chunk), [Framer Motion](https://www.framer.com/motion/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Real-Time Transport** | [Socket.IO 4.x](https://socket.io/) |
| **Backend API** | [Fastify](https://fastify.dev/) (Node.js) |
| **Database** | [MongoDB](https://www.mongodb.com/) (session end bulk writes only) |
| **AI Pipeline** | [Claude API](https://www.anthropic.com/) with structured output + Zod re-validation |
| **Testing** | [Vitest](https://vitest.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## Monorepo Structure

```
pairly/
├── apps/
│   ├── web/                      # React frontend (single app, dual routes)
│   └── server/                   # Node.js backend (Fastify + Socket.IO)
├── packages/
│   ├── schemas/                  # @pairly/schemas — Shared Zod schemas & TS types
│   ├── config-eslint/            # Shared ESLint configuration
│   └── config-tsconfig/          # Shared tsconfig base
├── docs/
│   └── ARCHITECTURE.md           # Full architecture specification
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## `packages/schemas` — The Shared Contract

The `@pairly/schemas` package is the single source of truth that prevents AI output, socket payloads, and MongoDB documents from drifting apart.

```
packages/schemas/
├── src/
│   ├── common/
│   │   ├── roles.schema.ts           # UserRole: 'host' | 'participant'
│   │   └── conceptTag.schema.ts      # Concept tags for decay analytics
│   ├── slides/
│   │   ├── base.schema.ts            # Shared slide properties (id, prompt, timer, tags)
│   │   ├── networkMatching.schema.ts # Bipartite graph matching
│   │   ├── spatialHotspot.schema.ts  # Image coordinate heatmaps
│   │   ├── sequentialSorting.schema.ts # Ranking & inversion analysis
│   │   ├── peerReview.schema.ts      # Answer rubrics & peer grades
│   │   ├── qnaDedup.schema.ts        # Live Q&A with AI clustering
│   │   └── index.ts                  # SlideSchema discriminated union
│   ├── session/
│   │   └── session.schema.ts         # Session lifecycle & room state
│   ├── sockets/
│   │   └── socketEvents.schema.ts    # All C→S and S→C event contracts
│   └── ai/
│       └── syllabusOutput.schema.ts  # Claude structured output schema
└── tests/
    └── schemas.test.ts               # Comprehensive Zod validation tests
```

Both `apps/web` and `apps/server` import exclusively from `@pairly/schemas`. A field changed once in one schema file propagates to the form validator on the frontend, the socket handler on the backend, and the AI pipeline's output contract — all from one declaration.

---

## Slide Types

### 🔗 Network Matching
Students connect left-column items to right-column items (e.g., Paxos → Leslie Lamport). The presenter sees a live D3 bipartite force-graph updating at 10 FPS as edge weights accumulate. Correct pairs are revealed at the instructor's discretion.

### 🔥 Spatial Hotspot
Students tap a region on an image (anatomy diagram, circuit schematic, historical map). Taps are buffered in-process and flushed as coordinate batches to the presenter's D3 heatmap, which recomputes density and animates with Framer Motion. Coordinates are strictly normalized to `[0, 1]` — validated at the Zod layer.

### 📋 Sequential Sorting
Students drag items into ranked order. Aggregate submissions are analyzed for Kendall-tau inversion distributions, showing instructors exactly which adjacent-pair swaps confuse students most.

### ⚖️ Peer Review Swarm
In two phases: (1) students submit answers, (2) students grade anonymized peer answers against a rubric. The presenter's view surfaces the top-scoring answers and grade distribution in real time.

### 💬 Q&A Deduplication
Students submit questions; the backend clusters semantically similar questions via embedding + nearest-neighbor and surfaces representative questions with aggregate upvote counts. The presenter sees a live, deduplicated feed instead of 40 variants of "what is a mutex?"

---

## Explicit Build Constraints

These are deliberate, load-tested architectural decisions — not omissions. Do not modify them without reviewing the architecture rationale first:

> **No Redis.** The in-memory `AggregationBuffer` (per-room, per-process) is sufficient for rooms of dozens to a few hundred participants on a single server instance. Redis is an explicitly deferred upgrade for multi-instance deployments — it slots into `AggregationBuffer.ts` and `sockets/index.ts` without touching the event system.

> **No uWebSockets.js.** Socket.IO's throughput ceiling exceeds this application's per-room message rate. The transport is not a bottleneck at this scale.

> **No separate presenter/audience apps.** One Vite/React app, split via `React.lazy` at the `/presenter` route boundary. D3, heatmap renderers, and graph code never reach the audience bundle.

> **MongoDB writes only at session end**, via a single `bulkWrite` — never per-interaction writes during a live session.

---

## Room Roles & Socket Auth

Every socket connection carries a role established at connection time — never inferred client-side:

```
role: 'host' | 'participant'
```

- **`host`** (presenter): sole role permitted to emit `slide:advance`, `session:start`, `session:end`. Any event that mutates session or slide state is host-gated server-side.
- **`participant`** (audience): may only emit interaction events (`hotspot:tap`, `match:connect`, `sort:submit`, `review:grade`, `question:ask`) scoped to their joined room.
- Enforced server-side in `sockets/index.ts` middleware on every handler — not by hiding UI on the client. Client role self-reporting is never trusted.

---

## Quick Start

### 1. Prerequisites

- Node.js ≥ 20.x
- pnpm ≥ 10.x (`npm install -g pnpm`)
- MongoDB (local instance or Atlas URI)
- Anthropic Claude API key

### 2. Clone and Install

```bash
git clone https://github.com/theadarshcoder/Pairly.git
cd Pairly
pnpm install
```

### 3. Configure Environment Variables

```bash
# Backend
cp apps/server/.env.example apps/server/.env

# Frontend
cp apps/web/.env.example apps/web/.env
```

**Backend (`apps/server/.env`)**

```env
MONGO_URI="mongodb://127.0.0.1:27017/pairly"
ANTHROPIC_API_KEY="sk-ant-your-key-here"
JWT_SECRET="your_secure_jwt_secret_here"
FRONTEND_URL="http://localhost:5173"
PORT=4000
```

**Frontend (`apps/web/.env`)**

```env
VITE_SOCKET_URL="http://localhost:4000"
VITE_API_URL="http://localhost:4000"
```

### 4. Build Shared Schemas

```bash
pnpm --filter @pairly/schemas build
```

### 5. Start Development Servers

```bash
# Start both frontend and backend concurrently
pnpm dev
```

- Frontend (presenter): [http://localhost:5173/presenter](http://localhost:5173/presenter)
- Frontend (audience): [http://localhost:5173/join](http://localhost:5173/join)
- Backend API: [http://localhost:4000](http://localhost:4000)

---

## Usage Example

**Create a Session via the REST API:**

```javascript
const response = await fetch("http://localhost:4000/api/sessions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <host_jwt>"
  },
  body: JSON.stringify({
    title: "CS 162: Concurrency & Deadlocks",
    syllabusText: "Topics: mutual exclusion, semaphores, Coffman conditions, dining philosophers..."
  })
});

const session = await response.json();
console.log(session);
```

**Expected Output:**

```json
{
  "session": {
    "id": "sess_162_deadlocks_001",
    "roomCode": "CS162-L1",
    "title": "CS 162: Concurrency & Deadlocks",
    "hostId": "prof_ada_lovelace",
    "status": "idle",
    "currentSlideIndex": 0,
    "totalSlides": 5,
    "slides": [
      {
        "id": "ai-slide-1",
        "type": "network-matching",
        "title": "Coffman Condition Matching",
        "prompt": "Connect each Coffman deadlock condition to its formal definition.",
        "leftItems": [
          { "id": "c1", "label": "Mutual Exclusion" },
          { "id": "c2", "label": "Hold and Wait" }
        ],
        "rightItems": [
          { "id": "d1", "label": "Resources cannot be shared" },
          { "id": "d2", "label": "Process holds resource while waiting" }
        ],
        "correctPairs": [
          { "leftId": "c1", "rightId": "d1" },
          { "leftId": "c2", "rightId": "d2" }
        ]
      }
    ],
    "presenterUrl": "http://localhost:5173/presenter?room=CS162-L1",
    "joinUrl": "http://localhost:5173/join?room=CS162-L1"
  }
}
```

**Audience joining a session via Socket.IO:**

```typescript
import { io } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@pairly/schemas";

const socket = io<ServerToClientEvents, ClientToServerEvents>("http://localhost:4000");

socket.emit("room:join", {
  roomCode: "CS162-L1",
  role: "participant",
  nickname: "Alice"
});

socket.on("room:joined", (payload) => {
  console.log("Joined room:", payload.session.title);
  console.log("Current slide:", payload.session.currentSlide?.type);
});

socket.on("buffer:flush", (payload) => {
  // Update D3 heatmap / network graph at 10 FPS
  console.log(`${payload.slideType} aggregate received at ${payload.timestamp}`);
});
```

---

## Testing

Run the schema validation test suite:

```bash
pnpm --filter @pairly/schemas test
```

```
 ✓ tests/schemas.test.ts (18)
   ✓ User Roles (2)
   ✓ Slide Schemas & Discriminated Union (6)
   ✓ Participant Action Socket Payloads (5)
   ✓ Host Controls & Room Payloads (2)
   ✓ Aggregation Buffer 10 FPS Flush Payload (1)
   ✓ AI Syllabus Output Contract (1)
   ✓ Session Model (1)

 Test Files  1 passed (1)
      Tests  18 passed (18)
```

Run type checking:

```bash
pnpm --filter @pairly/schemas typecheck
```

---

## Known Limitations

### 1. Schema Package is ESM-only

`@pairly/schemas` compiles to ESM (`"type": "module"`). Consumers using CommonJS require configuration (`"moduleResolution": "NodeNext"` or ESM interop). Dual CJS/ESM build output is a planned addition for the shared config package.

### 2. AI Slide Generation Quality

The Claude-based syllabus parser generates best-effort structured slides, but the quality of generated `correctPairs` for network-matching slides and `correctRank` for sorting slides degrades for highly abstract or domain-specific syllabus text. A human-in-the-loop slide editor is planned for the presenter UI to let instructors correct AI-generated content before broadcasting.

### 3. In-Process Buffer and Single Server Constraint

The `AggregationBuffer` is in-process and therefore not replicated across Node.js instances. Horizontal scaling requires adding the Socket.IO Redis adapter and migrating the buffer to Redis. See `ARCHITECTURE.md §6b` for the exact files that change in that upgrade path.

---

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with Vitest test coverage for any proposed schema changes. Schema modifications must maintain backward compatibility with the discriminated union — adding new slide types requires a corresponding entry in `slides/index.ts`.

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built for the classroom. Designed for the real-time web.

**[theadarshcoder](https://github.com/theadarshcoder)**

</div>
