

import Page from './page';

class LoginPage extends Page {
    get inputEmail() {
        return $('#emailLogin');
    }

    get inputPassword() {
        return $('#passLogin');
    }

    get buttonLogin() {
        return $('#test-btn-login');
    }

    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.buttonLogin.click();
    }

    open() {
        return super.open('login');
    }
}

export default new LoginPage();
