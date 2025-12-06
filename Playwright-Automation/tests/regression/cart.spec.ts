import { test } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const CHECKOUT_USER = {
  firstName: 'Salama',
  lastName: 'Awan',
  postalCode: '12345',
};

const SINGLE_PRODUCT = 'Sauce Labs Backpack';

const MULTIPLE_PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

/* --------------------------- Cart Operations -------------------------- */

test.describe('Sauce Demo - Cart Operations', () => {

  test.beforeEach(async ({ userInventoryPage }) => {
    await userInventoryPage.goToInventory();
  });

  test('Remove item from cart @regression @cart', async ({ userInventoryPage, userCartPage }) => {

    await test.step('Add product to cart', async () => {
      await userInventoryPage.addItemToCart(SINGLE_PRODUCT);
    });

    await test.step('Open cart', async () => {
      await userCartPage.openCart();
    });

    await test.step('Remove product from cart', async () => {
      await userCartPage.removeItem(SINGLE_PRODUCT);
    });

    await test.step('Verify cart is empty', async () => {
      await userCartPage.verifyCartItemCount(0);
    });
  });

  test('View order summary with correct items @regression @cart', async ({
    userInventoryPage,
    userCartPage,
    userCheckoutPage,
  }) => {

    await test.step('Add multiple products to cart', async () => {
      for (const product of MULTIPLE_PRODUCTS.slice(0, 2)) {
        await userInventoryPage.addItemToCart(product);
      }
    });

    await test.step('Proceed to checkout overview', async () => {
      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_USER.firstName,
        CHECKOUT_USER.lastName,
        CHECKOUT_USER.postalCode
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Verify order summary item count', async () => {
      await userCheckoutPage.verifyOrderSummaryItemCount(2);
    });
  });

});

/* ----------------------- Multiple Items Checkout ---------------------- */

test.describe('Sauce Demo - Multiple Items Checkout', () => {

  test('Complete checkout with multiple items @regression @cart @checkout', async ({
    userInventoryPage,
    userCartPage,
    userCheckoutPage,
  }) => {

    await test.step('Add multiple products to cart', async () => {
      await userInventoryPage.goToInventory();
      for (const product of MULTIPLE_PRODUCTS) {
        await userInventoryPage.addItemToCart(product);
      }
    });

    await test.step('Proceed through checkout', async () => {
      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_USER.firstName,
        CHECKOUT_USER.lastName,
        CHECKOUT_USER.postalCode
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Complete order', async () => {
      await userCheckoutPage.completeCheckout();
    });
  });

  test('Verify total calculation in checkout @regression @cart @checkout', async ({
    userInventoryPage,
    userCartPage,
    userCheckoutPage,
  }) => {

    await test.step('Add products to cart', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(MULTIPLE_PRODUCTS[0]);
      await userInventoryPage.addItemToCart(MULTIPLE_PRODUCTS[1]);
    });

    await test.step('Proceed to checkout overview', async () => {
      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_USER.firstName,
        CHECKOUT_USER.lastName,
        CHECKOUT_USER.postalCode
      );
      await userCartPage.continueCheckout();
    });

    await test.step('Verify total calculation', async () => {
      await userCheckoutPage.verifyTotalCalculation();
    });
  });

});
