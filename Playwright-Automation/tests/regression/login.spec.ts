import { test } from '../../fixtures/user.fixtures';

/**
 * 📌 Purpose:
 * This spec covers negative, validation, and edge-case scenarios
 * for the Sauce Demo login flow.
 *
 * ✅ Happy path scenarios are intentionally excluded
 * and are covered in a separate positive login spec.
 */

/* ----------------------------- Test Data ----------------------------- */

const USERS = {
  valid: 'standard_user',
  invalid: 'invalid_user',
  locked: 'locked_out_user',
};

const PASSWORDS = {
  valid: 'secret_sauce',
  invalid: 'wrongpassword',
};

/* -------------------------- Expected Messages -------------------------- */
/**
 * These messages are product-defined and verified against the UI.
 * Assertions use text containment to avoid brittleness from minor copy changes.
 */

const ERRORS = {
  invalidCredentials: 'Username and password do not match',
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
  lockedUser: 'Sorry, this user has been locked out.',
};

/* --------------------------- Test Scenarios ---------------------------- */

test.describe('Sauce Demo | Login | Negative & Edge Cases', () => {

  test('Rejects invalid username', {
    tag: ['@regression', '@login', '@negative'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login using an invalid username', async () => {
      await userLoginPage.login(USERS.invalid, PASSWORDS.valid);
    });

    await test.step('Displays invalid credentials error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.invalidCredentials);
    });
  });

  test('Rejects invalid password', {
    tag: ['@regression', '@login', '@negative'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login using an invalid password', async () => {
      await userLoginPage.login(USERS.valid, PASSWORDS.invalid);
    });

    await test.step('Displays invalid credentials error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.invalidCredentials);
    });
  });

  test('Validates empty username field', {
    tag: ['@regression', '@login', '@validation'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login with empty username', async () => {
      await userLoginPage.login('', PASSWORDS.valid);
    });

    await test.step('Displays username required error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.usernameRequired);
    });
  });

  test('Validates empty password field', {
    tag: ['@regression', '@login', '@validation'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login with empty password', async () => {
      await userLoginPage.login(USERS.valid, '');
    });

    await test.step('Displays password required error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.passwordRequired);
    });
  });

  test('Validates both fields empty (username has priority)', {
    tag: ['@regression', '@login', '@validation', '@edge'],
  }, async ({ userLoginPage }) => {

    /**
     * Product behavior:
     * When both inputs are empty, the application validates
     * the username field before the password field.
     */

    await test.step('Attempt login with both username and password empty', async () => {
      await userLoginPage.login('', '');
    });

    await test.step('Displays username required error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.usernameRequired);
    });
  });

  test('Blocks locked user accounts', {
    tag: ['@regression', '@login', '@security'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login using a locked account', async () => {
      await userLoginPage.login(USERS.locked, PASSWORDS.valid);
    });

    await test.step('Displays locked user error message', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.lockedUser);
    });
  });

  test('Does not trim whitespace from username', {
    tag: ['@regression', '@login', '@edge'],
  }, async ({ userLoginPage }) => {

    /**
     * Behavior under test:
     * Leading/trailing whitespace is treated as part of the input
     * and is not automatically trimmed by the application.
     */

    await test.step('Attempt login with whitespace around username', async () => {
      await userLoginPage.login('  standard_user  ', PASSWORDS.valid);
    });

    await test.step('Displays invalid credentials error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.invalidCredentials);
    });
  });

  test('Enforces username case sensitivity', {
    tag: ['@regression', '@login', '@edge'],
  }, async ({ userLoginPage }) => {

    await test.step('Attempt login with uppercase username', async () => {
      await userLoginPage.login('STANDARD_USER', PASSWORDS.valid);
    });

    await test.step('Displays invalid credentials error', async () => {
      await userLoginPage.verifyErrorMessage(ERRORS.invalidCredentials);
    });
  });

});
