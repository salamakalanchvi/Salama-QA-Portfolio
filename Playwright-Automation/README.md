[![Playwright CI](https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright-ci.yml/badge.svg)](https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright-ci.yml)

# Playwright-Automation

This folder contains the Playwright-based automation suite used in this portfolio.

**Quick Start (Windows / PowerShell)**
```
cd Playwright-Automation
npm ci
npx playwright install
npm run test:smoke
npm run report:open
```

**Available npm scripts**
- `test:smoke`: Run smoke tests (Chromium user project)
- `test:regression`: Run regression tests
- `test`: Run full test suite
- `report:open`: Open the HTML report produced by Playwright
- `install-browsers`: Install Playwright browsers

**Structure**
- `tests/` — test specs and suites
- `pages/` — page object models
- `fixtures/` — test fixtures and test data
- `utilities/` — helpers, global setup, logger
- `playwright-report/` — generated HTML reports

**Tips for reviewers**
- Run `npm ci` and then the `test:smoke` script to see a minimal end-to-end run.
- Check `playwright-report/index.html` after a run for a visual summary.

Add a short GIF or screenshot here showing the `playwright-report` to make evaluation faster.

Quick facts:
- **Automated specs:** 1 smoke spec (`tests/smoke/sauceDemo.spec.ts`)
 - **Automated specs:** 1 smoke spec (`tests/smoke/sauceDemo.spec.ts`)
 - **Example smoke run (local/CI):** 1 test passed — full smoke run ~20s (example observed run: 20.4s)
- **How to generate storage states:** Run the included global setup before CI or locally to create `storage/user.json` and `storage/admin.json`:

```powershell
cd Playwright-Automation
npx playwright test --project=chromium-user --config=playwright.config.ts --workers=1
```

Or run the global setup directly:

```powershell
cd Playwright-Automation
node utilities/globalUtilities/global-setup.ts
```

Note: The repository contains example storage files named `storage/*.example.json`. Generate fresh storage by running the global setup above so tests run with valid sessions.

**Fixtures & Projects**
- Use `fixtures/user.fixtures.ts` when writing tests that should run as a standard user. Import tests like:
```ts
import { test } from '../fixtures/user.fixtures';
```
- Use `fixtures/admin.fixtures.ts` for admin-specific tests.
- The project-level `storageState` is configured in `playwright.config.ts`. Prefer using the Playwright-provided `page` in fixtures (as this project does) so tests respect the project's `storageState` when you run:

Note: The `admin` project in this repository is included as a portfolio example to demonstrate handling multiple roles and storage states. Sauce Demo does not provide a separate admin dashboard for this exercise — the admin project is a placeholder that uses different credentials to show the pattern, not a separate admin UI.

CI badge:  
![Playwright CI](https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright.yml/badge.svg)

```powershell
npx playwright test --project=chromium-user
npx playwright test --project=chromium-admin
```
