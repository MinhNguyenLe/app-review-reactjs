import React from "react";
import { Provider } from "react-redux";

import { store } from "../src/redux/store";

import { BrowserRouter as Router } from "react-router-dom";

import "@testing-library/jest-dom";

export const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);