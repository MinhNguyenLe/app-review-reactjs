import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";
import SchoolPage from "../pageobjects/school.page"
import LoginPage from "../pageobjects/login.page"

import useAutomationTest from "../useAutomationTest"

describe('automation for school', () => {
  it('call api', async () => {
    setupBrowser(browser)

    const login = useAutomationTest("login-success")

    await LoginPage.open();
    await LoginPage.login(login.email, login.password)

    await browser.newWindow("http://localhost:1000/schools")

    const elem = await $('#name-school-0')
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'Trường Đại Học Bách Khoa'
    }, {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
    });

    expect(elem).toExist()
  });
  it('filter with level', async () => {
    setupBrowser(browser)

    const login = useAutomationTest("login-success")

    await LoginPage.open();
    await LoginPage.login(login.email, login.password)

    await browser.newWindow("http://localhost:1000/schools")

    const elem = await $('#name-school-0')
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'Trường Đại Học Bách Khoa'
    }, {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
    });

    await SchoolPage.filterWithLevel('2');

    await elem.waitUntil(async function () {
      return (await this.getText()) === 'Trường Đại Học Bách Khoa'
  }, {
      timeout: 5000,
      timeoutMsg: 'expected text to be different after 5s'
  });
  });
});




