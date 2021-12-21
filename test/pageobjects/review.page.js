

import Page from './page';

class ReviewPage extends Page {
  get score() {
    return $('#write-review-score');
  }

  get positive() {
    return $('#write-review-u');
  }

  get negative() {
    return $('#write-review-n');
  }

  get advice() {
    return $('#write-review-k');
  }

  get btnSave() {
    return $('#btn-save-review');
  }


  async writeReview({score, positive, negative, advice}) {
    await this.score.setValue(score);
    await this.positive.setValue(positive);
    await this.negative.setValue(negative);
    await this.advice.setValue(advice);

    await this.btnSave.click();
  }

  async writeReviewFail(score) {
    await this.score.setValue(score);
   
  }

  open() {
    return super.open('schools/60d488fe3277da2a80f0b90e/reviews');
  }
}

export default new ReviewPage();
