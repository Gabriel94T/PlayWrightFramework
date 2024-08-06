import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

 export class SignInCredentialsPage extends HelperBase{

    readonly emailField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailField = page.locator('#email-id')
        this.passwordField = page.locator('#password')
        this.submitButton = page.getByText('Submit')
    }

    async emailAndPassword(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await expect(this.passwordField).toHaveValue(password)
    }

    async SubmitButton() {
    await this.submitButton.click()
    }

}