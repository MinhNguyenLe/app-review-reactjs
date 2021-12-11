import { setupBrowser } from '@testing-library/webdriverio'
import { screen, cleanup, render } from "@testing-library/react";

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        setupBrowser(browser)
        // await LoginPage.open();

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        // await expect(SecurePage.flashAlert).toBeExisting();
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!');

        await browser.url(`http://localhost:1000/login`)

        const fieldEmail = await $("#emailLogin");
        await fieldEmail.setValue("abc")
        console.log("--------------------------------", fieldEmail)


        const button = await browser.getByText('Đăng nhập')
        await button.click()

        console.log("debug.........")
        // await browser.debug()
    });
});




