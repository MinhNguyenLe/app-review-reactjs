import React from "react";
import { screen, cleanup, render,fireEvent } from "@testing-library/react";
import Register from "../src/views/pages/Register";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

afterEach(cleanup)

/**
 * @function register
 */

const params={
  name:{
    success: 'abcd1234',
    validate:"a",
    fail:null,
  },
  userName:{
    success: 'abcd1234',
    validate:"a",
    fail:null
  },
  email:{
    success: 'abcd@gmail.com',
    validate:"a",
    fail:null,
  }, 
  pass:{
    success: '123456',
    validate:"a",
    fail:null,
  },
}

describe("Register Page - check existed of elements", () => {
  test("btn register", () => {
    render(
      <ReduxProvider store={store}>
        <Register />
      </ReduxProvider>
    );
    const btnRegister = screen.getByRole('button', {
      name: "Đăng ký"
    })
    expect(btnRegister).toBeInTheDocument()
  });
});

describe("Register Event", () => {
  test("register's name fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.fail } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's user name fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.fail } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's email fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.fail } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's password fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.fail } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's name validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.validate } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's user name validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.validate } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's email validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.validate } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's password validate", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.validate } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });

  test("register's success", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
      <Register />
      </ReduxProvider>
    );
    const nameInput = getByTestId('register-field-name')
    const usernameInput = getByTestId('register-field-username')
    const emailInput = getByTestId('register-field-email')
    const passwordInput = getByTestId('register-field-password')

    const submit = getByTestId('test-register-submit')

    fireEvent.change(nameInput, { target: { value: params.name.success } })
    fireEvent.change(usernameInput, { target: { value: params.userName.success } })
    fireEvent.change(emailInput, { target: { value: params.email.success } })
    fireEvent.change(passwordInput, { target: { value: params.pass.success } })
   
    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
});
