// TODO: Break me into step files
// TODO: Implement Page Objects
// TODO: Major Refactor!
const { Given, When, Then } = require("cucumber");
const { expect, assert } = require("chai");
const puppeteer = require('puppeteer');
const uuid = require("uuid");


const baseUrl = 'http://localhost:9000/#!/';
let payload = {};
let elementInTestId;
let browser;
let page;


Given('I have valid wallet details',{timeout: 60 * 1000}, async () => {
  payload = {
  	firstName: uuid.v4(),
  	lastName: 'Last Name from puppeteer',
  	email: 'test@test.com',
  	birthday: '2020-03-03',
  	balance: '1000'
  }
});

Given('I have an existing wallet',{timeout: 60 * 1000}, async () => {
  await page.waitForSelector('td[name="firstName"]')
  let firstNames = [];
  let elements = await page.$$('td[name="firstName"]')

  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
    firstNames.push(text);
  }
  
  assert.include(firstNames, payload.firstName);
});

Given('I have existing wallets',{timeout: 60 * 1000}, async () => {
  // Do nothing
});

Given('I go to main page',{timeout: 60 * 1000}, async () => {
  // TODO move me to Page Objects
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  page = await browser.newPage();
  await page.goto(baseUrl);

  await page.waitFor(2000);
});

When('I create a new wallet',{timeout: 60 * 1000}, async () => {
  await page.type('#firstName', payload.firstName, {delay: 100});
  await page.type('#lastName', payload.lastName, {delay: 100});
  await page.type('#email', payload.email, {delay: 100});
  await page.type('#birthday', payload.birthday, {delay: 100});
  await page.type('#balance', payload.balance, {delay: 100});

  await page.click('#submit-save', {delay: 100});

  await page.waitFor(2000);
});

Then('wallet should exist in list',{timeout: 60 * 1000} , async () => {
  await page.waitForSelector('td[name="firstName"]')
  let firstNames = [];
  let elements = await page.$$('td[name="firstName"]')

  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
  	firstNames.push(text);
  }
  
  assert.include(firstNames, payload.firstName);

  await browser.close();
});

When('I delete an existing wallet',{timeout: 60 * 1000}, async () => {
  let firstNames = [];
  const firstNameSelector = 'td[name="firstName"]';
  await page.waitForSelector(firstNameSelector)
  let elements = await page.$$(firstNameSelector)
  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
    firstNames.push(text);
  }
  
  const elementIndex = firstNames.indexOf(payload.firstName);
  let ids = await page.$$('th[name="id"]');
  const id = await (await ids[elementIndex].getProperty('textContent')).jsonValue();

  const selector = `#delete-${id}`
  
  await page.waitForSelector(selector);
  await page.click(selector);

  await page.waitFor(2000);
});

Then('wallet should not exist in list',{timeout: 60 * 1000} , async () => {
  const firstNameSelector = 'td[name="firstName"]';
  await page.waitForSelector(firstNameSelector)
  let firstNames = [];
  let elements = await page.$$(firstNameSelector)

  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
    firstNames.push(text);
  }
  
  assert.notInclude(firstNames, payload.firstName);

  await browser.close();
});

Then('wallet list should exist',{timeout: 60 * 1000} , async () => {
  const listExists = await page.$('table[name="walletsTable"]') !== null;

  assert.isOk(listExists);
});

Then('wallet list should not be empty',{timeout: 60 * 1000} , async () => {
  await page.waitForSelector('tr[name="walletRow"]');
  let elements = await page.$$('tr[name="walletRow"]');

  assert.isOk(elements.length > 0);

  await browser.close();
});