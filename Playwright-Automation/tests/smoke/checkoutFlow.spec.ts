import { test } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const PRODUCT = 'Sauce Labs Backpack';

const CHECKOUT_INFO = {
  firstName: 'Salama',
  lastName: 'Awan',
  postalCode: '12345',
};

/* ---------------------------- Smoke Tests ---------------------------- */

test.describe('Smoke Tests - Critical User Flows', () => {

  test(
    'User can complete end-to-end checkout',
    {
      tag: ['@smoke', '@critical', '@checkout'],
    },
    async ({ userInventoryPage, userCartPage, userCheckoutPage }) => {

      await test.step('Open inventory page', async () => {
        await userInventoryPage.goToInventory();
      });

      await test.step(`Add product to cart: ${PRODUCT}`, async () => {
        await userInventoryPage.addItemToCart(PRODUCT);
      });

      await test.step('Open cart', async () => {
        await userCartPage.openCart();
      });

      await test.step('Proceed to checkout and enter details', async () => {
        await userCartPage.proceedToCheckout();
        await userCartPage.fillCheckoutInformation(
          CHECKOUT_INFO.firstName,
          CHECKOUT_INFO.lastName,
          CHECKOUT_INFO.postalCode
        );
        await userCartPage.continueCheckout();
      });

      await test.step('Complete checkout successfully', async () => {
        await userCheckoutPage.completeCheckout();
      });
    }
  );

});
