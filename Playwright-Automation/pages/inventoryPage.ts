import { Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';

export class InventoryPage {
  private readonly page: Page;

  private locators: { [key: string]: LocatorDetails };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      cartBadge: {
        description: 'Cart badge icon showing total items',
        locator: this.page.locator('.shopping_cart_badge'),
      },
       addToCartButton: {
        description: 'Add to cart button for the Backpack product',
        locator: this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
      },

      
    };
  }


  async goToInventory() {
    logger.info(`Opening Inventory page`);
    await this.page.goto('/inventory.html');
    await this.page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]');
  }


  async addItemToCart(productName: string) {
    logger.info(`Adding product: ${productName}`);
    await this.locators.addToCartButton.locator.click();
    await expect(this.locators.cartBadge.locator).toHaveText(/\d+/);
  }
}
