import { test, expect } from '@playwright/test';
import { 
  clearTourState, 
  markTourAsSeen,
  hasTourBeenSeen,
  waitForTourToAppear,
  isTourVisible,
  clickNextButton,
  clickSkipButton,
  clickFinishButton,
  completeTourStepByStep
} from './helpers/tour.helper';

/**
 * TC-005: Onboarding Tour
 * HU-015: Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación
 * 
 * Severity: Baja
 * Expected Result: PASS ✅
 * 
 * Preconditions: localStorage must be empty (representing first visit)
 * 
 * Test Steps:
 * 1. Clear localStorage to simulate first visit
 * 2. Navigate to application homepage
 * 3. Verify tour appears automatically
 * 4. Verify user can navigate through tour steps
 * 5. Verify user can skip the tour
 * 6. Verify tour doesn't appear on subsequent visits
 */

test.describe('TC-005: Onboarding Tour', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear tour state before each test to simulate first-time user
    await page.goto('/');
    await clearTourState(page);
  });

  test('should display tour automatically on first visit', async ({ page }) => {
    // Step 1: Navigate to homepage (simulating first visit)
    await page.goto('/');
    
    // Step 2: Wait for tour to appear
    await waitForTourToAppear(page);
    
    // Step 3: Verify tour is visible
    const tourVisible = await isTourVisible(page);
    expect(tourVisible).toBe(true);
    
    // Step 4: Verify welcome message is displayed
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('Bienvenido a Matemanía');
    
    // Step 5: Verify "Siguiente" and "Omitir" buttons are present (use .first() to avoid strict mode)
    await expect(page.locator('.shepherd-button:has-text("Siguiente")').first()).toBeVisible();
    await expect(page.locator('.shepherd-button:has-text("Omitir")').first()).toBeVisible();
  });

  test('should allow user to navigate through tour steps using "Siguiente" button', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await waitForTourToAppear(page);
    
    // Step 1: Verify we're on the first step (welcome)
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('Bienvenido a Matemanía');
    
    // Step 2: Click "Siguiente" to go to second step
    await clickNextButton(page);
    await page.waitForTimeout(300);
    
    // Step 3: Verify we're on the second step (game explanation)
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('mecánica única del juego');
    await expect(page.locator('.shepherd-button:has-text("Anterior")').first()).toBeVisible();
    await expect(page.locator('.shepherd-button:has-text("Siguiente")').first()).toBeVisible();
    
    // Step 4: Click "Siguiente" to go to third step
    await clickNextButton(page);
    await page.waitForTimeout(300);
    
    // Step 5: Verify we're on the third step (start button)
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('elegir el modo de juego');
    await expect(page.locator('.shepherd-button:has-text("Anterior")').first()).toBeVisible();
    await expect(page.locator('.shepherd-button:has-text("Finalizar")').first()).toBeVisible();
  });

  test('should allow user to skip the tour using "Omitir" button', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await waitForTourToAppear(page);
    
    // Verify tour is visible
    expect(await isTourVisible(page)).toBe(true);
    
    // Click "Omitir" button
    await clickSkipButton(page);
    
    // Wait for tour to disappear
    await page.waitForSelector('.shepherd-element', { state: 'hidden', timeout: 2000 });
    
    // Verify tour is no longer visible
    expect(await isTourVisible(page)).toBe(false);
    
    // Verify tour has been marked as seen
    expect(await hasTourBeenSeen(page)).toBe(true);
  });

  test('should complete tour and mark as seen when user clicks "Finalizar"', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await waitForTourToAppear(page);
    
    // Navigate to the last step
    await clickNextButton(page); // Step 2
    await page.waitForTimeout(300);
    await clickNextButton(page); // Step 3
    await page.waitForTimeout(300);
    
    // Verify we're on the last step
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('elegir el modo de juego');
    
    // Click "Finalizar"
    await clickFinishButton(page);
    
    // Wait for tour to disappear
    await page.waitForTimeout(1000);
    
    // Verify tour is no longer visible
    expect(await isTourVisible(page)).toBe(false);
    
    // Verify tour has been marked as seen
    expect(await hasTourBeenSeen(page)).toBe(true);
  });

  test('should NOT display tour on subsequent visits after completion', async ({ page }) => {
    // First visit: Complete the tour
    await page.goto('/');
    await waitForTourToAppear(page);
    await clickSkipButton(page);
    
    // Verify tour was marked as seen
    expect(await hasTourBeenSeen(page)).toBe(true);
    
    // Second visit: Navigate away and come back
    await page.goto('/about');
    await page.goto('/');
    
    // Wait a bit to ensure tour would have appeared if it was going to
    await page.waitForTimeout(2000);
    
    // Verify tour does NOT appear
    expect(await isTourVisible(page)).toBe(false);
  });

  test('should complete entire tour step by step using helper function', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Use helper function to complete tour
    await completeTourStepByStep(page);
    
    // Verify tour is no longer visible
    expect(await isTourVisible(page)).toBe(false);
    
    // Verify tour has been marked as seen
    expect(await hasTourBeenSeen(page)).toBe(true);
  });

  test('should allow user to go back using "Anterior" button', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await waitForTourToAppear(page);
    
    // Go to second step
    await clickNextButton(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('mecánica única del juego');
    
    // Click "Anterior" to go back
    const prevButton = page.locator('.shepherd-button:has-text("Anterior")');
    await prevButton.click();
    await page.waitForTimeout(300);
    
    // Verify we're back on the first step
    await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('Bienvenido a Matemanía');
  });

  test('should display tour only when localStorage is empty', async ({ page }) => {
    // Test 1: With empty localStorage (first visit)
    await page.goto('/');
    await waitForTourToAppear(page);
    expect(await isTourVisible(page)).toBe(true);
    await clickSkipButton(page);
    
    // Test 2: With localStorage flag set (not first visit)
    await markTourAsSeen(page);
    await page.goto('/');
    await page.waitForTimeout(2000);
    expect(await isTourVisible(page)).toBe(false);
  });
});
