import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import Register from "../views/pages/Register";
import "@testing-library/jest-dom";
import { store } from "../redux/store";
import { ReduxProvider } from "./app-config"

afterEach(cleanup)

describe("Login Component - check existed of elements", () => {
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
