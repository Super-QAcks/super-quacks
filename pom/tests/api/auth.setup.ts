import { expect, test as setup } from "@playwright/test";
import { USER_CREDENTIALS } from "../../data/Constants";
import { LOGIN_URL } from "../../data/urls";
import { LoginPage } from "../../pages/login.page";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto(LOGIN_URL);
	await loginPage.login(
		USER_CREDENTIALS.STANDARD_USER,
		USER_CREDENTIALS.PASSWORD
	);
	await expect(page.getByLabel("Add task")).toBeVisible({ timeout: 10000 });

	await page.context().storageState({ path: authFile });
});
