import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";
import MypagePage from "../pageobjects/mypage.page"
import LoginPage from "../pageobjects/login.page"

import useAutomationTest from "../useAutomationTest"

const path = require('path');

describe('automation login', () => {
  it('validate fail', async () => {
    setupBrowser(browser)

    const avaPath = useAutomationTest("upload-avatar-success", "..")
    const bgPath = useAutomationTest("upload-bg-success", "..")

    const login = useAutomationTest("login-success")

    await LoginPage.open();
    await LoginPage.login(login.email, login.password)

    await browser.newWindow("http://localhost:1000/schools")

    await $("#test-logout")

    await browser.newWindow("http://localhost:1000/mypage")

    const ava = await path.join(__dirname, avaPath);
    const bg = await path.join(__dirname, bgPath);

    const uploadAva = await browser.uploadFile(ava);
    const uploadBG = await browser.uploadFile(bg);

    const err =  await $("#test-logout")

    expect(err).toExist()
  });
});




