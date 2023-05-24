import { webVitals } from '../../../vitals';

export default function POST(path: string) {
	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	console.log('analyticsId', analyticsId);
	if ('navigator' in window && analyticsId) {
		webVitals({
			analyticsId: analyticsId,
			debug: true,
			path: path, // '/blog/[slug]',
		});
	}
}
