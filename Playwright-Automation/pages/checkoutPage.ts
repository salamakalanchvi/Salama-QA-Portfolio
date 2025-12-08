import { Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { LocatorDetails } from '../utilities/common/locatorDetails';
import { extractAmount } from '../utilities/helpers/amount.helper';

export class CheckoutPage {
  private readonly page: Page;
  private readonly locators: Record<string, LocatorDetails>;

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
      summarySubtotal: {
        description: 'Order subtotal',
        locator: this.page.locator('.summary_subtotal_label'),
      },
      summaryTax: {
        description: 'Order tax',
        locator: this.page.locator('.summary_tax_label'),
      },
      summaryTotal: {
        description: 'Order total',
        locator: this.page.locator('.summary_total_label'),
      },
      cartItems: {
        description: 'Checkout summary cart items',
        locator: this.page.locator('.cart_item'),
      },
    };
  }

  /* ----------------------------- Actions ----------------------------- */

  async completeCheckout() {
    logger.info('Completing checkout');
    await this.locators.finishButton.locator.click();
    await this.verifyOrderConfirmation();
  }

  /* ---------------------------- Validations --------------------------- */

  async verifyOrderConfirmation() {
    logger.info('Verifying order confirmation');
    await expect(this.locators.completeHeader.locator)
      .toHaveText('Thank you for your order!');
  }

  async verifyOrderSummaryItemCount(expectedCount: number) {
    logger.info(`Verifying order summary item count: ${expectedCount}`);
    await expect(this.locators.cartItems.locator)
      .toHaveCount(expectedCount);
  }

  async verifyTotalCalculation() {
    logger.info('Verifying total calculation');

    const subtotal = extractAmount(
      await this.locators.summarySubtotal.locator.textContent(),
      'Item total: $'
    );

    const tax = extractAmount(
      await this.locators.summaryTax.locator.textContent(),
      'Tax: $'
    );

    const total = extractAmount(
      await this.locators.summaryTotal.locator.textContent(),
      'Total: $'
    );

    const expectedTotal = Number((subtotal + tax).toFixed(2));
    await expect(total).toBeCloseTo(expectedTotal, 2);
  }
}
