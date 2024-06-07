import { test, expect } from '@playwright/test';
import { testConfig } from '../lib/config/index';
import { startPageElements, loginPageElements } from '../lib/scenario/login';

test('Login with Email', async ({ page }) => {
    await page.goto(testConfig.DOMAIN);
    const connectInNewTabButton = await page.waitForSelector(startPageElements.connectInNewTabButton, { timeout: 10000 });
    await page.waitForTimeout(1000);
    await connectInNewTabButton.click();
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
    ]);
    await newPage.fill(loginPageElements.inputEmailField, testConfig.ACCOUNT.EMAIL);
    await newPage.click(loginPageElements.emailSubmitButton);
    await newPage.click(loginPageElements.codeField);
    await newPage.keyboard.type(testConfig.ACCOUNT.EMAIL_CODE);
    await expect(newPage.getByTestId('success-title')).toBeVisible();
});
