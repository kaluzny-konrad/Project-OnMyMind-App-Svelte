import { webVitals } from '../../vitals';
import { VERCEL_ANALYTICS_ID } from '$env/static/private';

export async function postWebVitals(path: string) {
	const analyticsId = VERCEL_ANALYTICS_ID;
	console.log('analyticsId', analyticsId);
	if ('navigator' in window && analyticsId && analyticsId != 'test') {
		webVitals({
			analyticsId: analyticsId,
			debug: true,
			path: path, // '/blog/[slug]',
		});
	}
}
