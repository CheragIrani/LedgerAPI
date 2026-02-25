import { AddUserResponse, UserPayload } from "../data/userData"
import { ClientApi } from "./client.api"

export class UsersApi extends ClientApi{

    async addUser(payload: UserPayload): Promise<{status: number, text: string, respBody: AddUserResponse}> {
        return this.postWithoutAuth<AddUserResponse>('/users', payload);
    } 

    async login(payload: Pick<UserPayload, 'email' | 'password'>): Promise<{status: number, text: string, respBody: AddUserResponse}> {
        return this.postWithoutAuth<AddUserResponse>('/users/login', payload)
    } 

    async deleteUser(): Promise<{ status: number, respText: string }> {
        return await this.delete('/users/me')
    }

}
