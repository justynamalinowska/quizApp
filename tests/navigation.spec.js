const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click("text=Logowanie");

  await expect(page).toHaveURL('http://localhost:3000/public/user/signin');

  await expect(page.locator('h1')).toContainText('Logowanie');
});