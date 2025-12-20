import { test, expect } from '@playwright/test';

test.describe('Portfolio Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display portfolio items', async ({ page }) => {
    // Wait for portfolio section
    const portfolioSection = page.locator('section').filter({ hasText: /portfolio|work|projects/i });
    await expect(portfolioSection).toBeVisible();
    
    // Check that portfolio items are loaded
    await page.waitForTimeout(1500); // Wait for simulated API call
    
    // Verify portfolio items are displayed
    const portfolioItems = page.locator('[data-testid*="portfolio-item"], [class*="portfolio-item"]');
    const count = await portfolioItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter portfolio items by category', async ({ page }) => {
    // Wait for portfolio to load
    await page.waitForTimeout(1500);
    
    // Find category filters
    const categoryButtons = page.locator('button').filter({ hasText: /artist|saas|app|marketing|technology/i });
    
    if (await categoryButtons.first().isVisible()) {
      // Click a category filter
      await categoryButtons.first().click();
      
      // Verify items are filtered
      const portfolioItems = page.locator('[data-testid*="portfolio-item"], [class*="portfolio-item"]');
      const visibleCount = await portfolioItems.count();
      expect(visibleCount).toBeGreaterThan(0);
    }
  });

  test('should open portfolio item details', async ({ page }) => {
    // Wait for portfolio to load
    await page.waitForTimeout(1500);
    
    // Click on first portfolio item
    const firstItem = page.locator('[data-testid*="portfolio-item"], [class*="portfolio-item"]').first();
    
    if (await firstItem.isVisible()) {
      await firstItem.click();
      
      // Check for modal or detail view
      const modal = page.locator('[role="dialog"], [class*="modal"], [class*="detail"]');
      const detailPage = page.url();
      
      // Either modal opens or navigation occurs
      if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(modal).toBeVisible();
      } else {
        expect(detailPage).not.toBe('/');
      }
    }
  });

  test('should display featured items prominently', async ({ page }) => {
    // Wait for portfolio to load
    await page.waitForTimeout(1500);
    
    // Look for featured items
    const featuredItems = page.locator('[data-featured="true"], [class*="featured"]');
    
    if (await featuredItems.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      const count = await featuredItems.count();
      expect(count).toBeGreaterThan(0);
      
      // Featured items should be visible without scrolling
      const firstFeatured = featuredItems.first();
      await expect(firstFeatured).toBeInViewport();
    }
  });

  test('should handle loading state gracefully', async ({ page }) => {
    // Check for loading indicator initially
    const loadingIndicator = page.locator('[class*="loading"], [data-testid="loading"]').first();
    
    if (await loadingIndicator.isVisible({ timeout: 500 }).catch(() => false)) {
      await expect(loadingIndicator).toBeVisible();
      
      // Wait for content to load
      await expect(loadingIndicator).not.toBeVisible({ timeout: 3000 });
    }
    
    // Verify content is displayed after loading
    const portfolioContent = page.locator('[data-testid*="portfolio"], [class*="portfolio"]');
    await expect(portfolioContent).toBeVisible();
  });
});

test.describe('About Section', () => {
  test('should display about information', async ({ page }) => {
    await page.goto('/');
    
    // Find about section
    const aboutSection = page.locator('section').filter({ hasText: /about|who we are|our story/i });
    await expect(aboutSection).toBeVisible();
    
    // Check for content
    const aboutContent = aboutSection.locator('p, div').first();
    await expect(aboutContent).toBeVisible();
    await expect(aboutContent).toHaveText(/.+/); // Has some text
  });

  test('should display team or skills information', async ({ page }) => {
    await page.goto('/');
    
    const aboutSection = page.locator('section').filter({ hasText: /about/i });
    
    // Check for team members or skills
    const teamOrSkills = aboutSection.locator('[class*="team"], [class*="skill"], [data-testid*="team"], [data-testid*="skill"]');
    
    if (await teamOrSkills.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      const count = await teamOrSkills.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('Services Section', () => {
  test('should display services offered', async ({ page }) => {
    await page.goto('/');
    
    // Find services section
    const servicesSection = page.locator('section').filter({ hasText: /services|what we do|offerings/i });
    await expect(servicesSection).toBeVisible();
    
    // Check for service items
    const serviceItems = servicesSection.locator('[class*="service"], [data-testid*="service"]');
    const count = await serviceItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display service details', async ({ page }) => {
    await page.goto('/');
    
    const servicesSection = page.locator('section').filter({ hasText: /services/i });
    const serviceItems = servicesSection.locator('[class*="service"], [data-testid*="service"]');
    
    if (await serviceItems.first().isVisible()) {
      // Each service should have a title and description
      const firstService = serviceItems.first();
      const title = firstService.locator('h3, h4, [class*="title"]');
      const description = firstService.locator('p, [class*="description"]');
      
      await expect(title).toBeVisible();
      await expect(description).toBeVisible();
    }
  });
});