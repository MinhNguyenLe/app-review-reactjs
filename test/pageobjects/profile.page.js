

import Page from './page';

class ProfilePage extends Page {
  get uploadAvatar() {
    return $('#emailLogin');
  }

  get uploadCoverImg() {
    return $('#passLogin');
  }

  get buttonSave() {
    return $('#test-btn-login');
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

export default new ProfilePage();
