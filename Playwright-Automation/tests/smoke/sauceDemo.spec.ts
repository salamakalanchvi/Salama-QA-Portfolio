import { test } from '../../fixtures/user.fixtures';

const product = "Sauce Labs Backpack";

const checkoutInfo = {
  firstName: "Salama",
  lastName: "Awan",
  postalCode: "12345",
};

test('Sauce Demo - End to End Checkout Flow', async ({
  userInventoryPage,
  userCartPage,
  userCheckoutPage,
}) => {

  await test.step(`Open Inventory page`, async () => {
  await userInventoryPage.goToInventory();
  });

  await test.step(`Add item to cart: ${product}`, async () => {
    await userInventoryPage.addItemToCart(product);
  });

   await test.step(`Open cart`, async () => {
    await userCartPage.goToCart();
  });

  await test.step('Enter checkout information', async () => {
    await userCartPage.checkout(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
  });

  await test.step('Complete checkout', async () => {
    await userCheckoutPage.completeCheckout();
  });

});
