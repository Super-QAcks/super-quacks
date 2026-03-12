import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { TaskEditor } from "../components/taskEditor.component";

export class TodayPage extends BasePage {
	readonly titleDate: Locator;
	readonly taskCounter: Locator;
	readonly addTaskButton: Locator;
	readonly taskEditor: TaskEditor;
	readonly todayRoot: Locator;

	constructor(page: Page) {
		super(page);
		this.titleDate = page.locator("span[class=simple_content]");
		this.taskCounter = page.locator("p[class=board_section__task_count]");
		this.addTaskButton = page.locator("button[class=plus_add_button]");
		this.taskEditor = new TaskEditor(page);
		this.todayRoot = page.getByTestId("today-view");
	}

	async addTask(title: string, desc: string) {
		await this.addTaskButton.click();
		await super.addTask(title, desc);
	}

	async openAddTaksModal() {
		await this.addTaskButton.click();
	}

	async awaitForVisibleRoot() {
		await this.todayRoot.isVisible();
	}
}
