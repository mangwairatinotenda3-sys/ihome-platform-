# iHome Platform — Setup

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
npm run preview
```

## What's included
- `src/App.jsx` — the iHome demo UI (home screen + Shoebill AI chat)
- Vite + React + Tailwind
- PWA support via `vite-plugin-pwa` (installable, offline-ready after build)

## Still needed
- `public/icon-192.png` and `public/icon-512.png` — app icons for the PWA manifest (referenced in `vite.config.js`)
- Once approved: replace mock property data in `App.jsx` with live Supabase queries

## Deploy
Works out of the box on Vercel, Netlify, or Cloudflare Pages — connect the repo and use:
- Build command: `npm run build`
- Output directory: `dist`
