import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import LoginPage from "../src/views/pages/LoginPage";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import { setupBrowser } from '@testing-library/webdriverio'

afterEach(cleanup)

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

/**
 * ----------------AUTOMATION TEST EVENT LOGIN
 */
describe("automation test login", () => {
  test("workflow login in Chrome", () => {
    render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    // setupBrowser(browser)
  });
});