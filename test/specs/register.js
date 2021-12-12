import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";
import RegisterPage from "../pageobjects/register.page"

import useAutomationTest from "../useAutomationTest"

const { get } = require('got')


describe('automation for register', () => {
  it('fail call api : email', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("register-fail-call-api-email")

    await RegisterPage.open();

    await RegisterPage.register(db.name, db.username, db.email, db.password)

    const err = await $('#err-register-call-api').getText()

    expect(err).toEqual("Tài khoản sai hoặc đã tồn tại")
  });

  it('fail call api : username', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("register-fail-call-api-username")

    await RegisterPage.open();

    await RegisterPage.register(db.name, db.username, db.email, db.password)

    const err = await $('#err-register-call-api').getText()

    expect(err).toEqual("Tài khoản sai hoặc đã tồn tại")
  });

  it('fail validate', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("register-fail-validate")

    await RegisterPage.open();

    await RegisterPage.register(db.name, db.username, db.email, db.password)

    const err = await $('#err-register-validate-password').getText()

    expect(err).toEqual("Mật khẩu phải nhiều hơn 6 ký tự")
  });

  it('register success', async () => {
    setupBrowser(browser)

    const db = useAutomationTest("register-success")

    await RegisterPage.open();

    await RegisterPage.register(db.name, db.username, db.email, db.password)

    await browser.newWindow("http://localhost:1000/schools")

    const btnLogout = await $("#test-logout")

    expect(btnLogout).toExist()
  });

});




