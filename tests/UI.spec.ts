import { UsersApi } from '../api/users.api';
import { test, expect } from './fixtures/apiFixtures';

test.describe('Creating contacts test', async () => {

  test('Login', async ({ page, userPayload, loginPage, registrationPage, contactPage }) => {
    await page.goto('/');
    await loginPage.clickSignup()
    await registrationPage.registerUser(userPayload)
    await registrationPage.clickSubmit();
    await contactPage.clickLogout();
    await loginPage.login(userPayload);
    expect(await contactPage.isLoaded()).toBeTruthy()
    expect(new URL(page.url()).pathname).toBe('/contactList');
  
  });

  test('Create contact', async ({page, token, contactPage, contactApi, contactPayload}) => {
    await page.context().addCookies([
        { name: 'token', 
          value: `${token}`, 
          url: 'https://thinking-tester-contact-list.herokuapp.com',
          secure: true,
          httpOnly: false,
          sameSite: 'Lax' 
        }
      ])
    
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList');
    const fullName: string = `${contactPayload.firstName} ${contactPayload.lastName}`
    await contactPage.clickAddContact();
    await contactPage.addContactDetails(contactPayload);
    expect(await contactPage.contactNameInTable(fullName)).toBeVisible()
    const contact = ((await contactApi.getContact()).body).find(c => c.email === contactPayload.email)
    const contactId = contact?._id
    expect(contactId).not.toBeNull()
    await contactApi.deleteContact(contactId!)


  })



})



