<!-- HEADER BANNER -->
<p align="center">
  <img src="https://img.shields.io/badge/Playwright%20Automation-Suite-2ea44f?style=for-the-badge" />
</p>

<h1 align="center">🚀 End-to-End Playwright Automation Framework</h1>

<p align="center">
  <strong>Production-Ready E2E Testing Framework</strong>  
  <br/>
  Built with Page Objects • Role-based Fixtures • Storage State • CI/CD • Allure • HTML Reports
</p>

<p align="center">
  <a href="https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright.yml">
    <img src="https://github.com/salamakalanchvi/salama-playwright-automation/actions/workflows/playwright.yml/badge.svg" />
  </a>
  <img src="https://img.shields.io/badge/Playwright%20Tests-Automated-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Allure-Reporting-ff69b4?style=flat-square" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-yellow?style=flat-square" />
</p>


---

# 📁 Project Structure 

```bash
Playwright-Automation/
│
├── tests/                   # Smoke + Regression test suites
├── pages/                   # Page Object Model files
├── fixtures/                # Role-based fixtures (User/Admin)
├── utilities/               # Logger, helpers, global setup, common utilities
├── storage/                 # Authenticated storage states (user/admin)
├── config/                  # Environment variables (baseURL, credentials)
````

---

# ⚡ Quick Start (Windows / PowerShell)

```powershell
cd Playwright-Automation
npm ci
npx playwright install
npm run test:smoke
npm run report:open
```

---

# 🧪 Available npm Scripts

| Script               | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| **test:smoke**       | Runs smoke suite (Chromium + user)                         |
| **test:regression**  | Full regression suite                                      |
| **test**             | Run everything                                             |
| **report:open**      | Opens Playwright HTML report                               |
| **allure:serve**     | Opens Allure report (no Java) OR Java version if installed |
| **install-browsers** | Installs Playwright browser binaries                       |

---

# 🧩 Architecture Overview (POM + Fixtures + Storage State)

## ✔ Page Object Model (POM)

Each page contains:

* All locators
* All actions
* Clean method naming
* Logging for every interaction
* Zero test logic (tests stay clean)

### Example:

```ts
await userInventoryPage.addItemToCart('Sauce Labs Backpack');
```

---

## ✔ Role-Based Fixtures

Your tests automatically load correct user/admin context:

```ts
import { test } from '../fixtures/user.fixtures';
```

vs

```ts
import { test } from '../fixtures/admin.fixtures';
```

This keeps tests clean and context-specific.

---

## ✔ Storage State Authentication

Login happens ONE TIME using global-setup.

Fast. Reliable. Recommended by Playwright team.

---

# 🧪 Example E2E Test (Readable + Real)

```ts
test('Checkout flow', async ({ 
  userLoginPage, 
  userInventoryPage, 
  userCartPage, 
  userCheckoutPage 
}) => {

  await test.step('Login', async () => {
    await userLoginPage.login();
  });

  await test.step('Add product to cart', async () => {
    await userInventoryPage.addItemToCart('Sauce Labs Backpack');
  });

  await test.step('Complete checkout', async () => {
    await userCartPage.checkout('Salama', 'Awan', '12345');
    await userCheckoutPage.finish();
  });

});
```

---

# 📊 Reporting

## ✔ Playwright HTML Report

Built-in and auto-generated.

Run:

```
npm run report:open
```

### Test Results

**Current Status:** 26/26 tests passing ✅
- **Smoke Suite:** 2 tests (login + E2E checkout)
- **Regression Suite:** 24 tests (login, cart, checkout, inventory, session, edge cases)



https://github.com/user-attachments/assets/89520873-4553-4cd7-b5fb-5a1df7cdb4f6



---

## ✔ Allure Report (optional)

If Java installed:

```
npm run allure:generate
npm run allure:open
```

If using no-Java version:

```
npm run allure:serve
```


https://github.com/user-attachments/assets/a8c6fafb-a277-4662-b09b-2327613082aa


---

# 🚀 CI/CD (GitHub Actions)

Automatically:

✔ Installs dependencies
✔ Installs browsers
✔ Runs full test matrix
✔ Uploads reports as artifacts
✔ Deploys report to GitHub Pages


https://github.com/user-attachments/assets/b0095c41-6053-4c97-ac23-4682f1394fd7



---

# 💡 What I Learned Building This

* **Page Objects** keep tests readable when you hit 50+ test cases
* **Storage state** authentication saves 30+ seconds per test
* **Fixtures** were confusing at first, now I can't live without them
* **TypeScript** caught bugs before I ran tests (worth the learning curve)
* **GitHub Actions** failed 10 times before I got it right
* **Test organization** matters - smoke vs regression makes running tests faster

I built this the same way I built frameworks at my last two jobs.

---

# 🛠 Future Enhancements

* Visual Regression Testing
* API integration using Playwright API
* Data-driven testing utilities
* Parallel regression matrix
* Slack/Teams CI notifications
* Retry logic + smart waits
* Advanced error screenshot annotation

