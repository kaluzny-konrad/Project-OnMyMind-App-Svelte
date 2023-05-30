import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		replace: [
			[
				'import.meta.env.VERCEL_ANALYTICS_ID',
				JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
			],
		],
	}),

	kit: {
		adapter: vercel(),
	},
};

export default config;
