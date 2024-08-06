import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class customersPage extends HelperBase{

    readonly newCustomerButton: Locator
    readonly signOutButton: Locator
    readonly txtSignedOut: Locator

    constructor(page: Page) {
        super(page)
        this.newCustomerButton = page.locator('#new-customer')
        this.signOutButton = page.getByText('Sign Out')
        this.txtSignedOut = page.getByText('Signed Out')
    }

    async NewCustomerButton() {
    await this.newCustomerButton.click()
    }

    async signOut() {
    await this.signOutButton.click()
    await expect(this.txtSignedOut).toHaveText('Signed Out')
    }

}