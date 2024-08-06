import {test} from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

const randomEmailAddress = faker.internet.email()
const randomPassword = faker.string.alpha(10)

test('First test login',async ({page})=> {
    const pm = new pageManager(page)
    await page.goto('https://automationplayground.com/crm/')
    await pm.navigateToLogin().signInPage()
    await pm.inputCreds().emailAndPassword(randomEmailAddress, randomPassword)
    await pm.inputCreds().SubmitButton()
    await pm.customersDataPage().signOut()
})