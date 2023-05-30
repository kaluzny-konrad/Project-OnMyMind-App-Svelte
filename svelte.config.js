import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: vercel(),
	},
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(
			process.env.VERCEL_ANALYTICS_ID,
		),
	},
};

export default config;
