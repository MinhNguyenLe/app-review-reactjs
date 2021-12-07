import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import LoginPage from "../views/pages/LoginPage";

import { Provider } from "react-redux";

import { store } from "../redux/store";

import { BrowserRouter as Router } from "react-router-dom";

import "@testing-library/jest-dom";

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

describe("FootLabel", () => {
  test("component should display label", () => {
    const login = render(
      <ReduxProvider store={store}>
        <LoginPage />
      </ReduxProvider>
    );
    const btnLogin = screen.getByTestId("test-btn-login");
    expect(btnLogin).toBeInTheDocument();
    // expect(getByText("Test")).toBeTruthy();
  });
});
