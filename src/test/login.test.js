import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import LoginPage from "../views/pages/LoginPage";
import "@testing-library/jest-dom";
import { store } from "../redux/store";
import { ReduxProvider } from "./app-config"

afterEach(cleanup)

describe("Login Component - check existed of elements", () => {
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
