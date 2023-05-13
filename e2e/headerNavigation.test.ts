import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
});

test('Header navigation - Index', async ({ page }) => {
	const fileName = 'HeaderNavigationIndex.png';

	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Header navigation - Logo', async ({ page }) => {
	const fileName = 'HeaderNavigationLogo.png';

	await page.getByTestId('logo-text').click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Header navigation - AppLink', async ({ page }) => {
	const fileName = 'HeaderNavigationAppLink.png';

	await page.getByRole('link', { name: 'App' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Header navigation - BlogLink', async ({ page }) => {
	const fileName = 'HeaderNavigationBlogLink.png';

	await page.getByRole('link', { name: 'Blog' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Blog');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Header navigation - About link', async ({ page }) => {
	const fileName = 'HeaderNavigationAboutLink.png';

	await page.getByRole('link', { name: 'About' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind About');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});
