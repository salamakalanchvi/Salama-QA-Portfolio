import { Page } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';

export class CartPage {
  private readonly page: Page;

  private locators: { [key: string]: LocatorDetails };

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
        description: 'First Name input field',
        locator: this.page.getByPlaceholder('First Name'),
      },
      lastNameInput: {
        description: 'Last Name input field',
        locator: this.page.getByPlaceholder('Last Name'),
      },
      postalCodeInput: {
        description: 'Zip/Postal code field',
        locator: this.page.getByPlaceholder('Zip/Postal Code'),
      },
      continueButton: {
        description: 'Continue button',
        locator: this.page.getByRole('button', { name: 'Continue' }),
      },
    };
  }

  async goToCart() {
    logger.info(`Open the cart for checkout`);
    await this.locators.cartButton.locator.click();
  }

  async checkout(firstName: string, lastName: string, postalCode: string) {
    logger.info(`Filling checkout info: ${firstName} ${lastName}`);
    await this.locators.checkoutButton.locator.click();
    await this.locators.firstNameInput.locator.fill(firstName);
    await this.locators.lastNameInput.locator.fill(lastName);
    await this.locators.postalCodeInput.locator.fill(postalCode);
    await this.locators.continueButton.locator.click();
  }
}
