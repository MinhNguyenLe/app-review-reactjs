import React from "react";
import { screen, cleanup, render,fireEvent  } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import DetailReview from "../src/views/pages/DetailReview";
import ListComment from "../src/components/comments/ListComment";

afterEach(cleanup)

/**
 * @function createComment
 */

const params={
  content:{
    success: "abcd1234",
    fail:null,
  }
}

describe("Comment Event", () => {
  test("comment success", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <ListComment />
      </ReduxProvider>
    );
    const content = getByTestId('write-comment')

    fireEvent.change(content, { target: { value: params.content.success } })
   
    fireEvent.submit(content)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("comment fail", () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <ListComment />
      </ReduxProvider>
    );
    const content = getByTestId('write-comment')

    fireEvent.change(content, { target: { value: params.content.fail } })
   
    fireEvent.submit(content)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
})