import { Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';

export class CheckoutPage {
  private readonly page: Page;

  private locators: { [key: string]: LocatorDetails };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      finishButton: {
        description: 'Finish checkout button',
        locator: this.page.getByRole('button', { name: 'Finish' }),
      },
      completeHeader: {
        description: 'Order success message',
        locator: this.page.locator('.complete-header'),
      },
    };
  }
  
  async completeCheckout() {
    logger.info('Completing checkout');
    await this.locators.finishButton.locator.click();
    await expect(this.locators.completeHeader.locator).toHaveText(
      'Thank you for your order!'
    );
  }
}
