import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

type UserFixtures = {
  userPage: Page;
  userLoginPage: LoginPage;
  userInventoryPage: InventoryPage;
  userCartPage: CartPage;
  userCheckoutPage: CheckoutPage;
};

export const test = base.extend<UserFixtures>({
  userPage: async ({ page }, use) => {
    // Use the Playwright-provided `page` so project-level `storageState` (if set)
    // is applied. This keeps fixtures aligned with Playwright's built-in contexts.
    await use(page);
  },

  userLoginPage: async ({ userPage }, use) => {
    await use(new LoginPage(userPage));
  },

  userInventoryPage: async ({ userPage }, use) => {
    await use(new InventoryPage(userPage));
  },

  userCartPage: async ({ userPage }, use) => {
    await use(new CartPage(userPage));
  },

  userCheckoutPage: async ({ userPage }, use) => {
    await use(new CheckoutPage(userPage));
  },
});
