# Spotify Status Tracker

A gamified analytics dashboard for your complete Spotify listening history. Connect your
Spotify account via OAuth and/or upload your Spotify Extended Streaming History JSON
export to see top tracks, artists, albums, genres, listening timelines, badges, and
milestones.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · PostgreSQL · Prisma ·
Auth.js (NextAuth v5) · Recharts · react-simple-maps

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
   `npm install` runs `prisma generate` via `postinstall`, which downloads Prisma's
   query/schema engine binaries from `binaries.prisma.sh`. If your network blocks that
   host, download the matching engine `.gz` files manually and place them in
   `node_modules/@prisma/engines/` and `node_modules/prisma/`, then re-run
   `npx prisma generate`.

2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — a PostgreSQL connection string.
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`.
   - `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — from a
     [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) app, with
     redirect URI `http://localhost:3000/api/auth/callback/spotify`.

3. Push the schema to your database:
   ```bash
   npm run db:push
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## How data flows in

- **Spotify OAuth** (`/api/auth/[...nextauth]`) — connects an account and stores
  access/refresh tokens server-side only (`src/lib/auth.ts`). `src/lib/spotify.ts` can
  top up recent plays via `/me/player/recently-played`, since Spotify's API only
  exposes roughly the last 50 plays.
- **JSON upload** (`/api/upload`) — accepts Spotify's "Extended Streaming History"
  export files, validates them with Zod (`src/lib/normalize.ts`), and stores normalized
  `Play` rows. This is the only source for full historical data.
- Both sources write into the same `Play` table (tagged by `source: "upload" | "api"`),
  so dashboard stats are computed over the merged, deduplicated-by-construction set.

## Key files

- `prisma/schema.prisma` — data model (`User`, `Play`, `Upload`, `Badge`, `Goal`).
- `src/lib/stats.ts` — aggregates raw plays into dashboard stats.
- `src/lib/badges.ts` — gamification badge rules.
- `src/lib/insights.ts` — rule-based "AI-style" plain-language insights.
- `src/app/dashboard/page.tsx` — main dashboard UI and charts.

## Privacy

- Spotify tokens are never sent to the browser.
- Uploaded JSON is validated and size-capped (50MB/file) before parsing.
- `DELETE /api/account` permanently deletes a user and all associated plays, uploads,
  badges, and goals.
