import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { UsersApi } from '../api/users.api';
import { test, expect } from './fixtures/apiFixtures';

test.describe('Creating contacts test', async () => {
  let browser: Browser
  let page: Page
  let context: BrowserContext

  test.beforeEach('Browser setup', async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

  })

  test.afterEach('delete user', async ({ page, request }) => {
    const cookies = await page.context().cookies();
    const token = cookies.find(c => c.name === 'token')?.value;
    console.log('TOKEN:', token);

    const userApi = new UsersApi(request, token!);
    await userApi.deleteUser();
    await page.close()
  });



  test('Login', async ({ userPayload, loginPage, registrationPage, contactPage }) => {
  await page.goto('/');
  await loginPage.clickSignup()
  await registrationPage.registerUser(userPayload)
  await registrationPage.clickSubmit();
  await contactPage.clickLogout();
  await loginPage.login(userPayload);
  expect(await contactPage.isLoaded()).toBeTruthy()
  expect(new URL(page.url()).pathname).toBe('/contactList');
  context.storageState({path: 'storageState.json'})
  
  });

  test('Create contact', async () => {
    let addNewContactButton = page.getByRole('button', { name: 'Add a New Contact' })
    let contactFirstname = page.getByRole('textbox', { name: '* First Name:' })
    let contactLastname = page.getByRole('textbox', { name: '* Last Name:' })
    let contactDateOfBirth = page.getByRole('textbox', { name: 'Date of Birth:' })
    let contactEmail = page.getByRole('textbox', { name: 'Email:' })
    let contactPhoneNumber = page.getByRole('textbox', { name: 'Phone:' })
    let contactStreetAddress1 = page.getByRole('textbox', { name: 'Street Address 1:' })
    let contactCity = page.getByRole('textbox', { name: 'City:' })
    let contactState = page.getByRole('textbox', { name: 'State or Province:' })
    let contactPostalCode = page.getByRole('textbox', { name: 'Postal Code:' })
    let contactCountry = page.getByRole('textbox', { name: 'Country:' })
    let contactSubmitButton = page.getByRole('button', { name: 'Submit' })
    
    await addNewContactButton.click();
    await contactFirstname.fill('testfn');
    await contactLastname.fill('testln');
    await contactDateOfBirth.fill('1987-11-11');
    await contactEmail.fill('example@hotmail.com');
    await contactPhoneNumber.fill('07986765567');
    await contactStreetAddress1.fill('33 belmont avenue');
    await contactCity.fill('London');
    await contactState.fill('Middlesex');
    await contactPostalCode.fill('HA46DF');
    await contactCountry.fill('UK');
    await contactSubmitButton.click();
    await page.getByRole('cell', { name: 'testfn testln' }).click();
    await page.getByRole('cell', { name: 'testfn testln' }).click();


  })



})



