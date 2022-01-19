const puppeteer = require("puppeteer-core")

const { EMAIL, PASSWORD } = process.env

const getDate = async () => {
  const browser = await puppeteer.launch({
      executablePath:"/usr/bin/brave-browser",
      headless: true
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  })
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://ais.usvisa-info.com/en-br/niv/users/sign_in')
  await page.type('#user_email', EMAIL)
  await page.type('#user_password', PASSWORD)
  await page.click('#policy_confirmed')
  await page.click('input[value="Sign In"]')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  page.on('response', async response => {
    const data = JSON.parse(await response.buffer())
    console.log('A data mais próxima é: ' + data[0].date);
    return 'A data mais próxima é: ' + data[0].date; 
  })
  await page.goto('https://ais.usvisa-info.com/en-br/niv/schedule/36559547/appointment/days/56.json?appointments[expedite]=true', {waitUntil: 'networkidle0'})
  await browser.close()
}

module.exports = { getDate }