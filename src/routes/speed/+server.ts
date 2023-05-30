import { VERCEL_ANALYTICS_ID } from '$env/static/private';
import { json } from '@sveltejs/kit';

export function GET() {
	console.log('analytics id :' + VERCEL_ANALYTICS_ID);
	return json(VERCEL_ANALYTICS_ID);
}
