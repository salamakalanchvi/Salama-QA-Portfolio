import { test } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const CHECKOUT_INFO_VALID = {
  firstName: 'Salama',
  lastName: 'Awan',
  postalCode: '12345',
};

const PRODUCT = 'Sauce Labs Backpack';

/* -------------------------- Error Messages --------------------------- */

const ERROR_FIRSTNAME_REQUIRED = 'Error: First Name is required';
const ERROR_LASTNAME_REQUIRED = 'Error: Last Name is required';
const ERROR_POSTALCODE_REQUIRED = 'Error: Postal Code is required';

/* --------------------------- Test Scenarios --------------------------- */

test.describe('Sauce Demo - Checkout Form Validation', () => {

  test.beforeEach(async ({ userInventoryPage, userCartPage }) => {
    await test.step('Prepare checkout form', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(PRODUCT);
      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
    });
  });

  test(
    'Empty first name validation',
    {
      tag: ['@regression', '@negative', '@checkout', '@validation'],
    },
    async ({ userCartPage }) => {

    await test.step('Submit checkout with empty first name', async () => {
      await userCartPage.fillCheckoutInformation(
        '',
        CHECKOUT_INFO_VALID.lastName,
        CHECKOUT_INFO_VALID.postalCode
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Verify error message', async () => {
      await userCartPage.verifyCheckoutError(ERROR_FIRSTNAME_REQUIRED);
    });
  });

  test(
    'Empty last name validation',
    {
      tag: ['@regression', '@negative', '@checkout', '@validation'],
    },
    async ({ userCartPage }) => {

    await test.step('Submit checkout with empty last name', async () => {
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_INFO_VALID.firstName,
        '',
        CHECKOUT_INFO_VALID.postalCode
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Verify error message', async () => {
      await userCartPage.verifyCheckoutError(ERROR_LASTNAME_REQUIRED);
    });
  });

  test(
    'Empty postal code validation',
    {
      tag: ['@regression', '@negative', '@checkout', '@validation'],
    },
    async ({ userCartPage }) => {

    await test.step('Submit checkout with empty postal code', async () => {
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_INFO_VALID.firstName,
        CHECKOUT_INFO_VALID.lastName,
        ''
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Verify error message', async () => {
      await userCartPage.verifyCheckoutError(ERROR_POSTALCODE_REQUIRED);
    });
  });

});
