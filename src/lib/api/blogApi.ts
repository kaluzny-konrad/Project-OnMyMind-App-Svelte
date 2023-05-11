import type { BlogInfo } from '../../lib/types/BlogInfo';
import type { BlogContent } from '../../lib/types/BlogContent';

export async function httpGetBlogsInfo(): Promise<BlogInfo[]> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await response.json()) as BlogInfo[];
	return blogsInfo;
}

export async function httpGetBlogInfo(shortName: string): Promise<BlogInfo> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await response.json()) as BlogInfo[];
	const blogInfo = blogsInfo.find(
		(blogInfo: BlogInfo) => blogInfo.shortName === shortName,
	);
	if (!blogInfo) return { shortName: '', title: '', description: '', date: '' };
	return blogInfo;
}

export async function httpGetBlogContent(
	shortName: string,
): Promise<BlogContent> {
	const response = await fetch(`/data/blogs/${shortName}/blogContent.json`);
	const blogContent = (await response.json()) as BlogContent;
	return blogContent;
}
