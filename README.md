# Lufria — Enricko Putra Hartono

[Website: lufria.tech](https://lufria.tech)

Enricko Putra Hartono's software engineering portfolio, built with React 19 and Vite 8. It includes selected projects, work experience, a downloadable CV, and GitHub activity.

## Features

- GitHub contribution skyline and heatmap, starting with a genuine bundled calendar while current data loads; usable saved data remains available when requests fail.
- Randomized falling backgrounds, including twelve chibi mascot poses.
- Responsive layouts and reduced-motion support.
- A public profile visit total beside the hero social links.

## Run locally

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5180
```

Run the project checks or create the production build with:

```sh
npm test
npm run lint
npm run build
```

The static production files are written to `dist/`.

## Profile visit count

On `lufria.tech` and `www.lufria.tech`, the shared total normally increments once per browser-tab session. Local and preview hosts only read the total. The counter starts at zero until a production visit is recorded; it has no imported historical data and does not measure unique people. It is a best-effort public count, so a blocked request, network failure, or service limit may miss a visit.

To check the total directly, open the [read-only counter response](https://countapi.mileshilliard.com/api/v1/get/lufria-tech-profile-visits) and read its `value`. “Key not found” means no production visit has been recorded yet; the site displays `0`. No account or API key is needed.

## Deploy

Build with `npm run build` and publish the contents of `dist/` with a static host. The current root `vercel.json` redirects every path to `https://lufria.tech`. If deploying this site on Vercel at `lufria.tech`, adjust that redirect first to avoid a redirect loop.
