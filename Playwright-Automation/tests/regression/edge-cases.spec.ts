import { test } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const CHECKOUT_INFO = {
  firstName: 'Salama',
  lastName: 'Awan',
  postalCode: '12345',
};

const PRODUCT_ONE = 'Sauce Labs Backpack';
const PRODUCT_TWO = 'Sauce Labs Bike Light';

/* --------------------------- Cart Persistence ------------------------- */

test.describe('Edge Cases - Cart Persistence', () => {

  test('Cart persists after page refresh @regression @edge @cart', async ({
    userInventoryPage,
    userCartPage,
  }) => {

    await test.step('Add product to cart', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(PRODUCT_ONE);
    });

    await test.step('Refresh inventory page', async () => {
      await userInventoryPage.reloadPage();
    });

    await test.step('Verify cart count persisted', async () => {
      await userInventoryPage.verifyCartItemCount(1);
    });

    await test.step('Verify item still exists in cart', async () => {
      await userCartPage.openCart();
      await userCartPage.verifyCartItemCount(1);
    });
  });

});

/* ------------------------- Multiple Checkouts ------------------------- */

test.describe('Edge Cases - Multiple Checkouts', () => {

  test('Multiple checkouts in sequence @regression @edge @checkout', async ({
    userInventoryPage,
    userCartPage,
    userCheckoutPage,
  }) => {

    await test.step('First checkout', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(PRODUCT_ONE);

      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );
      await userCartPage.continueCheckout();
      await userCheckoutPage.completeCheckout();
    });

    await test.step('Second checkout', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(PRODUCT_TWO);

      await userCartPage.openCart();
      await userCartPage.proceedToCheckout();
      await userCartPage.fillCheckoutInformation(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );
      await userCartPage.continueCheckout();
      await userCheckoutPage.completeCheckout();
    });
  });

});

/* ---------------------------- Empty Cart ------------------------------ */

test.describe('Edge Cases - Empty Cart', () => {

  test('Empty cart after removing all items @regression @edge @cart', async ({
    userInventoryPage,
    userCartPage,
  }) => {

    await test.step('Add multiple products', async () => {
      await userInventoryPage.goToInventory();
      await userInventoryPage.addItemToCart(PRODUCT_ONE);
      await userInventoryPage.addItemToCart(PRODUCT_TWO);
    });

    await test.step('Remove all products from cart', async () => {
      await userCartPage.openCart();
      await userCartPage.removeItem(PRODUCT_ONE);
      await userCartPage.removeItem(PRODUCT_TWO);
    });

    await test.step('Verify cart is empty', async () => {
      await userCartPage.verifyCartItemCount(0);
    });

    await test.step('Verify cart page remains accessible', async () => {
      await userCartPage.verifyCartPageIsOpen();
    });
  });

});
