import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

type AdminFixtures = {
  adminPage: Page;
  adminLoginPage: LoginPage;
};

export const test = base.extend<AdminFixtures>({
  adminPage: async ({ page }, use) => {
    // Use the Playwright-provided `page` so project-level `storageState` (if set)
    // is applied. Avoid creating separate contexts in fixtures.
    await use(page);
  },

  adminLoginPage: async ({ adminPage }, use) => {
    await use(new LoginPage(adminPage));
  },
});
