import { test, expect } from '@playwright/test';

test('Testuj czy strona Svelte Kit się ładuje', async ({ page }) => {
	await page.goto('http://localhost:4173');

	const title = await page.title();
	expect(title).toBe('OnMyMind');

	const headerElement = await page.$('header');
	expect(headerElement).not.toBeNull();

	// Sprawdź, czy istnieje oczekiwany tekst na stronie
	const pageContent = await page.textContent('body');
	expect(pageContent).toContain('OnMyMind');
});
