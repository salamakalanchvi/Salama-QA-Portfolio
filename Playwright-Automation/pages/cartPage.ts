import { Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';
import { getProductSlug } from '../utilities/helpers/product.helper';

export class CartPage {
  private readonly page: Page;
  private readonly locators: Record<string, LocatorDetails>;

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      cartButton: {
        description: 'Cart button',
        locator: this.page.locator('[data-test="shopping-cart-link"]'),
      },
      checkoutButton: {
        description: 'Checkout button',
        locator: this.page.getByRole('button', { name: 'Checkout' }),
      },
      firstNameInput: {
        description: 'First name input',
        locator: this.page.getByPlaceholder('First Name'),
      },
      lastNameInput: {
        description: 'Last name input',
        locator: this.page.getByPlaceholder('Last Name'),
      },
      postalCodeInput: {
        description: 'Postal code input',
        locator: this.page.getByPlaceholder('Zip/Postal Code'),
      },
      continueButton: {
        description: 'Continue button',
        locator: this.page.getByRole('button', { name: 'Continue' }),
      },
      continueShoppingButton: {
        description: 'Continue shopping button',
        locator: this.page.getByRole('button', { name: 'Continue Shopping' }),
      },
      cartItems: {
        description: 'Cart items',
        locator: this.page.locator('.cart_item'),
      },
      errorMessage: {
        description: 'Checkout error message',
        locator: this.page.locator('[data-test="error"]'),
      },
    };
  }

  /* ----------------------------- Actions ----------------------------- */

  async openCart() {
    logger.info('Opening cart');
    await this.locators.cartButton.locator.click();
  }

  async proceedToCheckout() {
    logger.info('Proceeding to checkout');
    await this.locators.checkoutButton.locator.click();
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    logger.info('Filling checkout information');
    await this.locators.firstNameInput.locator.fill(firstName);
    await this.locators.lastNameInput.locator.fill(lastName);
    await this.locators.postalCodeInput.locator.fill(postalCode);
  }

  async continueCheckout() {
    logger.info('Continuing checkout');
    await this.locators.continueButton.locator.click();
  }

  async removeItem(productName: string) {
    const slug = getProductSlug(productName);
    logger.info(`Removing product: ${productName}`);
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async continueShopping() {
    logger.info('Continuing shopping');
    await this.locators.continueShoppingButton.locator.click();
  }

  /* ---------------------------- Validations ---------------------------- */

  async verifyCartItemCount(expectedCount: number) {
    logger.info(`Verifying cart item count: ${expectedCount}`);
    await expect(this.locators.cartItems.locator)
      .toHaveCount(expectedCount);
  }

  async verifyCheckoutError(expectedMessage: string) {
    logger.info(`Verifying checkout error: "${expectedMessage}"`);
    await expect(this.locators.errorMessage.locator)
      .toContainText(expectedMessage);
  }

  async verifyCartPageIsOpen() {
  logger.info('Verifying cart page is open');
  await expect(this.page).toHaveURL(/.*cart\.html/);
}
}