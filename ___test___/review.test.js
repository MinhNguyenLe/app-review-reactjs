import React from "react";
import { screen, cleanup, render,fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ReduxProvider } from "./app-config"

import Review from '../src/views/pages/Review'
import ReviewNav from "../src/components/Navbars/ReviewNav"

afterEach(cleanup)

/**
 * @function writeReview
 */

const params={
  score:{
    success: '9',
    validate:"11",
    fail:null,
  }, 
  positive:{
    success: 'abcd1234',
    fail:null,
  },
  negative:{
    success: 'abcd1234',
    fail:null,
  }, 
  advice:{
    success: 'abcd1234',
    fail:null,
  },
}

describe("Review Page - check existed of elements", () => {
  test("button Write review", () => {
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

describe("Review Page - Function test", () => {
  test("Write Review  : success", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.success } })
    fireEvent.change(positiveInput, { target: { value: params.positive.success } })
    fireEvent.change(negativeInput, { target: { value: params.negative.success } })
    fireEvent.change(adviceInput, { target: { value: params.advice.success } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("Write Review  : validate score", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.validate } })
    fireEvent.change(positiveInput, { target: { value: params.positive.success } })
    fireEvent.change(negativeInput, { target: { value: params.negative.success } })
    fireEvent.change(adviceInput, { target: { value: params.advice.success } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("Write Review  : check null for positive", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.success } })
    fireEvent.change(positiveInput, { target: { value: params.positive.fail } })
    fireEvent.change(negativeInput, { target: { value: params.negative.success } })
    fireEvent.change(adviceInput, { target: { value: params.advice.success } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("Write Review  : check null for negative", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.success } })
    fireEvent.change(positiveInput, { target: { value: params.positive.success } })
    fireEvent.change(negativeInput, { target: { value: params.negative.fail } })
    fireEvent.change(adviceInput, { target: { value: params.advice.success } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("Write Review  : check null for advice", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.success } })
    fireEvent.change(positiveInput, { target: { value: params.positive.success } })
    fireEvent.change(negativeInput, { target: { value: params.negative.success } })
    fireEvent.change(adviceInput, { target: { value: params.advice.fail } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
  test("Write Review  : check null for score", () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(
      <ReduxProvider store={store}>
        <Review />
      </ReduxProvider>
    );

    const userReview = getByTestId('user-write-revie')
    const nonUserReivew= getByTestId('non-user-write-revie')

    userReview.click(submit)
    nonUserReivew.click(submit)

    const scoreInput = getByTestId('write-review-score')
    const positiveInput = getByTestId('write-review-u')
    const negativeInput = getByTestId('write-review-n')
    const adviceInput = getByTestId('write-review-k')

    const submit = getByTestId('btn-save-review')

    fireEvent.change(scoreInput, { target: { value: params.score.fail } })
    fireEvent.change(positiveInput, { target: { value: params.positive.success } })
    fireEvent.change(negativeInput, { target: { value: params.negative.success } })
    fireEvent.change(adviceInput, { target: { value: params.advice.success } })

    fireEvent.click(submit)
    expect(handleClick).toHaveBeenCalledTimes(0)
  });
});
