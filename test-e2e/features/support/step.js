const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require('puppeteer');

Given("I go to Google", async function() {
  const browser = await puppeteer.launch({
  	headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  await page.waitFor(3000);

  await browser.close();
});