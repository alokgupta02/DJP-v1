import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5174';

test.describe('Profile Completion Banner & Modal', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and login using the dev-login flow
    await page.goto(`${BASE_URL}/login`);
    
    // Assuming the login page has a dev-login button or we can directly invoke the API and set local storage
    // But since this is an E2E test, let's just use the UI if available, or set localStorage directly
    await page.evaluate(() => {
      localStorage.setItem("djp_token", "fake-jwt-token");
      localStorage.setItem("djp_user", JSON.stringify({
        id: "00000000-0000-0000-0000-000000000001",
        email: "citizen@djp.org",
        fullName: "Prototype Citizen",
        location: "Mumbai, Maharashtra",
        bio: null, // intentionally missing to trigger banner
        occupation: null,
        topics: null
      }));
    });
    
    await page.goto(`${BASE_URL}/feed`);
  });

  test('banner appears when profile is incomplete and can be dismissed', async ({ page }) => {
    // Wait for the banner to be visible
    const banner = page.locator('text=Complete your Civic Profile');
    await expect(banner).toBeVisible();
    
    // Verify percentage is shown
    await expect(page.locator('text=%')).toBeVisible();

    // Click the X to dismiss
    const closeButton = page.locator('[aria-label="Dismiss banner"]');
    await closeButton.click();

    // Verify banner is hidden
    await expect(banner).toBeHidden();
    
    // Reload page and verify banner stays hidden (sessionStorage)
    await page.reload();
    await expect(banner).toBeHidden();
  });

  test('clicking Complete Profile opens the Edit Profile modal with all fields', async ({ page }) => {
    // Click the Complete Profile button
    await page.click('button:has-text("Complete Profile")');

    // Wait for the modal to appear
    const modalHeading = page.locator('h2:has-text("Edit Profile")');
    await expect(modalHeading).toBeVisible();

    // Verify all the new fields we added are present
    const fields = [
      'Full Name',
      'Phone Number',
      'Date of Birth',
      'Gender',
      'Address / Location',
      'City',
      'Ward',
      'State',
      'Country',
      'Occupation',
      'Bio',
      'Topics of Interest'
    ];

    for (const field of fields) {
      await expect(page.locator(`label:has-text("${field}")`)).toBeVisible();
    }
  });
});
