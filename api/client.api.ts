import { APIRequestContext, expect } from "@playwright/test";

export class ClientApi{
    protected request: APIRequestContext
    protected token?: string

    constructor(request: APIRequestContext){
        this.request = request
    }

    setToken(token: string) {
        this.token = token;
    }

    async post<T>(url: string, body: unknown = {}): Promise<{status: number, text: string, respBody: T}>{
        const resp = await this.request.post(url, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            },
            data: body
        })
        const status = resp.status();
        const text = await resp.text();
        const respBody = JSON.parse(text) as T
        expect(status).toBe(201);
        return {status, text, respBody}

    }

    async postWithoutAuth<T>(url: string, body: unknown): Promise<{ status: number, text: string, respBody: T }>{
        const resp = await this.request.post(url, {
            headers: {
              'Content-Type': 'application/json'
            },
            data: body
        })
        const status = resp.status();
        const text = await resp.text();
        const respBody = JSON.parse(text) as T
        return { status, text, respBody }

    }

    async getArray<T>(url: string): Promise<{ status: number, text: string, body: T[] }>{
        const resp = await this.request.get(url, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })
        
        const status = resp.status();
        const text = await resp.text();
        const body = JSON.parse(text) as T[]
        return { status, text, body }

    }

    async delete(url: string): Promise<{ status: number, respText: string }>{
        const deleteContactResp = await this.request.delete(`${url}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })
        const status = deleteContactResp.status();
        const respText = await deleteContactResp.text();
        return { status, respText }

    }
}