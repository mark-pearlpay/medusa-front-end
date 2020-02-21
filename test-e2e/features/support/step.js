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
const topUpValue = '1000';


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
  await page.type('#firstName', payload.firstName, {delay: 20});
  await page.type('#lastName', payload.lastName, {delay: 20});
  await page.type('#email', payload.email, {delay: 20});
  await page.type('#birthday', payload.birthday, {delay: 20});
  await page.type('#balance', payload.balance, {delay: 20});

  await page.click('#submit-save', {delay: 20});

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

When('I top up an existing wallet',{timeout: 60 * 1000}, async () => {
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

  const topUpButtonSelector = `#top-up-button-${id}`
  const topUpInputSelector = `#top-up-input-${id}`
  
  await page.waitForSelector(topUpButtonSelector);
  await page.click(topUpButtonSelector);

  await page.waitForSelector(topUpInputSelector);
  await page.type(topUpInputSelector, topUpValue, {delay: 20});

  await page.keyboard.press('Enter');

  await page.waitFor(2000);
});

Then('I should have a correct balance value',{timeout: 60 * 1000} , async () => {
  // TODO get balance and check value
  let firstNames = [];
  const firstNameSelector = 'td[name="firstName"]';
  await page.waitForSelector(firstNameSelector)
  let elements = await page.$$(firstNameSelector)
  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
    firstNames.push(text);
  }
  
  const elementIndex = firstNames.indexOf(payload.firstName);
  let balances = await page.$$('td[name="balance"]');
  const balance = await (await balances[elementIndex].getProperty('textContent')).jsonValue();

  const expectedBalanceInt = parseInt(payload.balance) + parseInt(topUpValue)
  assert.include(balance, expectedBalanceInt.toString())

  await browser.close();
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