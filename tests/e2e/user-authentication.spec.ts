import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow user to register', async ({ page }) => {
    // Navigate to registration
    await page.getByRole('link', { name: /sign up/i }).click();
    
    // Fill registration form
    await page.getByLabel(/email/i).fill('newuser@example.com');
    await page.getByLabel(/password/i).first().fill('SecurePass123!');
    await page.getByLabel(/confirm password/i).fill('SecurePass123!');
    await page.getByLabel(/name/i).fill('Test User');
    
    // Accept terms
    const termsCheckbox = page.getByRole('checkbox', { name: /terms/i });
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }
    
    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Verify redirect to dashboard or login
    await expect(page).toHaveURL(/\/(dashboard|login)/);
  });

  test('should allow user to login', async ({ page }) => {
    // Navigate to login
    await page.getByRole('link', { name: /sign in|log in/i }).click();
    
    // Fill login form
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('TestPass123!');
    
    // Submit form
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    
    // Verify successful login
    await expect(page).toHaveURL(/\/(dashboard|home)/);
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    // Navigate to login
    await page.getByRole('link', { name: /sign in|log in/i }).click();
    
    // Submit empty form
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    
    // Check for validation messages
    await expect(page.getByText(/email.*required/i)).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  test('should handle password reset flow', async ({ page }) => {
    // Navigate to login
    await page.getByRole('link', { name: /sign in|log in/i }).click();
    
    // Click forgot password
    await page.getByRole('link', { name: /forgot password/i }).click();
    
    // Enter email
    await page.getByLabel(/email/i).fill('test@example.com');
    
    // Submit
    await page.getByRole('button', { name: /reset password|send/i }).click();
    
    // Verify success message
    await expect(page.getByText(/email sent|check your email/i)).toBeVisible();
  });

  test('should logout successfully', async ({ page, context }) => {
    // Set authentication cookie to simulate logged in state
    await context.addCookies([{
      name: 'session',
      value: 'test-session-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Go to dashboard
    await page.goto('/dashboard');
    
    // Click logout
    const logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Verify redirect to home or login
      await expect(page).toHaveURL(/\/(login|$)/);
    }
  });

  test('should protect authenticated routes', async ({ page }) => {
    // Try to access protected route without auth
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('should persist session across page refreshes', async ({ page, context }) => {
    // Set authentication cookie
    await context.addCookies([{
      name: 'session',
      value: 'test-session-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Navigate to dashboard
    await page.goto('/dashboard');
    
    // Refresh page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should handle session expiry gracefully', async ({ page, context }) => {
    // Set expired session cookie
    await context.addCookies([{
      name: 'session',
      value: 'expired-token',
      domain: 'localhost',
      path: '/',
      expires: Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
    }]);
    
    // Try to access protected route
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });
});