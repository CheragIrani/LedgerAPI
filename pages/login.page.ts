import { Locator, Page } from "@playwright/test";
import { UserPayload } from "../data/userData";

export class LoginPage{
    readonly page: Page
    readonly signupButton: Locator 
    readonly emailTextbox: Locator 
    readonly passwordTextbox: Locator
    readonly submitButton: Locator 

    constructor(page: Page){
        this.page = page
        this.signupButton = page.getByRole('button', { name: 'Sign up' })
        this.emailTextbox = page.getByRole('textbox', { name: 'Email' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
    }

    async login(loginData: Pick<UserPayload, 'email' | 'password'>){
        await this.emailTextbox.fill(loginData.email);
        await this.passwordTextbox.fill(loginData.password);
        await this.submitButton.click();
    }

    async clickSignup(){
        await this.signupButton.click()
    }
}