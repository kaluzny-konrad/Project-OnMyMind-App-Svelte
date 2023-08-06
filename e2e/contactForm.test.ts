import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
	await page.getByRole('link', { name: 'Contact' }).click();
	await page.waitForLoadState('networkidle');
});

test('Contact Form - empty on init', async ({ page }) => {
	page.getByTestId('contact-form');
});

test('Contact Form - failed submission - wrong mail', async ({ page }) => {
	const form = page.getByTestId('contact-form');
	await form.locator('input[name="email"]').fill('test@test');
	await form.locator('textarea[name="message"]').fill('test message');
	await form.locator('button[type="submit"]').click();

	await page.waitForLoadState('networkidle');

	const alert = page.locator('div[role="alert"]');
	expect(await alert.textContent()).toBe('Invalid email address!');
});

test('Contact Form - failed submission - too many attempts', async ({
	page,
}) => {
	const form = page.getByTestId('contact-form');
	await form.locator('input[name="email"]').fill('test@test');
	await form.locator('textarea[name="message"]').fill('test message');
	await form.locator('button[type="submit"]').click();
	await page.waitForLoadState('networkidle');
	await form.locator('button[type="submit"]').click();
	await page.waitForLoadState('networkidle');

	const alert = page.locator('div[role="alert"]');
	expect(await alert.textContent()).toBe(
		'Too many attempts, please try again later.',
	);
});
