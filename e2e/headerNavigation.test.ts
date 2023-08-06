import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
	await page.waitForLoadState('networkidle');
});

test('Header navigation - Index', async ({ page }) => {
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
});

test('Header navigation - Logo', async ({ page }) => {
	await page.getByTestId('logo-img').click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
});

test('Header navigation - AppLink', async ({ page }) => {
	await page.getByRole('link', { name: 'App' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
});

test('Header navigation - BlogLink', async ({ page }) => {
	await page.getByRole('link', { name: 'Blog' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Blog');
});

test('Header navigation - About link', async ({ page }) => {
	await page.getByRole('link', { name: 'About' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind About');
});
