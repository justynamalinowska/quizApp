const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', 
  timeout: 30000, 
  retries: 2, 
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    actionTimeout: 0, 
    ignoreHTTPSErrors: true,
  },
});