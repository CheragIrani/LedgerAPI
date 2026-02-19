import { Locator, Page } from "@playwright/test";
import { ContactPayload } from "../data/contactPayload";

export class ContactPage{
    readonly page: Page
    readonly logoutButton: Locator
    readonly contactHeading: Locator
    readonly addNewContactButton: Locator
    readonly contactFirstname: Locator
    readonly contactLastname: Locator
    readonly contactDateOfBirth: Locator
    readonly contactEmail: Locator
    readonly contactPhoneNumber : Locator
    readonly contactStreetAddress1: Locator
    readonly contactCity: Locator
    readonly contactState: Locator
    readonly contactPostalCode: Locator
    readonly contactCountry: Locator
    readonly contactSubmitButton: Locator


    constructor(page:Page){
        this.page = page
        this.logoutButton = page.getByRole('button', { name: 'Logout' })
        this.contactHeading = page.getByRole('heading', { name: 'Contact List'}) 
        this.addNewContactButton = page.getByRole('button', { name: 'Add a New Contact' })
        this.contactFirstname = page.getByRole('textbox', { name: '* First Name:' })
        this.contactLastname = page.getByRole('textbox', { name: '* Last Name:' })
        this.contactDateOfBirth = page.getByRole('textbox', { name: 'Date of Birth:' })
        this.contactEmail = page.getByRole('textbox', { name: 'Email:' })
        this.contactPhoneNumber = page.getByRole('textbox', { name: 'Phone:' })
        this.contactStreetAddress1 = page.getByRole('textbox', { name: 'Street Address 1:' })
        this.contactCity = page.getByRole('textbox', { name: 'City:' })
        this.contactState = page.getByRole('textbox', { name: 'State or Province:' })
        this.contactPostalCode = page.getByRole('textbox', { name: 'Postal Code:' })
        this.contactCountry = page.getByRole('textbox', { name: 'Country:' })
        this.contactSubmitButton = page.getByRole('button', { name: 'Submit' })
        
    }

    contactNameInTable = async (contactName: string) => {return this.page.getByRole('cell', { name: `${contactName}` }) }

    async isLoaded(): Promise<boolean> {
        await this.page.waitForURL('https://thinking-tester-contact-list.herokuapp.com/contactList');
        return await this.contactHeading.isVisible({timeout: 5000})
    }

    async addContactDetails(contactDetails: ContactPayload): Promise<void>{
        await this.contactFirstname.fill(contactDetails.firstName);
        await this.contactLastname.fill(contactDetails.lastName);
        await this.contactDateOfBirth.fill(contactDetails.birthdate);
        await this.contactEmail.fill(contactDetails.email);
        await this.contactPhoneNumber.fill(contactDetails.phone);
        await this.contactStreetAddress1.fill(contactDetails.street1);
        await this.contactCity.fill(contactDetails.city);
        await this.contactState.fill(contactDetails.stateProvince);
        await this.contactPostalCode.fill(contactDetails.postalCode);
        await this.contactCountry.fill(contactDetails.country);
        await this.contactSubmitButton.click();
        await this.page.waitForTimeout(3000)

    }

    async clickAddContact(){
        await this.addNewContactButton.click()
        await this.contactFirstname.waitFor()
    }

    async clickLogout(){
        await this.logoutButton.click()
    }
}