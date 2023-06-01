import type BlogInfo from '../types/BlogInfo';
import type BlogContent from '../types/BlogContent';

export async function getBlogsInfo(): Promise<BlogInfo[]> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await response.json()) as BlogInfo[];
	return blogsInfo;
}

export async function getBlogInfo(
	fetch: any,
	shortName: string,
): Promise<BlogInfo | null> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	if (response.status === 404) return null;
	const blogsInfo = (await response.json()) as BlogInfo[];
	const blogInfo = blogsInfo.find(
		(blogInfo: BlogInfo) => blogInfo.shortName === shortName,
	);
	if (!blogInfo) return null;
	return blogInfo;
}

export async function getBlogContent(
	fetch: any,
	shortName: string,
): Promise<BlogContent | null> {
	const response = await fetch(`/data/blogs/${shortName}/blogContent.json`);
	if (response.status === 404) return null;
	const blogContent = (await response.json()) as BlogContent;
	return blogContent;
}
