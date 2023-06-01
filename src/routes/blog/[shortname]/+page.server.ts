import { error } from '@sveltejs/kit';
import { getBlogContent, getBlogInfo } from '../../../lib/api/blogApi';
import type BlogContent from '../../../lib/types/BlogContent';
import type BlogInfo from '../../../lib/types/BlogInfo';

export async function load({ params }) {
	let blogContentPromise: BlogContent = await getBlogContent(params.shortname);
	let blogInfo: BlogInfo = await getBlogInfo(params.shortname);

	if (!blogInfo) throw error(404);

	return {
		blogContentPromise,
		blogInfo,
	};
}
