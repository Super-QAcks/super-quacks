import { test, expect } from "@playwright/test";
import { TodayPage } from "../../pages/today.page";
import { TASK_DETAILS } from "../../data/Constants";
import { TaskService } from "../../services/task";
import { BASE_URL } from "../../data/urls";

test.describe("Task Management", async () => {
	let todayPage: TodayPage;
	let taskService: TaskService;

	let taskId: string = "";

	test.beforeEach(async ({ page }) => {
		todayPage = new TodayPage(page);
		taskService = new TaskService(page);
	});

	test.afterEach(async ({ page }) => {
		taskService = new TaskService(page);
		await taskService.deleteTask(taskId);
	});

	test("should be able to create a task correctly", async ({ page }) => {
		await page.goto(BASE_URL);
		await todayPage.addTask(TASK_DETAILS.TITLE, TASK_DETAILS.DESC);

		taskId = await taskService.getTaskId(TASK_DETAILS.TITLE);

		await expect(page.locator(`[id=task-${taskId}]`)).toBeVisible();
	});
});
