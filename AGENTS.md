# Copilot / Agent Instructions — Access SDK (Apostrophe)

Purpose: give an AI coding agent the minimal, practical knowledge to be productive editing this ApostropheCMS starter kit.

- **Big picture**: This repository is an ApostropheCMS starter site. Server-side modules live in `modules/` (each module has `index.js`). UI assets and component code live under a module's `ui/src` directory. Views/templates are in each module's `views/`.
- **Asset pipeline**: The project uses Apostrophe's Vite integration and a simple build pipeline. Built artifacts appear in `public/apos-frontend/default/` and `public/releases/`. Avoid editing those files directly; change source files under `modules/*/ui/src` and run the build.
- **Key files to check before edits**:
  - `app.js` — main app config (including `shortname` used for DB)
  - `env.tpl` — environment variable template; actual runtime env comes from `.env`
  - `package.json` — scripts (`npm run dev`, `npm run build`, `npm run serve`, `npm run release:env`)
  - `modules/@apostrophecms/asset/index.js` — contains the hot-reload/refresh option used in dev
  - Example widget: `modules/product-grid-widget/` (has `ui/src` and `views/widget.html`)

- **Developer workflows (specific commands)**:
  - Start dev server (watch + restart): `npm run dev` (this uses `dotenv -e .env -- nodemon`)
  - Start admin dev: `npm run dev:admin` (sets `APOS_DEV=1`)
  - Run production build: `npm run build` (calls `@apostrophecms/asset:build`)
  - Run production server: `npm run serve` (NODE_ENV=production)
  - Create admin user (when setting up env): `npx dotenv -e .env -- node app @apostrophecms/user:add myUsername admin`
  - Release helper for deploy: `npm run release:env` and `npm run serve:env`

- **Conventions & patterns specific to this repo**:
  - Module UI code is under `modules/<module-name>/ui/src`. SCSS and JS entry points are commonly named `index.scss` / `index.js` (see `modules/product-grid-widget/ui/src/index.scss`).
  - Views use Nunjucks and live in `modules/<module>/views/*.html` (widget templates are `widget.html`).
  - Admin UI overrides are kept in `admin-ui-overrides/ui/apos/components`.
  - The project uses a theme prefix for `className` options (configured in `app.js`) — look for `th-` namespace.
  - Do not commit built files in `public/apos-frontend/default/` unless intentionally releasing a generated bundle.

- **Integration points / external deps**:
  - `@thirstie/ecomm-vue` is used for ecomm UI components. Changes that affect that integration may need rebuilds.
  - The project interacts with Thirstie APIs via modules like `thirstie-checkout` and product-related modules; look for API calls in `modules/*/index.js`.

- **Debugging notes for agents**:
  - For server-side changes, run `npm run dev` and watch nodemon logs. Nodemon ignores `**/ui/` paths (see `nodemonConfig` in `package.json`).
  - For client-side changes, use the dev script (Vite integration) and inspect `public/apos-frontend/default/` for dev bundles.

- **When editing code**:
  - Prefer editing source under `modules/*/ui/src` and `modules/*/index.js` rather than `public/` build outputs.
  - Make isolated, minimal changes and run `npm run dev` to validate behavior. Mention exact files changed in the commit message.
  - Use `env.tpl` as source of truth for required env vars; do not hardcode secrets — use `.env`.

- **Examples (specific references)**:
  - To change widget styles: edit `modules/product-grid-widget/ui/src/index.scss` then run `npm run dev`.
  - To change global head CSS injection: refer to `modules/theme/index.js` and `modules/theme/views/customStyles.html` examples in the README.

If anything in this file is unclear or you want additional examples (for specific modules or flows), say which area and I will expand the instructions.
