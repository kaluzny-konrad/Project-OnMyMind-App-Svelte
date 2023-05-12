import { expect, test } from '@playwright/test';

test('Header navigation', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('OnMyMind');

	await page.getByRole('link', { name: 'App' }).click();
	await expect(page).toHaveTitle('OnMyMind');

	await page.getByRole('link', { name: 'Blog' }).click();
	await expect(page).toHaveTitle('OnMyMind Blog');

	await page.getByRole('link', { name: 'About' }).click();
	await expect(page).toHaveTitle('OnMyMind About');

	await page.getByTestId('logo-text').click();
	await expect(page).toHaveTitle('OnMyMind');
});

test('Footer navigation', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Terms of Use' }).click();
	await expect(page).toHaveTitle('OnMyMind Terms and Conditions');

	await page.getByRole('link', { name: 'Privacy Policy' }).click();
	await expect(page).toHaveTitle('OnMyMind Privacy Policy');

	await page.getByRole('link', { name: 'Contact' }).click();
	await expect(page).toHaveTitle('OnMyMind Contact');

	await page.getByRole('link', { name: '© OnMyMind 2023' }).click();
	await expect(page).toHaveTitle('OnMyMind');
});
