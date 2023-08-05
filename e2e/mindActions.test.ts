import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(1000);
});

test('Add three minds, complete two, delete one', async ({ page }) => {
	// add three minds
	await page.getByTestId('mind-input').fill('Mind 1');
	await page.getByTestId('add-task').click();

	expect(await page.$$('li.active')).toHaveLength(1);

	await page.getByTestId('mind-input').fill('Mind 2');
	await page.getByTestId('add-task').click();

	expect(await page.$$('li.active')).toHaveLength(2);

	await page.getByTestId('mind-input').fill('Mind 3');
	await page.keyboard.press('Enter');

	// assert that three minds are present - all active
	expect(await page.$$('li.completed')).toHaveLength(0);
	expect(await page.$$('li.active')).toHaveLength(3);

	// complete two minds - there are three complete-task buttons
	await page.getByTestId('complete-task').nth(2).click();

	expect(await page.$$('li.completed')).toHaveLength(1);

	await page.getByTestId('complete-task').nth(1).click();

	// assert that two minds are complete - two are complete, one is active
	expect(await page.$$('li.completed')).toHaveLength(2);
	expect(await page.$$('li.active')).toHaveLength(1);

	// delete one mind
	await page.getByTestId('delete-task').nth(1).click();

	// assert that two minds are present - one active, one completed
	expect(await page.$$('li.completed')).toHaveLength(1);
	expect(await page.$$('li.active')).toHaveLength(1);

	// screenshot
	await page.mouse.move(0, 0);
	await page.waitForTimeout(1000);
	const fileName = 'MindActionsDelete.png';
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName, {
		maxDiffPixelRatio: 0.01,
	});
});

test('Add two minds, complete one, then reopen one', async ({ page }) => {
	// add two minds
	await page.getByTestId('mind-input').fill('Mind 1');
	await page.getByTestId('add-task').click();

	expect(await page.$$('li.active')).toHaveLength(1);

	await page.getByTestId('mind-input').fill('Mind 2');
	await page.keyboard.press('Enter');

	// assert that two minds are present - all active
	expect(await page.$$('li.completed')).toHaveLength(0);
	expect(await page.$$('li.active')).toHaveLength(2);

	// complete one mind
	await page.getByTestId('complete-task').nth(1).click();

	// assert that one mind is complete - one active, one completed
	expect(await page.$$('li.completed')).toHaveLength(1);

	expect(await page.$$('li.active')).toHaveLength(1);

	// reopen one mind
	await page.getByTestId('reopen-task').click();

	// assert that two minds are present - all active
	expect(await page.$$('li.completed')).toHaveLength(0);
	expect(await page.$$('li.active')).toHaveLength(2);

	// screenshot
	await page.mouse.move(0, 0);
	await page.waitForTimeout(1000);
	const fileName = 'MindActionsReopen.png';
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Add two minds and start timer on one', async ({ page }) => {
	// add two minds
	await page.getByTestId('mind-input').fill('Mind 1');
	await page.getByTestId('add-task').click();

	expect(await page.$$('li.active')).toHaveLength(1);

	await page.getByTestId('mind-input').fill('Mind 2');
	await page.keyboard.press('Enter');

	// assert that two minds are present - all active
	expect(await page.$$('li.completed')).toHaveLength(0);
	expect(await page.$$('li.active')).toHaveLength(2);

	// start timer on one mind
	await page.getByTestId('start-timer').click();

	// screenshot
	await page.mouse.move(0, 0);
	await page.waitForTimeout(1000);
	const fileName = 'MindActionsTimer.png';
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Add two minds, start timer one, then start timer on second', async ({
	page,
}) => {
	// add two minds
	await page.getByTestId('mind-input').fill('Mind 1');
	await page.getByTestId('add-task').click();

	expect(await page.$$('li.active')).toHaveLength(1);

	await page.getByTestId('mind-input').fill('Mind 2');
	await page.keyboard.press('Enter');

	// assert that two minds are present - all active
	expect(await page.$$('li.completed')).toHaveLength(0);
	expect(await page.$$('li.active')).toHaveLength(2);

	// start timer on one mind
	await page.waitForTimeout(1000);
	await page.getByTestId('start-timer').click();

	// screenshot
	await page.mouse.move(0, 0);
	await page.waitForTimeout(1000);
	const fileName = 'MindActionsTimerTwo.png';
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});
