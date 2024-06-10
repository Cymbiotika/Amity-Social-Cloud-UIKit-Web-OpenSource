// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:6006',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 720 },
        baseURL: 'http://localhost:6006/',
      },
    },
    {
      name: 'Tablet Chrome',
      use: { ...devices['Galaxy Tab S4'], baseURL: 'http://localhost:6006/' },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://localhost:6006/' },
    },
    {
      name: 'Tablet Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 760, height: 720 },
        baseURL: 'http://localhost:6006/',
      },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'], baseURL: 'http://localhost:6006/' },
    },
    {
      name: 'Tablet Safari',
      use: { ...devices['iPad Pro 11'], baseURL: 'http://localhost:6006/' },
    },
    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'], baseURL: 'http://localhost:6006/' },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'], baseURL: 'http://localhost:6006/' },
    },
    {
      name: 'Mobile Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 320, height: 720 },
        baseURL: 'http://localhost:6006/',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run storybook:watch',
    url: 'http://localhost:6006/',
    reuseExistingServer: !process.env.CI,
  },
});
