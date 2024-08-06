import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    })

    test('auto waiting', async({page}) => {
        const successButton = page.locator('.bg-success')
        const text = await successButton.textContent()
        //const text = await successButton.allTextContents()

        await successButton.click()
        await successButton.waitFor({state:"attached"})
        expect(text).toContain('Data loaded with AJAX get request.')
         await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
    })

    test('more waits', async({page}) => {
        const successButton = page.locator('.bg-success')
        const text = await successButton.allTextContents()

        await page.waitForSelector('.bg-success')
        await page.waitForResponse('http://uitestingplayground.com/ajaxdata') 
        expect(text).toContain('Data loaded with AJAX get request.')
    })


test.afterEach(async ({ page }) => {
    await page.close();
    })