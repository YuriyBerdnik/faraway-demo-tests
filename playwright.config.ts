import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    reporter: [
        ['list'],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],
    use: {
        // headless: false,
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        }
    ],
});
