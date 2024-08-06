import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

 export class MainPage  extends HelperBase {
 
    readonly signInButton: Locator

    constructor(page: Page) {
        super(page)
        this.signInButton = page.getByText('Sign In')
    }

    async signInPage() {
        await this.signInButton.click()
    }
}