import { test } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

/* --------------------------- Test Scenarios --------------------------- */

test.describe('Sauce Demo - Inventory Sorting', () => {

  test.beforeEach(async ({ userInventoryPage }) => {
    await userInventoryPage.goToInventory();
  });

  test('Sort products by price (low to high) @regression @inventory', async ({ userInventoryPage }) => {

    await test.step('Sort products by price (low to high)', async () => {
      await userInventoryPage.sortProducts('lohi');
    });

    await test.step('Verify products are sorted by price', async () => {
      await userInventoryPage.verifyProductsSortedByPriceLowToHigh();
    });
  });

  test('Sort products by name (A to Z) @regression @inventory', async ({ userInventoryPage }) => {

    await test.step('Sort products by name A to Z', async () => {
      await userInventoryPage.sortProducts('az');
    });

    await test.step('Verify products are sorted alphabetically', async () => {
      await userInventoryPage.verifyProductsSortedByNameAToZ();
    });
  });

});

test.describe('Sauce Demo - Inventory Cart Operations', () => {

  test.beforeEach(async ({ userInventoryPage }) => {
    await userInventoryPage.goToInventory();
  });

  test('Add multiple products to cart @regression @inventory', async ({ userInventoryPage }) => {

    await test.step('Add multiple products', async () => {
      for (const product of PRODUCTS) {
        await userInventoryPage.addItemToCart(product);
      }
    });

    await test.step('Verify cart shows correct count', async () => {
      await userInventoryPage.verifyCartItemCount(3);
    });
  });

  test('Remove product from cart via inventory @regression @inventory', async ({ userInventoryPage }) => {

    await test.step('Add product to cart', async () => {
      await userInventoryPage.addItemToCart(PRODUCTS[0]);
    });

    await test.step('Remove product from inventory', async () => {
      await userInventoryPage.removeItemFromInventory(PRODUCTS[0]);
    });

    await test.step('Verify cart is empty', async () => {
      await userInventoryPage.verifyCartItemCount(0);
    });
  });

});
