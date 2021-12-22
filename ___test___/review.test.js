import React from "react";
import { screen, cleanup, render } from "@testing-library/react";

import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import Review from '../src/views/pages/Review'
import ReviewNav from "../src/components/Navbars/ReviewNav"

afterEach(cleanup)

describe("Login Component - check existed of elements", () => {
  test("btn Schools", () => {
    render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );
    const btnSchools = screen.getByRole('button', {
      name: "Viết đánh giá"
    })
    expect(btnSchools).toBeInTheDocument()
  });
});
