import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";
import RegisterPage from "../pageobjects/register.page"

import useAutomationTest from "../useAutomationTest"

describe('automation login', () => {
  it('validate fail', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("login-fail-validate")

    await RegisterPage.open();

    await RegisterPage.login(db.email, db.password)

    const errValidate = await $('#err-validate').getText()

    expect(errValidate).toEqual("Mật khẩu phải hơn 6 ký tự")
  });

  it('call api fail', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("login-fail-call-api")

    await RegisterPage.open();

    await RegisterPage.login(db.email, db.password)

    const errCallApi = await $('#err-call-api-login').getText()

    expect(errCallApi).toEqual("Tài khoản sai hoặc không tồn tại")
  });

  it('login success', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("login-success")

    await RegisterPage.open();

    await RegisterPage.login(db.email, db.password)

    await browser.newWindow("google.com")

    const btnLogout = await $("#test-logout")

    expect(btnLogout).toExist()
  });
});




