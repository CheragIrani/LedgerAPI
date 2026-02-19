import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class ClientApi{
    protected request: APIRequestContext
    protected token?: string

    constructor(request: APIRequestContext){
        this.request = request
    }

    setToken(token: string) {
        this.token = token;
    }

    async post<T>(url: string, body: unknown = {}): Promise<T>{
        const resp = await this.request.post(url, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            },
            data: body
        })
        const status = resp.status();
        console.log(`POST ${url} status is ${status}`);
        expect(status).toBe(201);
        return resp.json() as T

    }

    async postWithoutAuth<T>(url: string, body: unknown): Promise<T>{
        const resp = await this.request.post(url, {
            headers: {
              'Content-Type': 'application/json'
            },
            data: body
        })
        const status = resp.status();
        console.log(`POST ${url} status is `, status);
        return resp.json() as T

    }

    async getArray<T>(url: string): Promise<T[]>{
        const resp = await this.request.get(url, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })
        
        const getContactRespStatus = resp.status();
        const getContactRespText = await resp.text();
        console.log(`GET ${url} failed with status`, getContactRespStatus)
        console.log(`GET ${url} failed with response text`, getContactRespText)
        expect(getContactRespStatus).toBe(200)
        return await resp.json() as T[]

    }

    async delete(url: string): Promise<APIResponse>{
        const deleteContactResp = await this.request.delete(`${url}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })
        const status = deleteContactResp.status();
        const respText = await deleteContactResp.text();
        console.log(`DELETE ${url} status is `, status);
        console.log(`DELETE ${url} response text is `, respText);
        expect(status).toBe(200)
        return deleteContactResp

    }
}