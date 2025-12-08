import { expect, Page } from '@playwright/test';
import { LocatorDetails } from '../utilities/common/locatorDetails';
import { logger } from '../utilities/logger';


export class LoginPage {
  private readonly page: Page;

  private readonly locators: { [key: string]: LocatorDetails };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      usernameInput: {
        description: 'Username input field',
        locator: this.page.getByPlaceholder('Username'),
      },
      passwordInput: {
        description: 'Password input field',
        locator: this.page.getByPlaceholder('Password'),
      },
      loginButton: {
        description: 'Login button',
        locator: this.page.getByRole('button', { name: 'Login' }),
      },
      errorMessage: {
        description: 'Login error message',
        locator: this.page.locator('[data-test="error"]'),
      },
    };
  }

  async login(username: string, password: string) {
    logger.info(`Logging in with username: ${username}`);
    await this.page.goto('https://www.saucedemo.com/');
    await this.locators.usernameInput.locator.fill(username);
    await this.locators.passwordInput.locator.fill(password);
    await this.locators.loginButton.locator.click();
  }
  async verifyErrorMessage(expectedMessage: string) {
  logger.info(`Verifying error message: "${expectedMessage}"`);
  await this.locators.errorMessage.locator.waitFor({ state: 'visible' });
  await expect(this.locators.errorMessage.locator).toContainText(expectedMessage);
}
}