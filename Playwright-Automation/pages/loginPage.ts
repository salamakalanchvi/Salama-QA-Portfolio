import { Page } from '@playwright/test';
import { LocatorDetails } from '../utilities/common/locatorDetails';

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
    };
  }

  async login(username: string, password: string) {
    await this.page.goto('https://www.saucedemo.com/');
    await this.locators.usernameInput.locator.fill(username);
    await this.locators.passwordInput.locator.fill(password);
    await this.locators.loginButton.locator.click();
  }
}