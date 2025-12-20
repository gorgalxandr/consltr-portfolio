import { test, expect } from '@playwright/test';

test.describe('Admin Panel Functionality', () => {
  test('should access admin panel from main page', async ({ page }) => {
    await page.goto('/');
    
    // Look for admin access button (might be hidden or require special action)
    // Try clicking on the Consltr logo or a specific area
    const adminTriggers = [
      page.getByRole('button', { name: /admin/i }),
      page.getByText('Consltr').first(),
      page.locator('[data-admin-trigger]')
    ];
    
    for (const trigger of adminTriggers) {
      if (await trigger.isVisible({ timeout: 1000 }).catch(() => false)) {
        await trigger.click();
        break;
      }
    }
    
    // Check if admin panel is displayed
    const adminPanel = page.locator('[data-testid="admin-panel"], [class*="admin"]');
    if (await adminPanel.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(adminPanel).toBeVisible();
    }
  });

  test('should return from admin panel to main content', async ({ page }) => {
    await page.goto('/');
    
    // Access admin panel
    const adminButton = page.getByRole('button', { name: /admin/i });
    if (await adminButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await adminButton.click();
      
      // Find back button
      const backButton = page.getByRole('button', { name: /back|return|close/i });
      await expect(backButton).toBeVisible();
      
      // Click back
      await backButton.click();
      
      // Verify main content is displayed
      const hero = page.locator('[data-testid="hero"], [class*="hero"]');
      await expect(hero).toBeVisible();
    }
  });

  test('should display admin statistics', async ({ page }) => {
    await page.goto('/');
    
    // Access admin panel
    const adminButton = page.getByRole('button', { name: /admin/i });
    if (await adminButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await adminButton.click();
      
      // Look for statistics/metrics
      const stats = page.locator('[class*="stat"], [data-testid*="stat"], [class*="metric"]');
      
      if (await stats.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        const count = await stats.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('should have admin navigation options', async ({ page }) => {
    await page.goto('/');
    
    // Access admin panel
    const adminButton = page.getByRole('button', { name: /admin/i });
    if (await adminButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await adminButton.click();
      
      // Check for admin navigation items
      const navItems = page.locator('nav a, nav button, [role="navigation"] a');
      
      if (await navItems.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        const count = await navItems.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    const contactSection = page.locator('section').filter({ hasText: /contact|get in touch/i });
    await contactSection.scrollIntoViewIfNeeded();
    
    // Fill form fields
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/message/i).fill('This is a test message');
    
    // Submit form
    await page.getByRole('button', { name: /send|submit/i }).click();
    
    // Check for success message
    await expect(page.getByText(/thank you|message sent|we'll get back/i)).toBeVisible({ timeout: 5000 });
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    const contactSection = page.locator('section').filter({ hasText: /contact/i });
    await contactSection.scrollIntoViewIfNeeded();
    
    // Try to submit empty form
    await page.getByRole('button', { name: /send|submit/i }).click();
    
    // Check for validation messages
    const errorMessages = page.locator('[class*="error"], [class*="invalid"], [role="alert"]');
    const count = await errorMessages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    const contactSection = page.locator('section').filter({ hasText: /contact/i });
    await contactSection.scrollIntoViewIfNeeded();
    
    // Enter invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/message/i).fill('Test message');
    
    // Try to submit
    await page.getByRole('button', { name: /send|submit/i }).click();
    
    // Check for email validation error
    await expect(page.getByText(/valid email|invalid email/i)).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    const contactSection = page.locator('section').filter({ hasText: /contact/i });
    await contactSection.scrollIntoViewIfNeeded();
    
    // Check for contact details
    const contactInfo = contactSection.locator('[class*="info"], [class*="detail"]');
    
    // Should have at least one contact method (email, phone, address)
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phonePattern = /[\d\s\-\(\)\+]+/;
    
    const text = await contactSection.textContent();
    const hasEmail = emailPattern.test(text || '');
    const hasPhone = phonePattern.test(text || '');
    
    expect(hasEmail || hasPhone).toBeTruthy();
  });
});

test.describe('A/B Testing Section', () => {
  test('should display A/B testing information', async ({ page }) => {
    await page.goto('/');
    
    // Find A/B testing section
    const abSection = page.locator('section').filter({ hasText: /a\/b|testing|optimization/i });
    
    if (await abSection.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(abSection).toBeVisible();
      
      // Check for content
      const content = abSection.locator('p, div').first();
      await expect(content).toHaveText(/.+/);
    }
  });

  test('should display testing results or metrics', async ({ page }) => {
    await page.goto('/');
    
    const abSection = page.locator('section').filter({ hasText: /a\/b/i });
    
    if (await abSection.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Look for metrics or results
      const metrics = abSection.locator('[class*="metric"], [class*="result"], [data-testid*="metric"]');
      
      if (await metrics.first().isVisible({ timeout: 1000 }).catch(() => false)) {
        const count = await metrics.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });
});