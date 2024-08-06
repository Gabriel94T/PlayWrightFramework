import {Page} from "@playwright/test";
import{MainPage} from '../page-objects/mainPage'
import{SignInCredentialsPage} from '../page-objects/signInCredentialsPage'
import{customersPage} from '../page-objects/customersPage'
import{AddCustomerPage} from '../page-objects/AddCustomerPage'


export class pageManager {
    private readonly page: Page
    private readonly mainPage: MainPage
    private readonly signInceCredentialsPage: SignInCredentialsPage
    private readonly customersPage: customersPage
    private readonly addCustomerPage: AddCustomerPage

    constructor(page: Page) {
        this.page = page
        this.mainPage = new MainPage(this.page)
        this.signInceCredentialsPage = new SignInCredentialsPage(this.page)
        this.customersPage = new customersPage(this.page)
        this.addCustomerPage = new AddCustomerPage(this.page)

    }

    navigateToLogin() {
        return this.mainPage
    }

    inputCreds() {
        return this.signInceCredentialsPage
    }

    customersDataPage() {
        return this.customersPage
    }
    addNewCustomer() {
        return this.addCustomerPage
    }


}