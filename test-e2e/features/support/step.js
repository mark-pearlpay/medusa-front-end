// TODO: Break me into step files
// TODO: Implement Page Objects
const { Given, When, Then } = require("cucumber");
const { expect, assert } = require("chai");
const puppeteer = require('puppeteer');
const uuid = require("uuid");


const baseUrl = 'http://localhost:9000/#!/';
let payload = {};
let browser;
let page;


Given('I have valid wallet details',{timeout: 60 * 1000}, async () => {
  // Do nothing
  payload = {
	firstName: uuid.v4(),
	lastName: 'Last Name from puppeteer',
	email: 'test@test.com',
	birthday: '2020-03-03',
	balance: '1000'
  }
});

When('I create a new wallet',{timeout: 60 * 1000}, async () => {
  browser = await puppeteer.launch({
  	headless: false,
  	defaultViewport: null,
  	args: ['--start-maximized']
  });
  page = await browser.newPage();
  await page.goto(baseUrl);

  await page.type('#firstName', payload.firstName, {delay: 100});
  await page.type('#lastName', payload.lastName, {delay: 100});
  await page.type('#email', payload.email, {delay: 100});
  await page.type('#birthday', payload.birthday, {delay: 100});
  await page.type('#balance', payload.balance, {delay: 100});

  await page.click('#submit-save', {delay: 100});

  await page.waitFor(2000);
});

Then('wallet should exist in list',{timeout: 60 * 1000} , async () => {
  let firstNames = [];
  let elements = await page.$$('td[name="firstName"]')

  for (const element of elements) {
    const text = await (await element.getProperty('textContent')).jsonValue();
  	firstNames.push(text);
  }
  
  assert.include(firstNames, payload.firstName);

  await browser.close();
});