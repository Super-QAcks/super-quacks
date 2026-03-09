import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { USER_CREDENTIALS } from "../../data/Constants";
import { TodayPage } from "../../pages/today.page";
import { TASK_DETAILS } from "../../data/Constants";
import { TaskService } from "../../services/task";
import { BASE_URL, TODAY_URL } from "../../data/urls";

test.describe("Task Management", async () => {
	let loginPage: LoginPage;
	let todayPage: TodayPage;
	let taskService: TaskService;
	//let authFile: string = "playwright/.auth/user.json";

	let taskId: string = "";

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		todayPage = new TodayPage(page);
		taskService = new TaskService(page);
	});

	test.afterEach(async ({ page }) => {
		taskService = new TaskService(page);
		await taskService.deleteTask(taskId);
	});
	//test.use({ storageState: authFile });
	test("should be able to create a task correctly", async ({ page }) => {
		// await loginPage.login(
		// 	USER_CREDENTIALS.STANDARD_USER,
		// 	USER_CREDENTIALS.PASSWORD
		// );


		await page.goto(BASE_URL);
		await todayPage.addTask(TASK_DETAILS.TITLE, TASK_DETAILS.DESC);

		taskId = await taskService.getTaskId(TASK_DETAILS.TITLE);

		await expect(page.locator(`[id=task-${taskId}]`)).toBeVisible();
	});
});
