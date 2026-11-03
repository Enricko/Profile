# Lufria

Enricko's portfolio, built with React 19 and Vite 8.

## Setup

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5180
```

Run the checks and create a production build with:

```sh
npm test
npm run lint
npm run build
```

## Visit counter

The displayed total is a shared public count from [CountAPI](https://countapi.mileshilliard.com/) using the key `lufria-tech-profile-visits`; it needs no account or API key. Only the production hosts `lufria.tech` and `www.lufria.tech` increment the count, at most once per browser tab session using `sessionStorage`. Localhost and preview builds read the total without incrementing it. The counter starts with deployment and does not import historical visits. It is a best-effort public count, not a count of unique people: network failures, service limits, or blocking can miss visits, and the public counter is not tamper-proof.

The request runs asynchronously with a four-second bound and does not block the page. The UI shows a dash while loading and “Unavailable” if the service fails.

## GitHub activity

GitHub activity starts with a genuine bundled calendar, uses a six-hour browser cache, and shares one background request with a six-second timeout.
