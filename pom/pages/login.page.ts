import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { LOGIN_URL } from "../data/urls";

export class LoginPage extends BasePage {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: Locator;
	readonly loginRoot: Locator;

	constructor(page: Page) {
		super(page);
		this.emailInput = page.locator("input[type=email]");
		this.passwordInput = page.locator("input[type=password]");
		this.loginButton = page.locator("button[type=submit]");
		this.errorMessage = page.getByText("Wrong email or password.");
		this.loginRoot = page.locator("#todoist_app");
	}

	async login(user: string, pass: string) {
		await this.goto(LOGIN_URL);
		await this.awaitForVisibleRoot();
		await this.emailInput.fill(user);
		await this.passwordInput.fill(pass);
		await this.loginButton.click();
	}

	async awaitForVisibleRoot() {
		await this.loginRoot.waitFor({ state: "visible", timeout: 50000 });
	}
}
