import { test, expect } from '@playwright/test'

test.describe('Security Tests', () => {
  test('Dashboard should require authentication', async ({ page }) => {
    // Try to access dashboard directly without login
    await page.goto('/dashboard')
    
    // Should redirect to login or show login form
    await page.waitForTimeout(2000) // Wait for any redirects
    
    const currentUrl = page.url()
    await page.title()
    
    // Should either redirect to /login or show login required
    const isProtected = 
      currentUrl.includes('/login') || 
      currentUrl === 'https://consltr.com/' ||
      await page.locator('text=login', { caseInsensitive: true }).isVisible() ||
      await page.locator('text=sign in', { caseInsensitive: true }).isVisible() ||
      await page.locator('text=authentication', { caseInsensitive: true }).isVisible()
    
    expect(isProtected).toBe(true)
  })
  
  test('Protected routes should not show admin content without auth', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForTimeout(2000)
    
    // Should NOT see admin/dashboard content
    const hasAdminContent = await page.locator('text=AI Agents', { caseInsensitive: true }).isVisible().catch(() => false)
    const hasDashboardContent = await page.locator('text=Agent Settings', { caseInsensitive: true }).isVisible().catch(() => false)
    
    expect(hasAdminContent).toBe(false)
    expect(hasDashboardContent).toBe(false)
  })
})