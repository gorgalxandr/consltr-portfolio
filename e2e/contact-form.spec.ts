import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    await page.getByRole('heading', { name: /start your project/i }).scrollIntoViewIfNeeded();
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check form is visible
    await expect(page.getByRole('heading', { name: /start your project/i })).toBeVisible();
    
    // Check all form fields are present
    await expect(page.getByLabel(/name.*\*/i)).toBeVisible();
    await expect(page.getByLabel(/email.*\*/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/project type/i)).toBeVisible();
    await expect(page.getByLabel(/budget range/i)).toBeVisible();
    await expect(page.getByLabel(/timeline/i)).toBeVisible();
    await expect(page.getByLabel(/message.*\*/i)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Mock the API response
    await page.route('**/api/v1/public/project-inquiry', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Success', id: '123' })
      });
    });

    // Fill out the form
    await page.getByLabel(/name.*\*/i).fill('John Doe');
    await page.getByLabel(/email.*\*/i).fill('john@example.com');
    await page.getByLabel(/company/i).fill('Test Company');
    await page.getByLabel(/project type/i).selectOption('Web Application');
    await page.getByLabel(/budget range/i).selectOption('$10k - $25k');
    await page.getByLabel(/timeline/i).selectOption('2-3 months');
    await page.getByLabel(/message.*\*/i).fill('This is a test project inquiry message.');

    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();

    // Wait for loading state
    await expect(page.getByText(/submitting/i)).toBeVisible();

    // Wait for success message
    await expect(page.getByText(/message sent!/i)).toBeVisible();

    // Check form is cleared
    await expect(page.getByLabel(/name.*\*/i)).toHaveValue('');
    await expect(page.getByLabel(/email.*\*/i)).toHaveValue('');
    await expect(page.getByLabel(/message.*\*/i)).toHaveValue('');
  });

  test('should handle network error gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('**/api/v1/public/project-inquiry', async route => {
      await route.abort('failed');
    });

    // Fill required fields
    await page.getByLabel(/name.*\*/i).fill('John Doe');
    await page.getByLabel(/email.*\*/i).fill('john@example.com');
    await page.getByLabel(/message.*\*/i).fill('Test message');

    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();

    // Check error message appears
    await expect(page.getByText(/network error/i)).toBeVisible();
  });

  test('should display contact information correctly', async ({ page }) => {
    // Check contact info section
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();
    
    // Check contact details
    await expect(page.getByText('hello@consltr.com')).toBeVisible();
    await expect(page.getByText('+1 (555) 123-4567')).toBeVisible();
    await expect(page.getByText('San Francisco, CA')).toBeVisible();
  });
});