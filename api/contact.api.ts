import { GetAddContactResponse } from "../data/contactData";
import { ContactPayload } from "../data/contactData";
import { ClientApi } from "./client.api";

export class ContactApi extends ClientApi{
    
    async addContact(payload: ContactPayload): Promise<{status: number, text: string, respBody: GetAddContactResponse}>{
        return this.post('/contacts', payload)

    }

    async getContact(): Promise<{ status: number, text: string, body: GetAddContactResponse[] }>{
        return await this.getArray<GetAddContactResponse>('/contacts');
        
    }

    async deleteContact(contactId: string): Promise<{ status: number, respText: string }>{
        let url = `/contacts/${contactId}`
        return await this.delete(url);
        
    }

}
