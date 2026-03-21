import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { getEnv } from "../../../utils/envs";



test("CP-01 login with preset user @positive", async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto(getEnv("BASE_URL"));

    await login.navigateToLoginPage();
    await expect(login.loginHeaderIsVisible()).toBeVisible()
    await login.login(
        getEnv("USER_NAME"), getEnv("PASSWORD")
    );

    await expect(login.successLogin()).toBeVisible()
})