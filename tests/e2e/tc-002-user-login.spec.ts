import { test, expect } from '@playwright/test';
import { loginAsUser, clearAuthState, TEST_USER } from './helpers/auth.helper';

/**
 * TC-002: User Login
 * HU-018: Como usuario, quiero ingresar a mi cuenta mediante mi nombre de usuario y contraseña
 * 
 * Severity: Alta
 * Expected Result: PASS ✅
 * 
 * Preconditions: Test user account must exist in the database
 * 
 * Test Steps:
 * 1. Navigate to login section
 * 2. Enter username and password
 * 3. Click login button
 * 4. Verify successful login
 * 5. Verify redirect to HomePage
 */

test.describe('TC-002: User Login', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear any existing authentication state before each test
    await clearAuthState(page);
  });

  test('should allow user to login with valid credentials and redirect to HomePage', async ({ page }) => {
    // Step 1: Navigate to login section
    await page.goto('/login');
    
    // Verify we're on the login page
    await expect(page).toHaveURL(/\/login/);
    
    // Step 2: Wait for login form to be visible
    await page.waitForSelector('input[name="username"], input[type="text"]', { timeout: 10000 });
    
    // Step 3: Enter username
    const usernameInput = page.locator('input[name="username"], input[type="text"]').first();
    await usernameInput.fill(TEST_USER.username);
    await expect(usernameInput).toHaveValue(TEST_USER.username);
    
    // Step 4: Enter password
    const passwordInput = page.locator('input[name="password"], input[type="password"]').first();
    await passwordInput.fill(TEST_USER.password);
    await expect(passwordInput).toHaveValue(TEST_USER.password);
    
    // Step 5: Click login button
    const loginButton = page.locator('button[type="submit"], button:has-text("Iniciar")').first();
    await loginButton.click();
    
    // Step 6: Verify redirect to HomePage
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');
    
    // Step 7: Verify user is logged in by checking for user-specific content
    // The HomePage should display "¡Hola {username}!" when logged in
    await expect(page.locator('text=/¡Hola.*!/i')).toBeVisible({ timeout: 5000 });
    
    // Step 8: Verify access token is stored in localStorage
    const hasAccessToken = await page.evaluate(() => {
      return localStorage.getItem('access_token') !== null;
    });
    expect(hasAccessToken).toBe(true);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Enter invalid credentials
    const usernameInput = page.locator('input[name="username"], input[type="text"]').first();
    const passwordInput = page.locator('input[name="password"], input[type="password"]').first();
    
    await usernameInput.fill('invaliduser');
    await passwordInput.fill('wrongpassword');
    
    // Click login button
    const loginButton = page.locator('button[type="submit"], button:has-text("Iniciar")').first();
    await loginButton.click();
    
    // Verify error message appears (adjust selector based on your error display)
    await expect(page.locator('text=/error|incorrecto|inválido/i')).toBeVisible({ timeout: 5000 });
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should not allow login with empty fields', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Try to submit without filling fields
    const loginButton = page.locator('button[type="submit"], button:has-text("Iniciar")').first();
    
    // Check if button is disabled or if form validation prevents submission
    const isDisabled = await loginButton.isDisabled();
    
    if (!isDisabled) {
      // If button is not disabled, click it and verify we stay on login page
      await loginButton.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/login/);
    } else {
      // Button should be disabled with empty fields
      expect(isDisabled).toBe(true);
    }
  });

  test('should successfully login using helper function', async ({ page }) => {
    // Test the helper function
    await loginAsUser(page, TEST_USER.username, TEST_USER.password);
    
    // Verify we're on the homepage
    await expect(page).toHaveURL('/');
    
    // Verify user is authenticated
    const hasAccessToken = await page.evaluate(() => {
      return localStorage.getItem('access_token') !== null;
    });
    expect(hasAccessToken).toBe(true);
  });
});
