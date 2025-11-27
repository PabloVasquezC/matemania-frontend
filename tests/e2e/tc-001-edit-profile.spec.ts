import { test, expect } from '@playwright/test';
import { loginAsUser, clearAuthState, TEST_USER } from './helpers/auth.helper';

/**
 * TC-001: Edit User Profile
 * HU-015: Como usuario, quiero tener la facultad de editar mi perfil
 * 
 * Severity: Media
 * Expected Result: FAIL ❌
 * 
 * Preconditions: User session must be active
 * 
 * Test Steps:
 * 1. Login as test user
 * 2. Navigate to profile module
 * 3. Look for "Edit Profile" button/option
 * 4. Attempt to modify profile values
 * 5. Attempt to confirm changes
 * 
 * Expected Behavior (when implemented):
 * - User should be able to edit their profile
 * - Changes should be saved and persisted
 * 
 * Current Status:
 * - Profile module exists but does NOT handle editing
 * - Test is EXPECTED TO FAIL until feature is implemented
 */

test.describe('TC-001: Edit User Profile', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear authentication state
    await clearAuthState(page);
    
    // Login as test user (precondition)
    await loginAsUser(page, TEST_USER.username, TEST_USER.password);
    
    // Verify login was successful
    await expect(page).toHaveURL('/');
  });

  test('should allow user to navigate to profile page', async ({ page }) => {
    // Step 1: Navigate to profile module
    // Try clicking on profile link in navbar or navigate directly
    await page.goto('/profile');
    
    // Verify we're on the profile page
    await expect(page).toHaveURL('/profile');
    
    // Verify profile content is displayed
    await expect(page.locator('text=/perfil|profile/i')).toBeVisible({ timeout: 5000 });
  });

  test('should display user information on profile page', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Verify user information is displayed
    // Based on profilepage.tsx, it should show username and avatar
    await expect(page.locator(`text=${TEST_USER.username}`)).toBeVisible();
    
    // Verify avatar is displayed
    const avatar = page.locator('img[alt*="Avatar"]');
    await expect(avatar).toBeVisible();
  });

  test('should NOT have edit profile functionality (EXPECTED TO FAIL)', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Step 2: Look for "Edit Profile" button/option
    // This should NOT exist yet, so we expect this test to fail
    const editButton = page.locator('button:has-text("Editar"), button:has-text("Edit")');
    
    // Wait a bit to ensure page is fully loaded
    await page.waitForTimeout(2000);
    
    // Check if edit button exists
    const editButtonExists = await editButton.count() > 0;
    
    // This assertion SHOULD FAIL because edit functionality is not implemented
    expect(editButtonExists).toBe(true); // ❌ Expected to fail
  });

  test('should NOT allow editing username (EXPECTED TO FAIL)', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Try to find an input field for username editing
    const usernameInput = page.locator('input[name="username"], input[placeholder*="nombre"]');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Check if editable username field exists
    const inputExists = await usernameInput.count() > 0;
    
    // This assertion SHOULD FAIL because editing is not implemented
    expect(inputExists).toBe(true); // ❌ Expected to fail
  });

  test('should NOT allow changing avatar (EXPECTED TO FAIL)', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Try to find avatar upload/change button
    const avatarChangeButton = page.locator('button:has-text("Cambiar avatar"), input[type="file"]');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Check if avatar change functionality exists
    const changeButtonExists = await avatarChangeButton.count() > 0;
    
    // This assertion SHOULD FAIL because editing is not implemented
    expect(changeButtonExists).toBe(true); // ❌ Expected to fail
  });

  test('should NOT have save changes button (EXPECTED TO FAIL)', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Try to find save/confirm changes button
    const saveButton = page.locator('button:has-text("Guardar"), button:has-text("Confirmar")');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Check if save button exists
    const saveButtonExists = await saveButton.count() > 0;
    
    // This assertion SHOULD FAIL because editing is not implemented
    expect(saveButtonExists).toBe(true); // ❌ Expected to fail
  });

  test.skip('PLACEHOLDER: Full edit profile flow (to be implemented)', async ({ page }) => {
    /**
     * This test is skipped because the feature is not yet implemented.
     * 
     * When profile editing is implemented, this test should:
     * 1. Navigate to profile page
     * 2. Click "Edit Profile" button
     * 3. Modify username or other profile fields
     * 4. Upload new avatar (optional)
     * 5. Click "Save Changes" button
     * 6. Verify changes are persisted
     * 7. Verify success message is shown
     * 8. Verify updated information is displayed
     */
    
    // This test will be implemented once the feature exists
  });
});

/**
 * SUMMARY OF TC-001 TEST RESULTS
 * 
 * Expected Results:
 * ✅ User can navigate to profile page
 * ✅ User information is displayed on profile page
 * ❌ Edit Profile button does NOT exist (test fails as expected)
 * ❌ Username editing is NOT available (test fails as expected)
 * ❌ Avatar changing is NOT available (test fails as expected)
 * ❌ Save changes button does NOT exist (test fails as expected)
 * 
 * Conclusion:
 * The profile module is built but does NOT handle editing functionality.
 * This matches the expected result from the test case document.
 * 
 * Severity: Media
 * Action Required: Implement profile editing functionality in next sprint
 */
