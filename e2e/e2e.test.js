import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: 'new',
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('check popover view', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.button')
    button.click()
    await page.waitForSelector('.popover')
  });

  test('check popover visible false', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.button')
    button.click()
    await page.waitForSelector('.popover')
    await page.waitForSelector('.popover', {visible: false})
  });
});
