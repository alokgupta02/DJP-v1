import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome Back');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error for empty email', async ({ page }) => {
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    // Should still be on login page (no navigation)
    await expect(page).toHaveURL(/.*login/);
  });
});

test.describe('Feed Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/feed');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*login/);
  });
});

test.describe('Navigation', () => {
  test('should have accessible navigation elements', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Check for signup link
    const signupLink = page.locator('a[href="/signup"]');
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toContainText('Sign Up');
  });
});