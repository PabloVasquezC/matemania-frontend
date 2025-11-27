import { Page, expect } from '@playwright/test';

/**
 * LocalStorage key used by the application to track if user has seen the tour
 */
export const TOUR_SEEN_KEY = 'matemania_tour_seen';

/**
 * Helper function to clear tour state from localStorage
 * This simulates a first-time user visit
 * @param page - Playwright page object
 */
export async function clearTourState(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, TOUR_SEEN_KEY);
}

/**
 * Helper function to mark tour as seen in localStorage
 * @param page - Playwright page object
 */
export async function markTourAsSeen(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'true');
  }, TOUR_SEEN_KEY);
}

/**
 * Helper function to check if tour has been marked as seen
 * @param page - Playwright page object
 * @returns true if tour has been seen
 */
export async function hasTourBeenSeen(page: Page): Promise<boolean> {
  const value = await page.evaluate((key) => {
    return localStorage.getItem(key);
  }, TOUR_SEEN_KEY);
  
  return value === 'true';
}

/**
 * Helper function to wait for Shepherd tour to appear
 * @param page - Playwright page object
 * @param timeout - Maximum time to wait in milliseconds
 */
export async function waitForTourToAppear(page: Page, timeout: number = 10000): Promise<void> {
  // Wait for Shepherd tour element to appear and not be hidden
  // Shepherd.js initially creates elements with hidden attribute, then removes it
  await page.waitForSelector('.shepherd-element:not([hidden])', { 
    state: 'attached',
    timeout 
  });
  
  // Additional wait for the element to be fully visible
  await page.waitForTimeout(500);
}

/**
 * Helper function to check if tour is currently visible
 * @param page - Playwright page object
 * @returns true if tour is visible
 */
export async function isTourVisible(page: Page): Promise<boolean> {
  // Check if tour element exists and doesn't have hidden attribute
  const tourElement = page.locator('.shepherd-element:not([hidden])');
  const count = await tourElement.count();
  return count > 0;
}

/**
 * Helper function to click the "Siguiente" (Next) button in the tour
 * @param page - Playwright page object
 */
export async function clickNextButton(page: Page): Promise<void> {
  const nextButton = page.locator('.shepherd-button:has-text("Siguiente")').first();
  await nextButton.click();
}

/**
 * Helper function to click the "Anterior" (Previous) button in the tour
 * @param page - Playwright page object
 */
export async function clickPreviousButton(page: Page): Promise<void> {
  const prevButton = page.locator('.shepherd-button:has-text("Anterior")').first();
  await prevButton.click();
}

/**
 * Helper function to click the "Omitir" (Skip) button in the tour
 * @param page - Playwright page object
 */
export async function clickSkipButton(page: Page): Promise<void> {
  const skipButton = page.locator('.shepherd-button:has-text("Omitir")').first();
  await skipButton.click();
}

/**
 * Helper function to click the "Finalizar" (Finish) button in the tour
 * @param page - Playwright page object
 */
export async function clickFinishButton(page: Page): Promise<void> {
  const finishButton = page.locator('.shepherd-button:has-text("Finalizar")').first();
  await finishButton.click();
}

/**
 * Helper function to complete the entire tour step by step
 * @param page - Playwright page object
 */
export async function completeTourStepByStep(page: Page): Promise<void> {
  // Wait for tour to appear
  await waitForTourToAppear(page);
  
  // Step 1: Welcome step - click "Siguiente"
  await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('Bienvenido a Matemanía');
  await clickNextButton(page);
  await page.waitForTimeout(300);
  
  // Step 2: Game explanation - click "Siguiente"
  await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('mecánica única del juego');
  await clickNextButton(page);
  await page.waitForTimeout(300);
  
  // Step 3: Start button - click "Finalizar"
  await expect(page.locator('.shepherd-element:not([hidden])')).toContainText('elegir el modo de juego');
  await clickFinishButton(page);
  
  // Wait for tour to disappear
  await page.waitForTimeout(1000);
}
