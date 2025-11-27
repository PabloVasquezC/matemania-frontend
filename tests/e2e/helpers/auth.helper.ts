import { Page } from '@playwright/test';

/**
 * Test user credentials
 * Note: These should match a test user in your database
 */
export const TEST_USER = {
  username: 'testuser',
  password: 'testpassword123',
  email: 'testuser@example.com'
};

/**
 * Helper function to log in a user
 * @param page - Playwright page object
 * @param username - Username to log in with
 * @param password - Password to log in with
 */
export async function loginAsUser(
  page: Page, 
  username: string = TEST_USER.username, 
  password: string = TEST_USER.password
): Promise<void> {
  // Navigate to login page
  await page.goto('/login');
  
  // Wait for login form to be visible
  await page.waitForSelector('input[name="username"], input[type="text"]', { timeout: 10000 });
  
  // Fill in credentials
  const usernameInput = page.locator('input[name="username"], input[type="text"]').first();
  const passwordInput = page.locator('input[name="password"], input[type="password"]').first();
  
  await usernameInput.fill(username);
  await passwordInput.fill(password);
  
  // Click login button and wait for navigation
  const loginButton = page.locator('button[type="submit"], button:has-text("Iniciar")').first();
  
  // Use Promise.race to handle both successful login and potential errors
  await Promise.race([
    loginButton.click(),
    page.waitForTimeout(500)
  ]);
  
  // Wait for either navigation to home or error message
  try {
    await page.waitForURL('/', { timeout: 15000 });
  } catch (error) {
    // If navigation fails, check if we're still on login page with error
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      throw new Error(`Login failed - still on login page. URL: ${currentUrl}`);
    }
    // Otherwise re-throw the error
    throw error;
  }
}

/**
 * Helper function to clear authentication state
 * @param page - Playwright page object
 */
export async function clearAuthState(page: Page): Promise<void> {
  // Navigate to a page first to avoid WebKit security errors
  // WebKit throws SecurityError when accessing localStorage without a page context
  const currentUrl = page.url();
  if (!currentUrl || currentUrl === 'about:blank') {
    await page.goto('/');
  }
  
  // Clear localStorage tokens
  await page.evaluate(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  });
  
  // Clear cookies
  await page.context().clearCookies();
}

/**
 * Helper function to check if user is authenticated
 * @param page - Playwright page object
 * @returns true if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const hasAccessToken = await page.evaluate(() => {
    return localStorage.getItem('access_token') !== null;
  });
  
  return hasAccessToken;
}
