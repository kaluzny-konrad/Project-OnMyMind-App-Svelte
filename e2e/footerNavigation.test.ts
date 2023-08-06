import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
	await page.waitForLoadState('networkidle');
});

test('Footer navigation - Terms of Use', async ({ page }) => {
	await page.getByRole('link', { name: 'Terms of Use' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Terms and Conditions');
});

test('Footer navigation - Privacy Policy', async ({ page }) => {
	await page.getByRole('link', { name: 'Privacy Policy' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Privacy Policy');
});

test('Footer navigation - Contact', async ({ page }) => {
	await page.getByRole('link', { name: 'Contact' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Contact');
});

test('Footer navigation - Credits', async ({ page }) => {
	await page.getByRole('link', { name: '© OnMyMind 2023' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
});
