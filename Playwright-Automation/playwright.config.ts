import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],  
    ['html', { open: 'never' }],
    ['allure-playwright']     // ⭐ OFFICIAL ALLURE REPORTER
  ],

  globalSetup: './utilities/globalUtilities/global-setup.ts',

  use: {
    // Run headless in CI, interactive locally
    headless: !!process.env.CI,

    // Artifacts: keep helpful data in CI, keep developer-friendly defaults locally
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
    video: process.env.CI ? 'retain-on-failure' : 'on',

    baseURL: env.baseUrl,
  },

  projects: [
    // ========== CHROMIUM ==========
    {
      name: 'chromium-user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/user.json',
      },
    },
    // {
    //   name: 'chromium-admin',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: 'storage/admin.json',
    //   },
    // },

    // ========== FIREFOX ==========
    // {
    //   name: 'firefox-user',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'storage/user.json',
    //   },
    // },
    // {
    //   name: 'firefox-admin',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'storage/admin.json',
    //   },
    // },

    // ========== WEBKIT ==========
    // {
    //   name: 'webkit-user',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'storage/user.json',
    //   },
    // },
    // {
    //   name: 'webkit-admin',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'storage/admin.json',
    //   },
    // },
  ],
});
