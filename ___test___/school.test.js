import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import Schools from "../src/views/pages/Schools";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

afterEach(cleanup)

describe("Login Component - check existed of elements", () => {
  test("btn Schools", () => {
    render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const btnSchools = screen.getByRole('h1', {
      name: "Danh sách các trường tại Việt Nam"
    })
    expect(btnSchools).toBeInTheDocument()
  });
});
