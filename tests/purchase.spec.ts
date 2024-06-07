import { test, expect } from '@playwright/test';
import { login, startPageElements } from '../lib/scenario/login';
import { testConfig } from '../lib/config';

test('Purchase Item', async ({ page }) => {

    await login(page);

    const imgSrc = await page.getAttribute('body > img', 'src');

    await page.fill(startPageElements.imageUrlField, imgSrc!);
    await page.click(startPageElements.submitButton);

    // await page.waitForTimeout(5000);
    // const frames = page.frames();
    // for (const frame of frames) {
    //     console.log(frame.url());
    // }

    const iframe = page.frame({ url: testConfig.DOMAIN });
    expect(iframe != null);

});
