import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Matemanía|Matemania|Scrabblearn/i);
});

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  
  // Check for main element or a specific heading
  await expect(page.locator('#root')).toBeVisible();
});
