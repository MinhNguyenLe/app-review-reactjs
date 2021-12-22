import React from "react";
import { screen, cleanup, render,fireEvent } from "@testing-library/react";
import LoginPage from "../src/views/pages/LoginPage";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import { setupBrowser } from '@testing-library/webdriverio'

afterEach(cleanup)

/**
 * @function login
 */

const params={
  email:{
    success: 'abcd@gmail.com',
    validate:"abcd",
    fail:null,
  }, 
  pass:{
    success: '123456',
    validate:"1",
    fail:null,
  },
}

/**
 * ----------------UNIT TEST - COMPONENT TEST - FUNCTION TEST LOGIN
 */
describe("component test login", () => {
  test("btn login ", () => {
    render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const btnLogin = screen.getByTestId("test-btn-login");
    expect(btnLogin).toBeInTheDocument();
  });

  test("btn login with anonymous ", () => {
    render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const inputEmail = screen.getByText("Đăng nhập ẩn danh")
    expect(inputEmail).toBeInTheDocument()
  });
});

describe("Login Event", () => {
  test("login's success", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const emailInput = getByTestId('login-field-email')
    const passwordInput = getByTestId('login-field-password')

    const submit = getByTestId('test-btn-login')

    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("login's email fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const emailInput = getByTestId('login-field-email')
    const passwordInput = getByTestId('login-field-password')

    const submit = getByTestId('test-btn-login')

    fireEvent.change(emailInput, { target: { value: params.email.fail } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("login's password fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const emailInput = getByTestId('login-field-email')
    const passwordInput = getByTestId('login-field-password')

    const submit = getByTestId('test-btn-login')

    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.fail } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("login's email validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const emailInput = getByTestId('login-field-email')
    const passwordInput = getByTestId('login-field-password')

    const submit = getByTestId('test-btn-login')

    fireEvent.change(emailInput, { target: { value: params.email.validate } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("login's password validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const emailInput = getByTestId('login-field-email')
    const passwordInput = getByTestId('login-field-password')

    const submit = getByTestId('test-btn-login')

    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.validate } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
})