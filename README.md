# Leeta Agent Order Dashboard

A full-stack monorepo for the Agent Order Management feature — built with **React Native (Expo)** for mobile and **Next.js for web. Both apps share a single package, `@repo/ui`, which contains reusable hooks, types, and business logic.

---

## Quick Start

### Prerequisites

* Node.js ≥ 18
* npm ≥ 8 (for workspaces support)
* For mobile: [Expo Go](https://expo.dev/go) on your device (download the latest version from the Expo site, not Play Store)

### Install Dependencies

From the repo root:

```bash
npm install
```

---

## Run the Apps

From the repo root, you can start both apps:

```bash
npm run dev
```

* Web: open [http://localhost:3000](http://localhost:3000)
* Mobile: scan the QR code in **Expo Go** to open the app

Or start apps individually by navigating into the respective folder:

```bash
cd apps/web
npm run dev        # Start web only

cd apps/mobile
npm run dev        # Start mobile only
```

---

## Features Implemented

* Pull-to-refresh on mobile
* Loading skeletons / state
* Error states with retry
* Status filters: All / Pending / In Transit / Delivered
* Optimistic UI updates with rollback
* Shared icons and fonts between apps
* Responsive web layout
* Accessible markup (`aria-label`, `role`)

---

## Project Structure

```
getLeeta/
│
├── packages/
│   └── ui/                        # Shared package
│       ├── hooks/                 # Reusable hooks (useOrders, etc.)
│       ├── types/                 # Order, OrderStatus types
│       ├── utils/                 # Formatters, loggers
│       └── components/            # Shared UI components if any
│
├── apps/
│   ├── web/                       # Next.js app
│   │   ├── pages/
│   │   ├── components/
│   │   └── styles/
│   │
│   └── mobile/                    # React Native (Expo)
│       ├── App.tsx
│       ├── screens/
│       ├── components/
│       └── theme/
```

---

## Architecture Notes

* **Monorepo with Turborepo:** single `npm run dev` to start everything.
* **Shared package (`@repo/ui`)** holds all cross-platform logic — hooks, types, utilities.
* **Web:** Next.js + Tailwind CSS v4, fonts loaded via `next/font/google`.
* **Mobile:** React Native via Expo, uses shared hooks and assets from `@repo/ui`.

---

## Notes

* Web and mobile share only the `@repo/ui` package.
* Fonts and icons are centralized for consistency.
* Pull-to-refresh, loading, and error states behave as specified in the assessment.
* You need the **latest Expo Go** app to view the mobile app.
