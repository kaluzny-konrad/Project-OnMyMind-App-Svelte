const analyticsId: string = import.meta.env.VERCEL_ANALYTICS_ID;
import { json } from '@sveltejs/kit';

export function GET() {
	console.log('analytics id :' + analyticsId);
	return json(analyticsId);
}
