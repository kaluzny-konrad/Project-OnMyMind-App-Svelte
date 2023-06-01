import { error } from '@sveltejs/kit';
import type BlogContent from '../../../lib/types/BlogContent';
import type BlogInfo from '../../../lib/types/BlogInfo';

export async function load({ fetch, params }) {
	const blogInfo = await getBlogInfo(fetch, params);

	const blogContent = await getBlogContent(fetch, params);

	if (!blogInfo || !blogContent) {
		return error(404, 'Not found');
	}

	return {
		blogContent,
		blogInfo,
	};
}

async function getBlogContent(fetch: any, params: any) {
	const blogContentRes = await fetch(
		`/data/blogs/${params.shortname}/blogContent.json`,
	);
	const blogContent = (await blogContentRes.json()) as BlogContent;
	blogContent;
	return blogContent;
}

async function getBlogInfo(fetch: any, params: any) {
	const blogsInfoRes = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await blogsInfoRes.json()) as BlogInfo[];
	const blogInfo = blogsInfo.find(
		(blogInfo: BlogInfo) => blogInfo.shortName === params.shortname,
	);
	return blogInfo;
}
