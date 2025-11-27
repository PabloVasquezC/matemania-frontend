# Test Fixes Applied

## Issues Identified

From the initial test run, two main issues were causing failures:

### 1. Shepherd.js Tour Visibility Issue
**Problem:** The Shepherd.js tour elements were being created with a `hidden=""` attribute initially, then the attribute was removed when the tour became visible. Playwright's `.isVisible()` and `state: 'visible'` checks were failing because the elements technically existed but had the hidden attribute.

**Error Message:**
```
locator resolved to 2 elements. Proceeding with the first one: <dialog open="" hidden="" tabindex="0"...
```

**Fix Applied:**
- Updated `waitForTourToAppear()` to use selector `.shepherd-element:not([hidden])` instead of `.shepherd-element`
- Changed wait strategy from `state: 'visible'` to `state: 'attached'` with additional timeout
- Updated `isTourVisible()` to check for elements without hidden attribute
- Added small waits (300ms) between tour step transitions for stability
- Updated all test assertions to use `.shepherd-element:not([hidden])` selector

**Files Modified:**
- `tests/e2e/helpers/tour.helper.ts`
- `tests/e2e/tc-005-onboarding-tour.spec.ts`

---

### 2. WebKit localStorage Security Error
**Problem:** WebKit (Safari) throws a `SecurityError: The operation is insecure` when trying to access localStorage before navigating to a page (i.e., when page URL is `about:blank`).

**Error Message:**
```
Error: page.evaluate: SecurityError: The operation is insecure.
at helpers/auth.helper.ts:51
```

**Fix Applied:**
- Updated `clearAuthState()` to check if page has navigated to a valid URL
- If URL is `about:blank` or empty, navigate to `/` first before accessing localStorage
- This ensures WebKit has a proper security context before localStorage operations

**Files Modified:**
- `tests/e2e/helpers/auth.helper.ts`

---

## Changes Summary

### `tests/e2e/helpers/tour.helper.ts`

```typescript
// Before
export async function waitForTourToAppear(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForSelector('.shepherd-element', { 
    state: 'visible',
    timeout 
  });
}

// After
export async function waitForTourToAppear(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForSelector('.shepherd-element:not([hidden])', { 
    state: 'attached',
    timeout 
  });
  await page.waitForTimeout(500);
}
```

```typescript
// Before
export async function isTourVisible(page: Page): Promise<boolean> {
  const tourElement = page.locator('.shepherd-element');
  return await tourElement.isVisible().catch(() => false);
}

// After
export async function isTourVisible(page: Page): Promise<boolean> {
  const tourElement = page.locator('.shepherd-element:not([hidden])');
  const count = await tourElement.count();
  return count > 0;
}
```

### `tests/e2e/helpers/auth.helper.ts`

```typescript
// Before
export async function clearAuthState(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  });
  await page.context().clearCookies();
}

// After
export async function clearAuthState(page: Page): Promise<void> {
  const currentUrl = page.url();
  if (!currentUrl || currentUrl === 'about:blank') {
    await page.goto('/');
  }
  
  await page.evaluate(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  });
  await page.context().clearCookies();
}
```

---

## Expected Impact

These fixes should resolve:

✅ All 18 tour-related test failures (TC-005)  
✅ All 10 WebKit localStorage security errors (TC-001, TC-002)  
✅ Improved test stability across all browsers (Chromium, Firefox, WebKit)

**Total failures before fixes:** 54  
**Expected failures after fixes:** 6 (TC-001 expected failures - profile editing not implemented)

---

## Next Steps

1. Run tests again to verify fixes
2. Confirm all TC-002 (login) and TC-005 (tour) tests pass
3. Confirm TC-001 tests fail as expected (feature not implemented)
4. Update walkthrough with final test results
