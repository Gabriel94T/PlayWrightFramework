import {test} from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

const randomEmailAddress = faker.internet.email()
const randomPassword = faker.string.alpha(10)

test.beforeEach(async({page}) => {
await page.goto('https://automationplayground.com/crm/')
})

test('First test login',async ({page})=> {
    const pm = new pageManager(page)
    await pm.navigateToLogin().signInPage()
    await pm.inputCreds().emailAndPassword(randomEmailAddress, randomPassword)
    await pm.inputCreds().SubmitButton()
    await pm.customersDataPage().signOut()
})


test('Sign In and Add new customer',async ({page})=> {
    const pm = new pageManager(page)
    await pm.navigateToLogin().signInPage()
    await pm.inputCreds().emailAndPassword(randomEmailAddress, randomPassword)
    await pm.inputCreds().SubmitButton()
    await pm.customersDataPage().NewCustomerButton()
    await pm.addNewCustomer().fillNewCustomerInformation()
    await page.screenshot({path: 'screenshots/fillNewCustomerInformationPage.png'})
    await pm.addNewCustomer().submitNewCustomerButton()
    await pm.customersDataPage().signOut()
})



test.afterEach(async ({ page }) => {
    await page.close();
  })



