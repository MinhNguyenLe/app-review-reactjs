import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";
import ReviewPage from "../pageobjects/review.page"
import LoginPage from "../pageobjects/login.page"

import useAutomationTest from "../useAutomationTest"

describe('automation for review', () => {
  it('validate score', async () => {
    setupBrowser(browser)

    const reviewDB = useAutomationTest("write-review-validate-score")

    await ReviewPage.open()

    const btnWriteReview = await $("#btn-write-review")
    await btnWriteReview.click()

    const elem = await $('#btn-save-review')
        await elem.waitUntil(async function () {
            return (await this.getText()) === 'Lưu'
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });

    await ReviewPage.writeReviewFail(reviewDB.score)

    const score = await $("#score").getText()
    expect(score).toEqual("Điểm số phải từ 0 đến 10")
  });
  it('write review success', async () => {
    setupBrowser(browser)

    const reviewDB = useAutomationTest("write-review-success")

    await ReviewPage.open()

    const btnWriteReview = await $("#btn-write-review")
    await btnWriteReview.click()

    const elem = await $('#btn-save-review')
        await elem.waitUntil(async function () {
            return (await this.getText()) === 'Lưu'
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });

    await ReviewPage.writeReview(reviewDB)

    const checked = await $("#name-owner-0")
    await checked.waitUntil(async function () {
        return (await this.getText()) === 'Người dùng ẩn danh'
    }, {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
    });
  });
});




