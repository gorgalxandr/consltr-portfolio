import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Consltr/)
    
    // Check for critical elements
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Consltr/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check for navigation elements
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
    
    // Check for links
    const links = page.locator('a[href]')
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)
  })

  test('should pass accessibility checks', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential accessibility attributes
    await expect(page.locator('html')).toHaveAttribute('lang')
    
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt')
    }
  })
})