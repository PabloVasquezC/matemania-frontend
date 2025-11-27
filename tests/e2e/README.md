## Test Cases

### ✅ TC-002: User Login (PASS - High Severity)
**File:** `tc-002-user-login.spec.ts`

Tests user authentication flow with username and password.

**Test Scenarios:**
- Valid login with correct credentials
- Invalid login with wrong credentials
- Empty field validation
- Redirect to HomePage after successful login

**Expected Result:** ✅ PASS

---

### ❌ TC-001: Edit User Profile (FAIL - Medium Severity)
**File:** `tc-001-edit-profile.spec.ts`

Tests profile editing functionality (not yet implemented).

**Test Scenarios:**
- Navigate to profile page
- Display user information
- Look for edit profile button (expected to fail)
- Look for editable fields (expected to fail)
- Look for save button (expected to fail)

**Expected Result:** ❌ FAIL (Feature not implemented)

---

### ✅ TC-005: Onboarding Tour (PASS - Low Severity)
**File:** `tc-005-onboarding-tour.spec.ts`

Tests the Shepherd.js onboarding tour for first-time users.

**Test Scenarios:**
- Tour appears on first visit
- Navigate through tour steps
- Skip tour functionality
- Complete tour functionality
- Tour doesn't appear on subsequent visits
- Navigate backwards in tour

**Expected Result:** ✅ PASS

---

### ⊘ TC-003: Welcome Email (Backend Test - Low Severity)
**File:** `tc-003-welcome-email.spec.ts`

Documentation test for welcome email functionality.

**Note:** This is a backend test that cannot be validated via frontend E2E testing. The test file contains documentation and guidance for backend testing.

**Expected Result:** ⊘ SKIP (Backend test)

---

### ⊘ TC-004: Password Encryption (Backend Test - High Severity)
**File:** `tc-004-password-encryption.spec.ts`

Documentation test for password encryption/hashing.

**Note:** This is a backend/database security test that cannot be validated via frontend E2E testing. The test file contains comprehensive documentation on security requirements and verification methods.

**Expected Result:** ⊘ SKIP (Backend test)

---

## Helper Utilities

### `helpers/auth.helper.ts`
Authentication utilities for tests:
- `loginAsUser()` - Log in a user
- `clearAuthState()` - Clear authentication state
- `isAuthenticated()` - Check if user is authenticated
- `TEST_USER` - Test user credentials

### `helpers/tour.helper.ts`
Tour testing utilities:
- `clearTourState()` - Clear tour localStorage
- `waitForTourToAppear()` - Wait for tour to appear
- `clickNextButton()` - Navigate to next tour step
- `clickSkipButton()` - Skip the tour
- `completeTourStepByStep()` - Complete entire tour

---

## Running Tests

### Prerequisites

1. **Test User Account**: TC-002 requires a test user account in your database:
   - Username: `testuser`
   - Password: `testpassword123`
   - Email: `testuser@example.com`

   Create the test user via Django admin or shell:
   ```bash
   python manage.py shell
   >>> from django.contrib.auth.models import User
   >>> User.objects.create_user('testuser', 'testuser@example.com', 'testpassword123')
   ```

2. **Development Server**: Ensure the dev server is running:
   ```bash
   pnpm run dev
   ```

### Run All Tests

```bash
# Run all E2E tests
pnpm run test:e2e

# Run all tests in headed mode (see browser)
pnpm exec playwright test --headed

# Run tests in UI mode (interactive debugging)
pnpm exec playwright test --ui
```

### Run Specific Test Files

```bash
# Run only login tests
pnpm exec playwright test tests/e2e/tc-002-user-login.spec.ts

# Run only tour tests
pnpm exec playwright test tests/e2e/tc-005-onboarding-tour.spec.ts

# Run only profile tests (expected to fail)
pnpm exec playwright test tests/e2e/tc-001-edit-profile.spec.ts
```

### Run Specific Test Cases

```bash
# Run a specific test by name
pnpm exec playwright test -g "should allow user to login"

# Run tests matching a pattern
pnpm exec playwright test -g "tour"
```

### Debug Tests

```bash
# Run with debug mode
pnpm exec playwright test --debug

# Run specific test in debug mode
pnpm exec playwright test tests/e2e/tc-002-user-login.spec.ts --debug

# Generate trace for debugging
pnpm exec playwright test --trace on
```

### View Test Report

```bash
# Generate and open HTML report
pnpm exec playwright show-report
```

---

## Expected Test Results

Based on the test case template document:

| Test Case | File | Expected Result | Severity |
|-----------|------|-----------------|----------|
| TC-001 | `tc-001-edit-profile.spec.ts` | ❌ FAIL | Media |
| TC-002 | `tc-002-user-login.spec.ts` | ✅ PASS | Alta |
| TC-003 | `tc-003-welcome-email.spec.ts` | ⊘ SKIP | Baja |
| TC-004 | `tc-004-password-encryption.spec.ts` | ⊘ SKIP | Alta |
| TC-005 | `tc-005-onboarding-tour.spec.ts` | ✅ PASS | Baja |

### Test Summary

- **Passing Tests (2):** TC-002, TC-005
- **Failing Tests (1):** TC-001 (expected - feature not implemented)
- **Skipped Tests (2):** TC-003, TC-004 (backend tests)

---

## Troubleshooting

### Test User Not Found

If TC-002 fails with authentication errors, ensure the test user exists:

```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.filter(username='testuser').exists()
True  # Should return True
```

### Tour Not Appearing

If TC-005 fails because tour doesn't appear:

1. Clear browser localStorage manually
2. Check that Shepherd.js is properly loaded
3. Verify tour initialization in `HomePage.tsx`

### Timeout Errors

If tests timeout:

1. Increase timeout in `playwright.config.ts`
2. Ensure dev server is running on `http://localhost:5173`
3. Check network connectivity

### Browser Not Installed

If Playwright browsers are not installed:

```bash
pnpm exec playwright install
```

---

## CI/CD Integration

Tests can be run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Install Playwright Browsers
  run: pnpm exec playwright install --with-deps

- name: Run E2E Tests
  run: pnpm run test:e2e

- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

---

## Notes

- **TC-001** is expected to fail until profile editing is implemented
- **TC-003** and **TC-004** are backend tests and should be tested at the backend level
- All tests use the Playwright test framework
- Tests are configured to run on Chromium, Firefox, and WebKit browsers
- Test timeout is set to 120 seconds (configurable in `playwright.config.ts`)
