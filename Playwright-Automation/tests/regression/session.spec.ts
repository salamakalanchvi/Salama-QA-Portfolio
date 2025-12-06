import { test } from '../../fixtures/user.fixtures';

/* --------------------------- Test Scenarios --------------------------- */

test.describe('Sauce Demo - Session Management', () => {

  test('User logs out successfully @regression @session', async ({ userInventoryPage }) => {

    await test.step('Navigate to inventory page', async () => {
      await userInventoryPage.goToInventory();
    });

    await test.step('Logout from application', async () => {
      await userInventoryPage.logout();
    });

    await test.step('Verify user is redirected to login page', async () => {
      await userInventoryPage.verifyUserIsOnLoginPage();
    });
  });

  test('Protected pages are inaccessible after logout @regression @session @edge', async ({
    userInventoryPage,
  }) => {

    await test.step('Navigate to inventory page', async () => {
      await userInventoryPage.goToInventory();
    });

    await test.step('Logout from application', async () => {
      await userInventoryPage.logout();
    });

    await test.step('Attempt to access inventory page directly', async () => {
      await userInventoryPage.tryAccessInventoryDirectly();
    });

    await test.step('Verify user is redirected back to login page', async () => {
      await userInventoryPage.verifyUserIsOnLoginPage();
    });
  });

});
