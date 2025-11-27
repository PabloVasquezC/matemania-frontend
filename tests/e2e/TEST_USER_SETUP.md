# Test User Setup Instructions

## Critical Requirement

**The E2E tests require a test user to exist in the database before running.**

Without this user, all login-related tests (TC-001, TC-002) will fail.

## Creating the Test User

### Method 1: Django Shell (Recommended)

```bash
# Navigate to your backend directory
cd /path/to/backend

# Open Django shell
python manage.py shell

# Create the test user
>>> from django.contrib.auth.models import User
>>> User.objects.create_user(
...     username='testuser',
...     email='testuser@example.com',
...     password='testpassword123'
... )
>>> exit()
```

### Method 2: Django Admin

1. Start your Django server
2. Navigate to `/admin`
3. Log in with superuser credentials
4. Go to "Users" → "Add User"
5. Create user with:
   - Username: `testuser`
   - Password: `testpassword123`
   - Email: `testuser@example.com`

### Method 3: Registration API (if available)

```bash
curl -X POST http://localhost:8000/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password1": "testpassword123",
    "password2": "testpassword123"
  }'
```

## Verifying Test User Exists

```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.filter(username='testuser').exists()
True  # Should return True
>>> user = User.objects.get(username='testuser')
>>> user.check_password('testpassword123')
True  # Should return True
```

## Test User Credentials

The tests use these credentials (defined in `helpers/auth.helper.ts`):

```typescript
export const TEST_USER = {
  username: 'testuser',
  password: 'testpassword123',
  email: 'testuser@example.com'
};
```

## Troubleshooting

### Tests Still Failing After Creating User?

1. **Check backend is running:**
   ```bash
   # Backend should be running on the expected port
   curl http://localhost:8000/
   ```

2. **Verify login endpoint works:**
   ```bash
   curl -X POST http://localhost:8000/token/ \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "testpassword123"}'
   ```
   Should return access and refresh tokens.

3. **Check CORS settings:**
   Ensure your Django backend allows requests from `http://localhost:5173`

4. **Verify user exists:**
   ```bash
   python manage.py shell
   >>> from django.contrib.auth.models import User
   >>> User.objects.get(username='testuser')
   ```

### Login Timeout Errors

If you see `TimeoutError: page.waitForURL: Timeout 15000ms exceeded`:

1. Check that backend API is responding
2. Verify frontend dev server is running (`pnpm run dev`)
3. Check browser console for errors (run tests with `--headed`)
4. Verify authentication flow works manually

## Running Tests After Setup

Once the test user is created:

```bash
# Run all tests
pnpm run test:e2e

# Run only login tests to verify
pnpm exec playwright test tests/e2e/tc-002-user-login.spec.ts --project=chromium

# Run with visible browser to debug
pnpm exec playwright test --headed --project=chromium
```

## Expected Results

After creating the test user, you should see:

- ✅ TC-002 (Login): All 4 tests PASS
- ✅ TC-005 (Tour): All 8 tests PASS
- ❌ TC-001 (Profile): 5 tests FAIL (expected - feature not implemented)
- ⊘ TC-003, TC-004: Skipped (backend tests)

**Total: ~66 passing, 6 failing (expected), 6 skipped**
