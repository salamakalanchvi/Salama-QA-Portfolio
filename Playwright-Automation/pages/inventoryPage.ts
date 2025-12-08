import { Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';
import { getProductSlug } from '../utilities/helpers/product.helper';

export class InventoryPage {
  private readonly page: Page;
  private readonly locators: Record<string, LocatorDetails>;

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      cartBadge: {
        description: 'Cart badge',
        locator: this.page.locator('.shopping_cart_badge'),
      },
      sortDropdown: {
        description: 'Product sort dropdown',
        locator: this.page.locator('[data-test="product-sort-container"]'),
      },
      productItems: {
        description: 'Product items',
        locator: this.page.locator('.inventory_item'),
      },
      productNames: {
        description: 'Product names',
        locator: this.page.locator('.inventory_item_name'),
      },
      productPrices: {
        description: 'Product prices',
        locator: this.page.locator('.inventory_item_price'),
      },
      menuButton: {
        description: 'Hamburger menu button',
        locator: this.page.locator('#react-burger-menu-btn'),
      },
      logoutLink: {
        description: 'Logout link in menu',
        locator: this.page.locator('#logout_sidebar_link'),
      },
    };
  }

  /* ----------------------------- Actions ----------------------------- */

  async goToInventory() {
    logger.info('Opening Inventory page');
    await this.page.goto('/inventory.html');
    await this.locators.productItems.locator.first().waitFor();
  }

  async addItemToCart(productName: string) {
    logger.info(`Adding product: ${productName}`);
    const slug = getProductSlug(productName);
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
    await expect(this.locators.cartBadge.locator).toBeVisible();
  }

  async removeItemFromInventory(productName: string) {
    logger.info(`Removing product: ${productName}`);
    const slug = getProductSlug(productName);
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async sortProducts(sortOption: string) {
    logger.info(`Sorting products by option: ${sortOption}`);
    await this.locators.sortDropdown.locator.selectOption(sortOption);
  }

  /* ---------------------------- Validations --------------------------- */

  async verifyProductsSortedByPriceLowToHigh() {
    logger.info('Verifying products sorted by price (low to high)');
    const prices = await this.locators.productPrices.locator.allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numericPrices].sort((a, b) => a - b);

    await expect(numericPrices).toEqual(sorted);
  }

  async verifyProductsSortedByNameAToZ() {
    logger.info('Verifying products sorted alphabetically (A–Z)');
    const names = await this.locators.productNames.locator.allTextContents();
    const sorted = [...names].sort();

    await expect(names).toEqual(sorted);
  }

  async verifyCartItemCount(expectedCount: number) {
    logger.info(`Verifying cart item count: ${expectedCount}`);
    const badge = this.locators.cartBadge.locator;

    if (expectedCount === 0) {
      await expect(badge).toBeHidden();
    } else {
      await expect(badge).toHaveText(String(expectedCount));
    }
  }

  async reloadPage() {
    logger.info('Reloading inventory page');
    await this.page.reload();
  }

  async logout() {
    logger.info('Logging out from application');
    await this.locators.menuButton.locator.click();
    await this.locators.logoutLink.locator.waitFor({ state: 'visible' });
    await this.locators.logoutLink.locator.click();
  }

  async tryAccessInventoryDirectly() {
    logger.info('Attempting to access inventory page directly');
    await this.page.goto('/inventory.html');
  }

  async verifyUserIsOnLoginPage() {
    logger.info('Verifying user is on login page');
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }
}
