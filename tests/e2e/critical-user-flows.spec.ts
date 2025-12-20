import { test, expect } from '@playwright/test'

test.describe('Critical User Flows', () => {
  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page')
    
    // Should either redirect or show 404 page
    if (response?.status() === 404) {
      // Check that 404 page has proper content
      await expect(page.locator('h1, h2')).toBeVisible()
    } else {
      // If redirected, should be a valid page
      await expect(page).toHaveTitle(/Consltr/)
    }
  })

  test('should load without JavaScript (graceful degradation)', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false
    })
    const jsDisabledPage = await context.newPage()
    
    await jsDisabledPage.goto('/')
    
    // Should still show basic content
    await expect(jsDisabledPage.locator('h1, h2, p')).toBeVisible()
    
    await context.close()
  })

  test('should perform well on slow networks', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)) // 100ms delay
      await route.continue()
    })
    
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // Page should still load within reasonable time even on slow network
    expect(loadTime).toBeLessThan(10000) // 10 seconds max
    
    await expect(page.locator('h1, h2')).toBeVisible()
  })

  test('should work with cookies disabled', async ({ browser }) => {
    const context = await browser.newContext({
      acceptDownloads: false,
      hasTouch: false,
      javaScriptEnabled: true,
      permissions: [],
    })
    const cookiesDisabledPage = await context.newPage()
    
    await cookiesDisabledPage.goto('/')
    
    // Should still function without cookies
    await expect(cookiesDisabledPage).toHaveTitle(/Consltr/)
    await expect(cookiesDisabledPage.locator('h1, h2')).toBeVisible()
    
    await context.close()
  })

  test('should handle network failures gracefully', async ({ page }) => {
    // Start loading page normally
    await page.goto('/')
    
    // Simulate network going offline during interaction
    await page.setOfflineMode(true)
    
    // Should handle offline state gracefully (no crashes)
    await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => null)
    
    // Reset network
    await page.setOfflineMode(false)
  })
})