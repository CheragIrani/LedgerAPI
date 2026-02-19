import { Locator, Page } from "@playwright/test";
import { UserPayload } from "../data/addUserPayload";

export class RegistrationPage{
    readonly page: Page
    readonly submitButton: Locator 
    readonly firstnameTextbox: Locator 
    readonly lastnameTextbox: Locator 
    readonly emailTextbox: Locator 
    readonly passwordTextbox: Locator

    constructor(page: Page){
        this.page = page
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.firstnameTextbox = page.getByRole('textbox', { name: 'First Name' })
        this.lastnameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.emailTextbox = page.getByRole('textbox', { name: 'Email' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
    }

    async registerUser(userData: UserPayload){
        await this.firstnameTextbox.fill(userData.firstName);
        await this.lastnameTextbox.fill(userData.lastName);
        await this.emailTextbox.fill(userData.email);
        await this.passwordTextbox.fill(userData.password);

    }

    async clickSubmit(){
        await this.submitButton.click()
        await this.page.waitForURL('https://thinking-tester-contact-list.herokuapp.com/contactList');
    }

}