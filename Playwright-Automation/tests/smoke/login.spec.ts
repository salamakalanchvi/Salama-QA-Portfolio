import { test, expect } from '../../fixtures/user.fixtures';

/* ----------------------------- Test Data ----------------------------- */

const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

/* ---------------------------- Smoke Tests ---------------------------- */

test.describe('Smoke Tests - Login', () => {

  test(
    'User can login with valid credentials',
    {
      tag: ['@smoke', '@critical', '@login'],
    },
    async ({ userLoginPage, userPage }) => {

      await test.step('Navigate to login page', async () => {
        await userLoginPage.login(VALID_USER.username, VALID_USER.password);
      });

      await test.step('Verify user is redirected to inventory', async () => {
        await expect(userPage).toHaveURL(/.*inventory\.html/);
      });

      await test.step('Verify inventory page loads', async () => {
        await expect(userPage.locator('.inventory_item')).toHaveCount(6);
      });
    }
  );

});
