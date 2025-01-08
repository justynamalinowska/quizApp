const { test, expect } = require('@playwright/test');

test('successful login and redirection to profile page', async ({ page }) => {
  await page.goto('http://localhost:3000/public/user/signin');
 
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/protected/user/profile');

  await expect(page.locator('h1')).toContainText('User');
});