import { ContactPayload } from "../contactData"

export async function createContactDetails(overrides: Partial<ContactPayload> = {}): Promise<ContactPayload> {
    const defaultContact: ContactPayload = {
        firstName: 'Jimmy',
        lastName: 'Mistry',
        birthdate: '1980-11-11',
        email: `j.mistry${Date.now()}@hotmail.com`,
        phone: '07876675453',
        street1: '23 Chandos Road',
        city: 'London',
        stateProvince: 'Middlesex',
        postalCode: 'HA24RT',
        country: 'UK'
    }

    const contact: ContactPayload = {
        ... defaultContact,
        ... overrides
    }
    return contact

}