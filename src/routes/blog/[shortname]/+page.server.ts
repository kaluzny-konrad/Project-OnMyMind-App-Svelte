import { error } from '@sveltejs/kit';
import { getBlogContent, getBlogInfo } from '../../../lib/api/blogApi';

export async function load({ fetch, params }) {
	const blogInfo = await getBlogInfo(fetch, params.shortname);

	const blogContent = await getBlogContent(fetch, params.shortname);

	if (!blogInfo || !blogContent) {
		throw error(404, {
			message: '404 - Not found',
		});
	}

	return {
		blogContent,
		blogInfo,
	};
}
