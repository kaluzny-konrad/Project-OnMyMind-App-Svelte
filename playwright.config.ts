import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// Look for test files in the "tests" directory, relative to this configuration file.
	testDir: 'e2e',

	// Run all tests in parallel.
	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,

	// Retry on CI only.
	retries: process.env.CI ? 2 : 1,

	// Opt out of parallel tests on CI.
	workers: process.env.CI ? 1 : 10,

	timeout: 15000,

	// Reporter to use
	reporter: 'html',

	use: {
		// Base URL to use in actions like `await page.goto('/')`.
		//baseURL: process.env.VERCEL_URL || 'http://localhost:4173/',
		baseURL: process.env.VERCEL_URL || 'http://localhost:5173/',

		// Collect trace when retrying the failed test.
		trace: 'on-first-retry',
	},
	// Configure projects for major browsers.
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'chromium_mobile',
			use: { ...devices['Pixel 5'] },
		},
	],
};

export default config;
