import React from "react";
import { screen, cleanup, render,fireEvent  } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import Schools from "../src/views/pages/Schools";
import SchoolPageHeader from "../src/components/Headers/SchoolPageHeader.js";
import ListSchools from "../src/components/schools/ListSchools"

afterEach(cleanup)

/**
 * @function filterSchool
 */

const params={
  level:{
    success: 2,
    fail:null,
  },
  major:{
    success: 2,
    fail:null,
  }, 
  type:{
    success: 2,
    fail:null,
  },
  callAPI:{
    success: 10,
    fail:null
  }
}

describe("SChools Page", () => {
  test("schools: filter with level", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-level-school')

    fireEvent.change(getByTestId('select-level-school'), { target: { value: params.level.success } })

    let options = getAllByTestId('select-level-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeTruthy();
    expect(options[1]).toHaveTextContent('Cao đẵng');
  });

  test("schools: filter with major", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-major-school')

    fireEvent.change(getByTestId('select-major-school'), { target: { value: params.major.success } })

    let options = getAllByTestId('select-major-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeTruthy();
    expect(options[1]).toHaveTextContent('Xã hội - Nhân văn');
  });

  test("schools: filter with type", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-type-school')

    fireEvent.change(getByTestId('select-type-school'), { target: { value: params.type.success } })

    let options = getAllByTestId('select-type-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeTruthy();
    expect(options[1]).toHaveTextContent('Dân lập');
  });
  test("schools: filter with level", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-level-school')

    fireEvent.change(getByTestId('select-level-school'), { target: { value: params.level.fail } })

    let options = getAllByTestId('select-level-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeFalsy();
  });

  test("schools: filter with major", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-major-school')

    fireEvent.change(getByTestId('select-major-school'), { target: { value: params.major.fail } })

    let options = getAllByTestId('select-major-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeFalsy();
  });

  test("schools: filter with type", () => {
    const {getByTestId,getAllByTestId}=render(
      <ReduxProvider store={store}>
        <Schools />
      </ReduxProvider>
    );
    const filter = getByTestId('select-type-school')

    fireEvent.change(getByTestId('select-type-school'), { target: { value: params.type.fail } })

    let options = getAllByTestId('select-type-school-option')

    expect(filter).toBeInTheDocument()
    expect(options[1].selected).toBeFalsy();
  });
});

describe("List SChools", () => {
  test("List SChools: call API success", () => {
    const {getAllByTestId}=render(
      <ReduxProvider store={store}>
        <ListSchools />
      </ReduxProvider>
    );

    let options = getAllByTestId('list-school-child')

    expect(options.length > params.callAPI.success).toBeFalsy();
  });

  test("List SChools: call API fail", () => {
    const {getAllByTestId}=render(
      <ReduxProvider store={store}>
        <ListSchools />
      </ReduxProvider>
    );

    let options = getAllByTestId('list-school-child')

    expect(options.length === params.callAPI.success).toBeFalsy();
  });
});
