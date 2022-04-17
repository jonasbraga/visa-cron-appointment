'use strict';

const chromium = require("chrome-aws-lambda")
require('dotenv').config()

const { EMAIL, PASSWORD } = process.env

const getDate = async () => {

  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)

  // Initial login
  await page.goto('https://ais.usvisa-info.com/en-br/niv/users/sign_in', {waitUntil: 'networkidle0'})
  await page.type('#user_email', EMAIL)
  await page.type('#user_password', PASSWORD)
  await page.click('#policy_confirmed')
  await page.click('input[value="Sign In"]')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  // Calling appointments API
  const response = await page.goto('https://ais.usvisa-info.com/en-br/niv/schedule/36559547/appointment/days/56.json?appointments[expedite]=true', {waitUntil: 'networkidle0'})
  const responseBody = await response.json()
  if (!response.ok() || responseBody.error) {
    throw new Error('Request failed | details: ' + (responseBody.error || response.status()))
  }

  await browser.close()
  
  return responseBody
}

async function getBrowser() {
  let browser = {};
  if (1 || process.env.IS_LOCAL) {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath:"/usr/bin/brave-browser",
      headless: true
    })
  } else {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: 0 && chromium.headless,
      ignoreHTTPSErrors: true,
      slowMo: 10
    })
  }
  
  return browser;
}

module.exports = { getDate }