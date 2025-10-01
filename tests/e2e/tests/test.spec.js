import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
    test('should load Fast.com homepage successfully', async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveTitle('Internet Speed Test | Fast.com')
    })
    test('should measure and display internet speed correctly', async ({ page }) => {
        await page.goto('/')

        const speedUnit = page.locator('#speed-units')
        const speedValue = page.locator('#speed-value')
        await expect(speedUnit).toHaveText(/Mbps/, { timeout: 10000 });

        do {
            const classAttr = await speedUnit.getAttribute('class');
            if (classAttr && classAttr.includes('succeeded')) {
                console.log('✅ Final State:', classAttr);
                break;
            }
            const value = await speedValue.textContent();
            console.log(`⏳ Speed: ${value} Mbps`);
            await page.waitForTimeout(1000);

        } while (true)

        await expect(speedUnit).toBeVisible()
    })
})