const { test, expect } = require('@playwright/test');

test('redirects unauthenticated users to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/protected/quiz/create');

  await expect(page).toHaveURL('http://localhost:3000/public/user/signin');

  await expect(page.locator('h1')).toContainText('Logowanie');
});