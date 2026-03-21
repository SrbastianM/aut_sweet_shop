import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    loginLi: Locator;
    loginHeader: Locator;
    successLoginH: Locator;
    emailField: Locator;
    PasswordField: Locator;
    loginBut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLi = page.getByRole("link", { name: "Login" });
        this.loginHeader = page.getByRole("heading", { name: "Login" });
        this.successLoginH = page.getByRole("heading", { name: "Your Account" })
        this.emailField = page.getByPlaceholder("you@example.com");
        this.PasswordField = page.getByPlaceholder("Password");
        this.loginBut = page.getByRole("button", { name: "Login" });
    }

    loginHeaderIsVisible() {
        return this.loginHeader;
    }

    successLogin() {
        return this.successLoginH;
    }

    async navigateToLoginPage() {
        await this.loginLi.click();
        this.loginHeader.waitFor({ state: "visible" })
    }

    async login(emailField: string, password: string) {
        await this.emailField.fill(emailField);
        await this.PasswordField.fill(password);
        await this.loginBut.click();
    }
}