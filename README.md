# Mr. Happy Restaurants 🍕🍔🥙

Online menu & ordering showcase for **Mr. Happy Restaurants** in Bremen & Schwanewede — Döner, Burger, Pizza & mehr.

## 🌐 Live Site

**[https://aryanajit24.github.io/mr-happy-restaurants/](https://aryanajit24.github.io/mr-happy-restaurants/)**

Deployed automatically to GitHub Pages from the `main` branch on every push.

---

## ⚡ One-time Setup (do this once, then it's automatic)

Before the site goes live you need to activate GitHub Pages in the repo settings — this only needs to happen once:

1. **Merge this PR** into `main` first. The workflow file (`deploy.yml`) must be on `main` before GitHub Pages can use it. Any other workflow files that were previously added for GitHub Pages (e.g. `static.yml`, `jekyll-gh-pages.yml`) are removed by this PR — the new `deploy.yml` is the only one needed.

2. Go to **https://github.com/aryanajit24/mr-happy-restaurants/settings/pages**

3. Under **"Build and deployment"** → **"Source"**, open the dropdown and select **"GitHub Actions"**.
   - The dropdown may currently say *"Deploy from a branch"*. Click it, then choose **"GitHub Actions"** from the list.
   - A **Save** button will appear immediately to the right of the dropdown (or just below it on narrow screens). Click **Save**.
   - If you do not see a Save button after selecting "GitHub Actions", try scrolling down — it may be below the fold.

4. The workflow will start automatically within seconds. Watch progress at **Actions → "Deploy to GitHub Pages"**.

5. Once the workflow finishes (usually under 2 minutes) the site is live at:
   **https://aryanajit24.github.io/mr-happy-restaurants/** 🎉

> **Note:** The repo is private but the published Pages site will be public — GitHub warns about this when you enable Pages. That's expected for a restaurant website.
>
> **Troubleshooting "Save" button:** The Save button only appears after you actively change the Source selection. If you already see "GitHub Actions" selected and no Save button, Pages may already be configured correctly — check the Actions tab to see if a deployment is running.

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
