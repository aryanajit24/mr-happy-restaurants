# Mr. Happy Restaurants 🍕🍔🥙

Online menu & ordering showcase for **Mr. Happy Restaurants** in Bremen & Schwanewede — Döner, Burger, Pizza & mehr.

## 🌐 Live Site

**[https://aryanajit24.github.io/mr-happy-restaurants/](https://aryanajit24.github.io/mr-happy-restaurants/)**

Deployed automatically to GitHub Pages from the `main` branch on every push.

---

## 🚀 Make the website live — one-time merge (do this now)

The website is ready to go. Everything is coded and tested. **You just need to merge the open Pull Request** and the site will be live within 2 minutes automatically.

### Step-by-step:

**Step 1 — Open the Pull Request**
Go to: **https://github.com/aryanajit24/mr-happy-restaurants/pull/1**

**Step 2 — Mark it as Ready**
At the bottom of the PR page, click **"Ready for review"** (the PR is currently in draft mode — this button converts it so it can be merged).

**Step 3 — Merge it**
Click the green **"Merge pull request"** button → then **"Confirm merge"**.

**Step 4 — Watch the deployment**
Go to **https://github.com/aryanajit24/mr-happy-restaurants/actions** and watch the "Deploy to GitHub Pages" workflow run. It takes about 2 minutes.

**Step 5 — Your site is live! 🎉**
Visit **https://aryanajit24.github.io/mr-happy-restaurants/** — it will show the full Mr. Happy restaurant ordering app.

> **Why does this fix it?** The current `main` branch had two broken workflows added to it manually — one tried to deploy raw TypeScript source files (no build), another tried to use Jekyll (wrong framework). This PR removes both and replaces them with the correct workflow that actually builds the React app first.

---

## 🚀 Deployments

### How it works

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

1. Installs dependencies with **pnpm**.
2. Builds the React/Vite frontend with the correct base path (`/mr-happy-restaurants/`).
3. Publishes the `dist/public/` output to **GitHub Pages** via `actions/deploy-pages`.

### Trigger a redeploy

- **Automatic**: Push any commit to `main`.
- **Manual**: Go to **Actions → Deploy to GitHub Pages → Run workflow** in the GitHub UI.

---

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Start the development server (hot-reload)
pnpm dev

# Build for production (full stack — client + server)
pnpm build

# Build client-only (GitHub Pages style)
pnpm exec vite build --base=/mr-happy-restaurants/
```

The dev server runs the Express backend alongside the Vite dev server. For local development you do **not** need the `--base` flag; the base defaults to `/`.

---

## 📐 Framework notes

| Detail | Value |
|--------|-------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Router | [wouter](https://github.com/molefrog/wouter) |
| Build output | `dist/public/` |
| GitHub Pages base path | `/mr-happy-restaurants/` |
| Package manager | pnpm 10 |

### Base path

`vite.config.ts` reads the `BASE_PATH` environment variable to set Vite's `base` option. The workflow sets `BASE_PATH=/mr-happy-restaurants/` at build time, and `import.meta.env.BASE_URL` is passed as the `base` prop to wouter's `Router` so all client-side routes resolve correctly under the sub-path.

### SPA / 404 fallback

GitHub Pages returns a `404` for any URL that isn't a real file. `client/public/404.html` captures the intended URL, stores it in `sessionStorage`, and redirects to the app root. A small inline script in `client/index.html` then restores the URL so the client-side router navigates to the correct page.

## 🚀 Deployments

### How it works

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

1. Installs dependencies with **pnpm**.
2. Builds the React/Vite frontend with the correct base path (`/mr-happy-restaurants/`).
3. Publishes the `dist/public/` output to **GitHub Pages** via `actions/deploy-pages`.

### Trigger a redeploy

- **Automatic**: Push any commit to `main`.
- **Manual**: Go to **Actions → Deploy to GitHub Pages → Run workflow** in the GitHub UI.

---

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Start the development server (hot-reload)
pnpm dev

# Build for production (full stack — client + server)
pnpm build

# Build client-only (GitHub Pages style)
pnpm exec vite build --base=/mr-happy-restaurants/
```

The dev server runs the Express backend alongside the Vite dev server. For local development you do **not** need the `--base` flag; the base defaults to `/`.

---

## 📐 Framework notes

| Detail | Value |
|--------|-------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Router | [wouter](https://github.com/molefrog/wouter) |
| Build output | `dist/public/` |
| GitHub Pages base path | `/mr-happy-restaurants/` |
| Package manager | pnpm 10 |

### Base path

`vite.config.ts` reads the `BASE_PATH` environment variable to set Vite's `base` option. The workflow sets `BASE_PATH=/mr-happy-restaurants/` at build time, and `import.meta.env.BASE_URL` is passed as the `base` prop to wouter's `Router` so all client-side routes resolve correctly under the sub-path.

### SPA / 404 fallback

GitHub Pages returns a `404` for any URL that isn't a real file. `client/public/404.html` captures the intended URL, stores it in `sessionStorage`, and redirects to the app root. A small inline script in `client/index.html` then restores the URL so the client-side router navigates to the correct page.
