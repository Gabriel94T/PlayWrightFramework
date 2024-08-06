import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";
import {faker} from '@faker-js/faker'

const randomEmailAddress = faker.internet.email()
const randomFirstName = faker.person.firstName()
const randomLastName =  faker.person.lastName()

export class AddCustomerPage extends HelperBase{

    readonly submitButton: Locator
    readonly emailAddressField: Locator
    readonly firstNameField: Locator
    readonly lastNameField:Locator
    readonly cityField:Locator
    readonly stateField:Locator
    readonly genderMale:Locator
    readonly promosTick:Locator

    constructor(page: Page) {
       super(page)
        this.submitButton = page.getByText('Submit')
        this.emailAddressField = page.locator('#EmailAddress')
        this.firstNameField = page.locator('#FirstName')
        this.lastNameField = page.locator('#LastName')
        this.cityField = page.locator('#City')
        this.stateField = page.locator('#StateOrRegion')
        this.genderMale = page.locator('input[type="radio"]:nth-of-type(1)')
        this.promosTick = page.locator('input[type="checkbox"][name="promos-name"]')
    }

    async fillNewCustomerInformation() {
        await this.emailAddressField.fill(randomEmailAddress)
        await this.firstNameField.fill(randomFirstName)
        await this.lastNameField.fill(randomLastName)
        await this.cityField.fill('Alaska')
        await this.stateField.click()
        await this.page.selectOption('#StateOrRegion', 'Alaska')
        await this.genderMale.click()
        await this.promosTick.click()
    }

    async submitNewCustomerButton() {
        await expect(this.submitButton).toHaveText('Submit')
        await this.submitButton.click()
    }
}