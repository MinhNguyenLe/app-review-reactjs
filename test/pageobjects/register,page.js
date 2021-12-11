

import Page from './page';

class RegisterPage extends Page {
  get inputName() {
    return $('#register-field-name');
  }

  get inputUserName() {
    return $('#register-field-username');
  }

  get inputEmail() {
    return $('#register-field-email');
  }

  get inputPassword() {
    return $('#register-field-password');
  }

  get buttonRegister() {
    return $('#test-register-submit');
  }

  async register(name, username, email, password) {
    await this.inputName.setValue(name);
    await this.inputUserName.setValue(username);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.buttonRegister.click();
  }

  open() {
    return super.open('register');
  }
}

export default new RegisterPage();
