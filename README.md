# Salama QA Portfolio

[![Playwright Tests](https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright.yml)
[![GitHub Pages](https://img.shields.io/badge/pages-deployed-blue)](https://salamakalanchvi.github.io/salama-playwright-automation/)

This repository demonstrates end-to-end test automation using Playwright, plus manual testing artifacts and templates used during QA work.

**Highlights**
- **Tech:** Playwright, TypeScript, Node.js
- **Automation:** Organized `Playwright-Automation` suite with tests, pages, fixtures and reports
- **Manual testing artifacts:** `Manual-Testing/` with templates for bug reports, test plans, and RTM

**Quick Start**
1. Install dependencies (root may not contain tests):
```powershell
cd Playwright-Automation
npm ci
npx playwright install
```
2. Run a quick smoke test:
```powershell
cd Playwright-Automation
npm run test:smoke
```
3. Generate and open Allure report (Allure is installed as a dev dependency):
```powershell
cd Playwright-Automation
# run tests first (this will produce files in `allure-results`)
npm run test
# generate the HTML report from `allure-results`
npm run allure:generate
# open the generated report in your browser
npm run allure:open
```

**Why this repo**
- Shows practical automation skills: reliable test structure, fixtures, page objects, and report generation.
- Includes manual testing templates to show process understanding and traceability.

**What to look for**
- `Playwright-Automation/tests` — test suites
- `Playwright-Automation/pages` — page objects
- `Playwright-Automation/utilities` — helpers and global setup
- `Manual-Testing` — templates and examples
- `Playwright-Automation/allure-results` — raw Allure test results
- `Playwright-Automation/allure-report` — generated Allure HTML report
- `Playwright-Automation/playwright-report` — Playwright's built-in HTML report

**Impact & Metrics**
- **Tests (automated):** 1 spec (smoke) — located at `Playwright-Automation/tests/smoke/sauceDemo.spec.ts` (expand later)
- **Avg runtime (smoke):** ~10–30s locally (depends on machine)
- **Flakiness:** Not measured automatically — no flaky behavior observed in local runs. Add CI flakiness tracking for long-term metrics.
- **Coverage:** High-level UI flows: Login, Cart, Checkout, Inventory
- **Business impact:** Demonstrates ability to automate critical checkout flow; extend to broader regression suite to provide release confidence and measurable time savings

**Reports**
- **Allure:** generated from `Playwright-Automation/allure-results` into `Playwright-Automation/allure-report` using `npm run allure:generate` and opened with `npm run allure:open`.
- **Playwright HTML report:** available at `Playwright-Automation/playwright-report` after running tests.

**Contact**: salamaawan397@gmail.com