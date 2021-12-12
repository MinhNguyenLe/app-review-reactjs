

import Page from './page';

class MypagePage extends Page {
  get uploadAvatar() {
    return $('#test-upload-ava');
  }

  get uploadCoverImg() {
    return $('#test-upload-bg');
  }

  get buttonSave() {
    return $('#test-submit-img-mypage');
  }

  async saveUpload(ava, bg) {
    await this.uploadAvatar.setValue(ava);
    await this.uploadCoverImg.setValue(bg);

    await this.buttonSave.click();
  }

  open() {
    return super.open('mypage');
  }
}

export default new MypagePage();
