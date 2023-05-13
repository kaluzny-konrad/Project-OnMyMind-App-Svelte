import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('cookie_consent', 'true');
	});
	await page.goto('/');
});

test('Footer navigation - Terms of Use', async ({ page }) => {
	const fileName = 'FooterNavigationTermsOfUse.png';

	await page.getByRole('link', { name: 'Terms of Use' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Terms and Conditions');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Footer navigation - Privacy Policy', async ({ page }) => {
	const fileName = 'FooterNavigationPrivacyPolicy.png';

	await page.getByRole('link', { name: 'Privacy Policy' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Privacy Policy');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Footer navigation - Contact', async ({ page }) => {
	const fileName = 'FooterNavigationContact.png';

	await page.getByRole('link', { name: 'Contact' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind Contact');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});

test('Footer navigation - Credits', async ({ page }) => {
	const fileName = 'FooterNavigationCredits.png';

	await page.getByRole('link', { name: '© OnMyMind 2023' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveTitle('OnMyMind');
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(fileName);
});
