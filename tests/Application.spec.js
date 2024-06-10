import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Ui Only - Avatar ⋅ Storybook');
});

test('application mounted', async ({ page }) => {
  await page.goto('/');
  await page.$('#ApplicationContainer');
  await page.$('#main-container');
  await page.$('#create-post-mobile-button');
});

test.only('spawn mobile post overlay', async ({ page }, testInfo) => {
  console.log(testInfo.project.name);
  if (!testInfo.project.name.includes('Mobile')) {
    test.skip();
  } else {
    await page.goto('/');
    await page.click('#create-post-mobile-button');
  }

  // await expect(createPostButton).toBeVisible();
});
