import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import Schools from "../src/views/pages/Schools";
import SchoolPageHeader from "../src/components/Headers/SchoolPageHeader.js";

afterEach(cleanup)

describe("Login Component - check existed of elements", () => {
  test("btn Schools", () => {
    render(
      <ReduxProvider store={store}>
        <SchoolPageHeader />
      </ReduxProvider>
    );
    const btnSchools = screen.getByRole('h1', {
      name: "Danh sách các trường tại Việt Nam"
    })
    expect(btnSchools).toBeInTheDocument()
  });
});
