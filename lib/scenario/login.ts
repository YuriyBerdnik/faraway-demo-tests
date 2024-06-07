import { Page } from '@playwright/test';
import { testConfig } from '../config/index';

export const startPageElements = {
    connectInNewTabButton: "#connect-tab",
    imageUrlField: '#purchase-image-url',
    submitButton: '#purchase'
}

export const loginPageElements = {
    inputEmailField: 'input[data-testid="email-form-email-input"]',
    emailSubmitButton: 'button[data-testid="email-form-submit-button"]',
    codeField: 'input[autocomplete="one-time-code"]',
}

export async function login(page: Page) {
    await page.goto(testConfig.DOMAIN);
    const connectInNewTabButton = await page.waitForSelector(startPageElements.connectInNewTabButton, { timeout: 10000 });
    await page.waitForTimeout(500);
    await connectInNewTabButton.click();
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
    ]);
    await newPage.fill(loginPageElements.inputEmailField, testConfig.ACCOUNT.EMAIL);
    await newPage.click(loginPageElements.emailSubmitButton);
    await newPage.click(loginPageElements.codeField);
    await newPage.keyboard.type(testConfig.ACCOUNT.EMAIL_CODE);
    newPage.getByTestId('success-title');
    await page.waitForTimeout(3000);
}
