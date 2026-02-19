import {test as base, expect} from '@playwright/test'
import { ContactApi } from '../../api/contact.api'
import { UsersApi } from '../../api/users.api'
import { UserPayload } from '../../data/addUserPayload'
import { ContactPayload, createContact } from '../../data/contactPayload'
import { ContactPage } from '../../pages/contact.page'
import { LoginPage } from '../../pages/login.page'
import { RegistrationPage } from '../../pages/registration.page'

type Fixtures = {
    token: string,
    usersApi: UsersApi
    contactApi: ContactApi
    userPayload: UserPayload
    contactPayload: ContactPayload
    registrationPage: RegistrationPage
    loginPage: LoginPage
    contactPage: ContactPage
    
}

export const test = base.extend<Fixtures>({
    userPayload: async({}, use) => {
        let userPayload: UserPayload = {
            firstName: 'Test',
            lastName: 'User',
            email: `test4523${Date.now()}@fake.com`,
            password: 'myPassword'
        }
        await use(userPayload)

    },
    contactPayload: async({}, use) => {
        await use(await createContact());
    },
    token: async({request, userPayload}, use) => {
        let userApi = new UsersApi(request);
        await userApi.addUser(userPayload);
        const loginResp = await userApi.login(userPayload)
        let token = loginResp.token;
        await use(token)
    },
    usersApi: async({request,token}, use) => {
        let userApi = new UsersApi(request);
        userApi.setToken(token)
        await use(userApi);
        await userApi.deleteUser();
    },
    contactApi: async({request, token}, use) => {
        let contactApi = new ContactApi(request);
        contactApi.setToken(token)
        await use(contactApi);
    },
    registrationPage: async ({page}, use) => {
        const registraionPage = new RegistrationPage(page)
        await use(registraionPage)
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    contactPage: async ({page}, use) => {
        const contactPage = new ContactPage(page)
        await use(contactPage)
    },
    


})
export {expect}